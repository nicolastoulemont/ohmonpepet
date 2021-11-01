import React from 'react'
import { Image, Box } from '@chakra-ui/react'

export function Image16x9({ src, width, height }) {
	return (
		<Box
			display='block'
			pos='relative'
			width={width}
			height={height}
			_after={{ display: 'block', content: '', paddingBottom: '56.25%' }}
		>
			<Image
				src={src}
				pos='absolute'
				left='0'
				top='0'
				width='100%'
				height='100%'
				borderRadius='10px'
			/>
		</Box>
	)
}
