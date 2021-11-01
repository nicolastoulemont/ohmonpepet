import React, { useState } from 'react'
import { Flex, FlexProps, Image, ImageProps, IconButton, IconButtonProps } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface CarouselProps {
	containerProps?: Partial<FlexProps>
	icnProps?: Partial<IconButtonProps>
	imageProps?: Partial<ImageProps>
	imagesUrls: Array<string>
	icnOffset?: any
}

export function Carousel({
	containerProps = {
		width: '100%',
		height: '100%',
		borderRadius: '10px',
		pos: 'relative'
	},
	icnProps = {
		bgColor: 'gray.50',
		opacity: '0.5',
		isRound: true,
		pos: 'absolute',
		top: '50%',
		fontSize: '20px',
		transform: 'translate(0, -10px)'
	},
	imageProps = {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '10px',
		alt: 'petsitter profile picture'
	},
	icnOffset = '10px',
	imagesUrls
}: CarouselProps) {
	const [carouselIndex, setCarouselIndex] = useState(0)
	return (
		<Flex {...containerProps}>
			<IconButton
				{...icnProps}
				left={icnOffset}
				aria-label='previous image'
				icon={<ChevronLeftIcon />}
				onClick={() =>
					setCarouselIndex((carouselIdx) =>
						carouselIdx - 1 < 0 ? imagesUrls.length - 1 : carouselIdx - 1
					)
				}
			/>
			<Image
				src={imagesUrls[carouselIndex]}
				fallbackSrc={imagesUrls[carouselIndex]}
				{...imageProps}
			/>
			<IconButton
				{...icnProps}
				right={icnOffset}
				aria-label='next image'
				icon={<ChevronRightIcon />}
				onClick={() =>
					setCarouselIndex((carouselIdx) =>
						carouselIdx + 1 > imagesUrls.length - 1 ? 0 : carouselIdx + 1
					)
				}
			/>
		</Flex>
	)
}
