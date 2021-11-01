import React, { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { borderRadius } from 'theme/colors'
import AvatarEditor from 'react-avatar-editor'
import { useI18n } from 'utils/hooks/useI18n'
import imageJSON from 'statics/components/image.json'
import Compressor from 'compressorjs'
import { extractImageFileExtensionFromBase64, base64StringtoFile, formatFileName } from './utils'
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Button,
	Flex,
	Text,
	Box,
	useToast
} from '@chakra-ui/react'

interface ImageInputProps {
	isMobile?: boolean
	setFile: React.Dispatch<React.SetStateAction<File>>
	setErrors?: React.Dispatch<React.SetStateAction<any>> | undefined
	compressionWidth?: number
	externalImageSource?: string
	callBackFn?: (newFile: File) => void
	isInvalid?: boolean
}

export function ImageInput({
	isMobile = false,
	setFile,
	compressionWidth = 800,
	externalImageSource,
	callBackFn,
	isInvalid,
	setErrors
}: ImageInputProps) {
	const [scale, setScale] = useState(100)
	const [imageRotate, setImageRotate] = useState(0)
	const editorRef = useRef<AvatarEditor>(null)
	const [currentFileBase64, setCurrentFileBase64] = useState<string>(null)
	const [currentFileInfos, setCurrentFileInfos] = useState<{
		ext: string
		name: string
		type: string
	}>(null)
	const toast = useToast()

	const { t } = useI18n(imageJSON)

	const onDrop = useCallback((acceptedFiles) => {
		const [file] = acceptedFiles
		const reader = new FileReader()
		reader.onabort = () => console.log('file reading was aborted')
		reader.onerror = () => console.log('file reading has failed')
		reader.onload = () => {
			setCurrentFileBase64(reader.result as string)
			setCurrentFileInfos({
				...currentFileInfos,
				ext: extractImageFileExtensionFromBase64(reader.result as string),
				type: file.type,
				name: file.name.split('.')[0]
			})
		}
		reader.readAsDataURL(file)
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif'],
		multiple: false,
		maxSize: 5000000,
		onDropRejected: (evt) => {
			const [{ code }] = evt[0].errors

			const title =
				code === 'file-too-large'
					? t('fileTooLargeTitle')
					: code === 'file-invalid-type'
					? t('fileTypeInvalidTitle')
					: code === 'too-many-files'
					? t('tooManyFilesTitle')
					: ''
			const description =
				code === 'file-too-large'
					? t('fileTooLargeDesc')
					: code === 'file-invalid-type'
					? t('fileTypeInvalidDesc')
					: code === 'too-many-files'
					? t('tooManyFilesDesc')
					: ''

			toast({
				position: 'top',
				title,
				description,
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		}
	})

	function handleCroppedDownload() {
		const canvas = editorRef.current.getImage()
		const crop64 = canvas.toDataURL(`/image${currentFileInfos.ext}`)
		const fileName = `${formatFileName(currentFileInfos.name)}.${currentFileInfos.ext}`
		const croppedFile = base64StringtoFile(crop64, fileName)
		new Compressor(croppedFile, {
			quality: 0.8,
			width: compressionWidth,
			success(result) {
				const newFile = new File([result], fileName, { type: currentFileInfos.type })
				setFile(newFile)
				setErrors((errors) => ({ ...errors, pictureUrl: undefined }))
				callBackFn && callBackFn(newFile)
			},
			error(err) {
				console.log(err.message)
			}
		})
	}

	return (
		<>
			<Box
				width='100%'
				boxSizing='border-box'
				border={
					isInvalid
						? '1px solid #e53e3e'
						: `${
								currentFileBase64 || externalImageSource
									? 'none'
									: ' 1px dashed black'
						  }`
				}
				boxShadow={isInvalid ? '0 0 0 1px #e53e3e' : ''}
				borderRadius={borderRadius}
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				overflow='hidden'
			>
				{currentFileBase64 || externalImageSource ? (
					<>
						<Flex width='100%' align='center' justify='center'>
							<AvatarEditor
								image={externalImageSource || currentFileBase64}
								width={330}
								height={330}
								color={[255, 255, 255, 0.3]} // RGBA
								scale={scale / 100}
								border={0}
								rotate={imageRotate}
								ref={editorRef}
							/>
							<style>{`
								canvas {
									border-radius: 0.375rem !important;
								}
							`}</style>
						</Flex>

						<Box width='100%' p={4}>
							<Flex width='100%' mb={1}>
								<Text fontWeight={600} mr={3}>
									{t('zoom')}
								</Text>
								<Slider
									defaultValue={scale}
									onChange={(value) => setScale(value)}
									max={240}
									min={100}
								>
									<SliderTrack />
									<SliderFilledTrack />
									<SliderThumb />
								</Slider>
							</Flex>
							<Flex width='100%' mb={1}>
								<Text fontWeight={600} mr={3}>
									{t('rotate')}
								</Text>
								<Slider
									defaultValue={imageRotate}
									onChange={(value) => setImageRotate(value)}
									max={180}
									min={0}
								>
									<SliderTrack />
									<SliderFilledTrack />
									<SliderThumb />
								</Slider>
							</Flex>
						</Box>
						<Flex width='100%' align='center' justifyContent='space-around' p={2}>
							<Button
								variant='solid'
								onClick={handleCroppedDownload}
								colorScheme={
									currentFileBase64
										? 'green'
										: externalImageSource
										? 'gray'
										: isInvalid
										? 'red'
										: 'gray'
								}
							>
								{callBackFn
									? t('saveImg')
									: currentFileBase64
									? t('saveImg')
									: externalImageSource
									? t('saved')
									: null}
							</Button>
							<Button
								onClick={() => {
									setCurrentFileBase64(null)
									setCurrentFileInfos(null)
									setFile(null)
								}}
							>
								{t('delete')}
							</Button>
						</Flex>
					</>
				) : (
					<Box
						{...getRootProps()}
						width='100%'
						height={isMobile ? 50 : 345}
						padding={2}
						display='flex'
						alignItems='center'
						justifyContent='center'
						_hover={{ cursor: 'pointer' }}
					>
						<input {...getInputProps()} />
						<Text textAlign='center'>{isMobile ? t('selectMobile') : t('drag')}</Text>
					</Box>
				)}
			</Box>
		</>
	)
}
