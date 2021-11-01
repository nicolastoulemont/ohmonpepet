import React from 'react'
import { Grid } from '@chakra-ui/react'

interface Props {}

export const GridPanels: React.FC<Props> = ({ children }) => (
	<Grid
		width='100%'
		height='100%'
		boxSizing='border-box'
		p={2}
		templateColumns={['100%', '100%', 'repeat(2,50%)']}
		templateRows={['repeat(4, 50%)', 'repeat(4, 50%)', 'repeat(2,50%)']}
	>
		{children}
	</Grid>
)
