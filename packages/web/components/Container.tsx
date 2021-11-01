import React, { ReactNode } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import { bgColor } from 'theme/colors'

export function Container({ full, children }: { full?: boolean; children: ReactNode }) {
	const { colorMode } = useColorMode()

	return (
		<Box
			width='100%'
			height={!full ? 'calc(100% - 42px)' : '100%'}
			backgroundColor={bgColor[colorMode]}
			boxSizing='border-box'
			overflow='auto'
		>
			{children}
		</Box>
	)
}
