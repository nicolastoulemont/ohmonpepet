import React, { ReactNode } from 'react'
import { Flex, useColorMode } from '@chakra-ui/react'
import { panelBgColor, color, shadow } from 'theme/colors'

export function Flexpanel({ children, ...props }: { children: ReactNode; props?: any }) {
	const { colorMode } = useColorMode()

	return (
		<Flex
			backgroundColor={panelBgColor[colorMode]}
			color={color[colorMode]}
			boxShadow={shadow[colorMode]}
			borderRadius='4px'
			margin={6}
			padding={6}
			direction='column'
			maxHeight='100%'
			{...props}
		>
			{children}
		</Flex>
	)
}
