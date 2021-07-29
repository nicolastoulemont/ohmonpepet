import React from 'react'

export function Footer() {
	return (
		<table
			width='100%'
			cellPadding='0'
			cellSpacing='0'
			role='presentation'
			style={{
				width: '100% !important',
				tableLayout: 'fixed',
				backgroundColor: '#f2f2f2',
				margin: '0 auto',
				border: '0',
			}}
		>
			<tbody>
				<tr>
					<td style={{ borderCollapse: 'collapse' }} width='100%'>
						<div style={{ maxWidth: '660px', margin: '0 auto' }}>
							<table
								// @ts-ignore
								align='left'
								width='100%'
								border='0'
								cellPadding='0'
								cellSpacing='0'
								role='presentation'
							>
								<tbody>
									<tr>
										<td style={{ borderCollapse: 'collapse', padding: '0' }}>
											<table
												style={{
													width: '100%',
													lineHeight: '160% !important',
													margin: '0 auto',
												}}
												// @ts-ignore
												border='0'
												cellSpacing='0'
												cellPadding='0'
												role='presentation'
											>
												<tbody>
													<tr style={{ width: '100%' }}>
														<div
															style={{
																fontSize: '11px',
																color: '#f2f2f2',
																padding: '0 0 32px',
															}}
														>
															<table
																style={{
																	textAlign: 'center',
																	color: '#888888',
																	fontSize: '12px',
																	borderBottom:
																		'1px solid #d6d6d6',
																	padding: '0',
																}}
																width='100%'
																//@ts-ignore
																border='0'
																cellPadding='0'
																cellSpacing='0'
																role='presentation'
															>
																<tbody>
																	<tr>
																		<td
																			style={{
																				borderCollapse:
																					'collapse',
																				padding:
																					'23px 0 23px 0',
																				lineHeight: '153%',
																			}}
																			align='center'
																		>
																			<a
																				href={`${process.env.DOMAIN_URL}`}
																				style={{
																					color:
																						'#888888 !important',
																					textDecoration:
																						'none',
																					padding:
																						'0 10px 0 0',
																				}}
																				target='_blank'
																			>
																				Trouver un petsitter
																			</a>
																			<span
																				style={{
																					width: '0',
																					height: '0',
																					fontSize: '0',
																					lineHeight: '0',
																					display: 'none',
																				}}
																			>
																				&nbsp;
																			</span>
																			<span
																				style={{
																					width: '0',
																					height: '0',
																					fontSize: '0',
																					lineHeight: '0',
																					display: 'none',
																				}}
																			>
																				&nbsp;
																			</span>
																			<span
																				style={{
																					color:
																						'#d6d6d6 !important',
																				}}
																				aria-hidden='true'
																			>
																				|
																			</span>
																			<a
																				href={`${process.env.DOMAIN_URL}/onboarding`}
																				style={{
																					color:
																						'#888888 !important',
																					textDecoration:
																						'none',
																					padding:
																						'0 12px 0 12px',
																				}}
																				target='_blank'
																			>
																				Devenir un petsitter
																			</a>
																			<span
																				style={{
																					width: '0',
																					height: '0',
																					fontSize: '0',
																					lineHeight: '0',
																					display: 'none',
																				}}
																			>
																				&nbsp;
																			</span>
																			<span
																				style={{
																					width: '0',
																					height: '0',
																					fontSize: '0',
																					lineHeight: '0',
																					display: 'none',
																				}}
																			>
																				&nbsp;
																			</span>
																		</td>
																	</tr>
																</tbody>
															</table>

															<table
																style={{
																	fontSize: '11px',
																	padding: '10px 0',
																	width: '100%',
																	border: '0',
																}}
																width='100%'
																// @ts-ignore
																border='0'
																cellPadding='0'
																cellSpacing='0'
																role='presentation'
															>
																<tbody>
																	<tr>
																		<td
																			style={{
																				color:
																					'#888888 !important',
																				borderCollapse:
																					'collapse',
																				padding: '20px 0 0',
																				lineHeight: '153%',
																			}}
																		>
																			<p
																				style={{
																					padding:
																						'0 0 6px 0',
																					margin: '0',
																				}}
																			>
																				Copyright ©{' '}
																				{new Date().getFullYear()}{' '}
																				<span>
																					Ohmonpepet
																				</span>{' '}
																				Tous droits
																				réservés.
																			</p>
																			<p>
																				<span>
																					Ohmonpepet
																				</span>{' '}
																				32 rue de
																				montmorency, 75003
																				Paris France
																			</p>
																			<p
																				style={{
																					color:
																						'#555555 !important',
																					padding: '0',
																					margin: '0',
																					lineHeight:
																						'2.2em',
																				}}
																			>
																				<a
																					href={`${process.env.DOMAIN_URL}/confidentiality-policy`}
																					style={{
																						color:
																							'#555555 !important',
																						textDecoration:
																							'none',
																						whiteSpace:
																							'nowrap',
																					}}
																					target='_blank'
																				>
																					Politique de
																					confidentialité
																				</a>
																				<span
																					style={{
																						color:
																							'#d6d6d6 !important',
																					}}
																					aria-hidden='true'
																				>
																					&nbsp;&nbsp;|&nbsp;&nbsp;
																				</span>
																				<a
																					href={`${process.env.DOMAIN_URL}/cgs`}
																					style={{
																						color:
																							'#555555 !important',
																						textDecoration:
																							'none',
																						whiteSpace:
																							'nowrap',
																					}}
																					target='_blank'
																				>
																					Conditions
																					d’utilisation
																				</a>
																				<span
																					style={{
																						color:
																							'#d6d6d6 !important',
																					}}
																					aria-hidden='true'
																				>
																					&nbsp;&nbsp;|&nbsp;&nbsp;
																				</span>
																				<a
																					href={`${process.env.DOMAIN_URL}/information-and-consent`}
																					style={{
																						color:
																							'#555555 !important',
																						textDecoration:
																							'none',
																						whiteSpace:
																							'nowrap',
																					}}
																					target='_blank'
																				>
																					Mentions légales
																				</a>
																			</p>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	)
}
