import React, { SVGAttributes } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export type SvgBoxProps = BoxProps &
	Pick<SVGAttributes<HTMLOrSVGElement>, 'xmlns' | 'viewBox' | 'preserveAspectRatio'>

export const SvgBox: React.FC<SvgBoxProps> = ({ children, ...props }) => (
	<Box as='svg' xmlns='http://www.w3.org/2000/svg' role='img' {...props}>
		{children}
	</Box>
)
