import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { borderRadius } from 'theme/colors'
import { useI18n } from 'utils/hooks/useI18n'
import imageJSON from 'statics/components/image.json'
import { Flex, Text, Box, useToast, Image, Heading, Button } from '@chakra-ui/react'

interface DocumentInputProps {
	isMobile?: boolean
	setFiles: React.Dispatch<React.SetStateAction<Array<File>>>
	files: Array<File>
	isInvalid?: boolean
}

export function DocumentInput({
	isMobile = false,
	setFiles,
	files,
	isInvalid
}: DocumentInputProps) {
	const toast = useToast()
	const { t } = useI18n(imageJSON)
	const onDrop = useCallback((acceptedFiles) => setFiles(acceptedFiles), [])

	const previews = useMemo(
		() =>
			files.length > 0
				? files.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file)
						})
				  )
				: [],
		[files]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif'],
		multiple: true,
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

	function removeFile(fileName) {
		setFiles((currentFiles) =>
			currentFiles.filter((currentFile) => currentFile.name !== fileName)
		)
	}

	return (
		<>
			<Box
				width='100%'
				boxSizing='border-box'
				border={
					isInvalid
						? '1px solid #e53e3e'
						: `${files.length > 0 ? 'none' : ' 1px dashed black'}`
				}
				boxShadow={isInvalid ? '0 0 0 1px #e53e3e' : ''}
				borderRadius={borderRadius}
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
				{files.length > 0 ? (
					<>
						{previews.length > 0 &&
							previews.map((file) => (
								<Flex
									width='100%'
									justify='space-between'
									align='strech'
									key={file.name}
									boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
									rounded='md'
									p={3}
									my={1}
								>
									<Image
										src={file.preview}
										width='80px'
										height='auto'
										rounded='md'
									/>
									<Flex align='flex-end' justify='flex-start' flexDir='column'>
										<Heading as='h3' size='xs'>
											{file.name}
										</Heading>
										<Button
											size='sm'
											mt={3}
											onClick={() => removeFile(file.name)}
										>
											{t('delete')}
										</Button>
									</Flex>
								</Flex>
							))}
					</>
				) : (
					<Box
						{...getRootProps()}
						width='100%'
						height={isMobile ? 50 : 150}
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
