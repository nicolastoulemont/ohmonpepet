import React from 'react'

export function BrandHeader() {
	return (
		<table
			cellSpacing='0'
			cellPadding='0'
			style={{
				margin: '0',
				padding: '29px 0 60px 0',
				width: '100%',
				lineHeight: '160% !important',
				maxWidth: '660px',
				border: '0',
			}}
			role='presentation'
		>
			<tbody>
				<tr>
					<td
						valign='middle'
						style={{
							textDecoration: 'none',
							borderCollapse: 'collapse',
							padding: '10px',
							height: '30px',
							verticalAlign: 'middle',
							textAlign: 'left',
							outline: 'none',
							margin: '0',
						}}
					>
						<img
							src='https://ohmonpepet-dev.s3.eu-west-3.amazonaws.com/email-assets/logo-2-fullname-adjusted.png'
							alt='ohmonpepet logo'
							style={{
								display: 'block !important',
								height: '75px !important',
								padding: '0 !important',
							}}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	)
}
