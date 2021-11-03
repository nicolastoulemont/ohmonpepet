import { Layout, Loader } from 'components'
import React from 'react'
import { Heading, Flex, chakra, Text, Box, Image, Grid } from '@chakra-ui/react'
import claimsJSON from 'statics/admin/claims.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { useGetBookingClaimsQuery } from 'generated/graphql'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'

const MotionLink = chakra(motion.a)

export default function Admin() {
	const { t, lang } = useI18n(claimsJSON)
	useAdminOrRedirect()

	const { data, loading } = useGetBookingClaimsQuery()

	return (
		<Layout>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				{loading && !data && <Loader />}
				{data?.claims?.claims &&
					data?.claims?.claims.map((claim) => (
						<NextLink href={`/admin/claims/${claim.id}`} passHref key={claim.id}>
							<MotionLink
								p={3}
								borderRadius='10px'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
								transition='box-shadow 0.3s ease-in-out'
								_hover={{
									boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px'
								}}
							>
								<Flex
									width='100%'
									pos='relative'
									align='flex-start'
									justify='space-between'
									flexDir={{ base: 'column-reverse', sm: 'row' }}
								>
									<Box maxWidth={{ base: '100%', sm: 'calc(100% - 160px)' }}>
										<Text fontSize='14px' color='gray.600'>
											{
												// @ts-expect-error
												t(`${claim.booking.service}`)
											}
										</Text>

										<Text textAlign='left'>
											{format(new Date(claim.booking.startDate), 'd LLL', {
												locale: lang === 'fr' ? fr : enUS
											})}
											{' - '}
											{format(new Date(claim.booking.endDate), 'd LLL', {
												locale: lang === 'fr' ? fr : enUS
											})}
										</Text>
										<Text fontSize='sm' fontWeight={600}>
											{claim.booking.priceWithApplicationFee} €
										</Text>
										<Text fontSize='sm' color='gray.600' mt={2}>
											{claim.reason?.substr(0, 180)}
										</Text>
									</Box>
									<Flex
										align={{ base: 'center', sm: 'flex-end' }}
										justify='center'
										py={2}
										width={{ base: '100%', sm: '120px' }}
									>
										{claim.author?.pictureUrl && (
											<Flex flexDir='column' align='center' justify='center'>
												<Image
													src={
														claim.author?.pictureUrl ||
														'/img/user_yellow.svg'
													}
													fallbackSrc={
														claim.author?.pictureUrl ||
														'/img/user_yellow.svg'
													}
													alt='pet owner picture'
													width='75px'
													borderRadius='10px'
												/>
												<Text fontSize='sm' fontWeight={600}>
													{claim.author.firstName}
												</Text>
											</Flex>
										)}
										<Flex
											flexDir='column'
											align='center'
											justify='center'
											ml={3}
										>
											<Image
												src={claim.booking.sitter.pictureUrl}
												fallbackSrc={claim.booking.sitter.pictureUrl}
												alt='pet sitter picture'
												width='75px'
												borderRadius='10px'
											/>
											<Text fontSize='sm' fontWeight={600}>
												{claim.booking.sitter.firstName}
											</Text>
										</Flex>
									</Flex>
								</Flex>
							</MotionLink>
						</NextLink>
					))}
			</Grid>
		</Layout>
	)
}
