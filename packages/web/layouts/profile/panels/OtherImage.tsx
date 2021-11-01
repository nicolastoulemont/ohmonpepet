import React, { useState, useRef } from 'react'
import { borderRadius } from 'theme/colors'
import { chakra, Button, Image, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import { keyValidation } from 'utils/keyboard'
import { useI18n } from 'utils/hooks/useI18n'
import imageJSON from 'statics/components/image.json'
import { CURRENT_USER_PROFILE_PICTURES } from 'graphql/profile/query'
import { isMobile, isTablet } from 'react-device-detect'
import { RemoveScroll } from 'react-remove-scroll'
import {
	useRemovePictureFromProfileMutation,
	useSetPictureAsMainProfilePictureMutation
} from 'generated/graphql'

interface OtherImagesProps {
	url: string
	index: number
}

const MotionBox = chakra(motion.div)

type MenuPosition = { top: number | undefined; left: number | undefined }
const ContextMenuWidth = 250
const ContextMenuHeigth = 65

export function OtherImage({ url, index }: OtherImagesProps) {
	const { t } = useI18n(imageJSON)
	const [showMenu, setShowMenu] = useState(false)
	const [menuTopAndLeft, setMenuTopAndLeft] = useState<MenuPosition>({
		top: undefined,
		left: undefined
	})
	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => showMenu && setShowMenu(false))

	const [
		setAsProfilePicture,
		{ loading: setAsLoading }
	] = useSetPictureAsMainProfilePictureMutation({
		variables: { pictureUrl: url },
		refetchQueries: [{ query: CURRENT_USER_PROFILE_PICTURES }]
	})
	const [
		removePictureFromProfile,
		{ loading: removeLoading }
	] = useRemovePictureFromProfileMutation({
		variables: { pictureUrl: url },
		refetchQueries: [{ query: CURRENT_USER_PROFILE_PICTURES }]
	})

	async function setAsMainProfilePicture(
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.TouchEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLButtonElement>
	) {
		event.stopPropagation()
		const { data } = await setAsProfilePicture()
		if (data?.setPictureAsMainProfilePicture?.profile?.id) {
			setShowMenu(false)
		}
	}

	async function remove(
		event:
			| React.MouseEvent<HTMLButtonElement, MouseEvent>
			| React.TouchEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLButtonElement>
	) {
		event.stopPropagation()
		const { data } = await removePictureFromProfile()
		if (data?.removePictureUrlFromProfile?.profile?.id) {
			setShowMenu(false)
		}
	}

	function handleImageClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (isMobile) return
		const willOverFlowRight = window.innerWidth < event.pageX + ContextMenuWidth
		const willOverFlowBottom = window.innerHeight < event.pageY + ContextMenuHeigth
		setMenuTopAndLeft({
			top: willOverFlowBottom ? event.pageY - ContextMenuHeigth : event.pageY,
			left: willOverFlowRight ? event.pageX - ContextMenuWidth : event.pageX
		})
		setShowMenu(true)
	}
	function handleImageTouch(event: React.TouchEvent<HTMLDivElement>) {
		if (!isMobile && !isTablet) return
		const TouchX = event.touches[0].clientX
		const TouchY = event.touches[0].clientY
		const willOverFlowRight = window.innerWidth < TouchX + ContextMenuWidth
		const widthOverFlow = TouchX + ContextMenuWidth - window.innerWidth
		setMenuTopAndLeft({
			top: TouchY - (ContextMenuHeigth + 10),
			left: willOverFlowRight ? TouchX - (widthOverFlow + 20) : TouchX
		})
		setShowMenu(true)
	}
	function handleImageKeyboardSelection(event: React.KeyboardEvent<HTMLDivElement>) {
		keyValidation(event) && setShowMenu(!showMenu)
	}

	return (
		<Box
			ref={containerRef}
			width={{ base: 130, sm: 140, md: 200, lg: 220, xl: 160 }}
			height={{ base: 130, sm: 140, md: 200, lg: 220, xl: 160 }}
			borderRadius={borderRadius}
			mr={3}
			mb={1}
			pos='relative'
			onClick={handleImageClick}
			onKeyDown={handleImageKeyboardSelection}
			onTouchStart={handleImageTouch}
			tabIndex={0}
			role='button'
			aria-label='Show image controls menu'
		>
			{showMenu && (
				<RemoveScroll>
					<MotionBox
						zIndex={2}
						pos='fixed'
						{...menuTopAndLeft}
						bgColor='white'
						borderRadius={borderRadius}
						boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
						width={ContextMenuWidth}
						height={ContextMenuHeigth}
						display='flex'
						flexDir='column'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Button
							size='sm'
							variant='ghost'
							borderBottom='1px solid'
							borderBottomColor='gray.200'
							borderBottomLeftRadius={0}
							borderBottomRightRadius={0}
							isLoading={setAsLoading || removeLoading}
							colorScheme='blue'
							onClick={(event) => setAsMainProfilePicture(event)}
							onTouchStart={(event) => setAsMainProfilePicture(event)}
							onKeyDown={(event) => {
								if (event.key === 'Tab') {
									setShowMenu(false)
								} else if (event.key === 'Enter' || keyValidation(event)) {
									setAsMainProfilePicture(event)
								}
							}}
						>
							{t('chooseAsProfilePicture')}
						</Button>
						<Button
							size='sm'
							variant='ghost'
							borderTopRightRadius={0}
							borderTopLeftRadius={0}
							colorScheme='red'
							isLoading={removeLoading || setAsLoading}
							onClick={(event) => remove(event)}
							onTouchStart={(event) => remove(event)}
							onKeyDown={(event) => {
								if (event.key === 'Tab') {
									setShowMenu(false)
								} else if (event.key === 'Enter' || keyValidation(event)) {
									remove(event)
								}
							}}
						>
							{t('delete')}
						</Button>
					</MotionBox>
				</RemoveScroll>
			)}

			<Image
				pos='absolute'
				top={0}
				left={0}
				width={{ base: 130, sm: 140, md: 200, lg: 220, xl: 160 }}
				height={{ base: 130, sm: 140, md: 200, lg: 220, xl: 160 }}
				borderRadius={borderRadius}
				src={url}
				objectFit='cover'
				fallbackSrc={url}
				alt='User other picture'
				mb={1}
			/>
		</Box>
	)
}
