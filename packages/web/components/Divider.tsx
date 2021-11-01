import React, { ReactElement } from 'react'

interface Props {
	height?: string
}

export function Divider({ height = '10px' }: Props): ReactElement {
	return <div style={{ height: height, width: '100%' }} />
}
