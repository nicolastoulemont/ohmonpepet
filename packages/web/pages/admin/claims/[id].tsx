import { Layout, Loader } from 'components'
import React, { useEffect, useState } from 'react'
import claimByIdJSON from 'statics/admin/claimById.json'
import { useI18n } from 'utils/hooks/useI18n'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	useCreateClaimMessageMutation,
	useGetBookingClaimByIdLazyQuery,
	useMessagesByClaimIdLazyQuery
} from 'generated/graphql'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { tagsColorScheme } from 'utils/misc'
import { lookUpByItemId, stringToTyped } from 'utils'
import { GET_CLAIM_MESSAGES } from 'graphql/messages/query'
import {
	Box,
	Flex,
	Heading,
	Text,
	Link,
	Icon,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Image,
	chakra,
	Tag,
	Textarea,
	FormControl,
	Button
} from '@chakra-ui/react'

const MotionBox = chakra(motion.div)

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true // See the "fallback" section below
	}
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [{ species }] = result

	const speciesLookUp = lookUpByItemId(species.species)

	return {
		props: {
			speciesLookUp
		}
	}
}

export default function ClaimById({ speciesLookUp }) {
	const [state, setState] = useState({})
	const [errors, setErrors] = useState({})
	const { t, lang } = useI18n(claimByIdJSON)
	const { query } = useRouter()
	useAdminOrRedirect()

	const [getClaim, { data, loading }] = useGetBookingClaimByIdLazyQuery()
	const [getClaimMessages, { data: msg, loading: msgLoading }] = useMessagesByClaimIdLazyQuery()
	const [createClaimMessage] = useCreateClaimMessageMutation({
		variables: { input: { claimId: query.id as string, content: state['content'] || '' } },
		refetchQueries: [{ query: GET_CLAIM_MESSAGES, variables: { id: query.id as string } }]
	})

	useEffect(() => {
		if (query.id && query.id !== '') {
			getClaim({ variables: { id: query.id as string } })
			getClaimMessages({ variables: { id: query.id as string } })
		}
	}, [query])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function createMessage() {
		const { data: ctMsg } = await createClaimMessage()
		if (ctMsg?.createClaimMessage?.message?.id) {
			setState({})
		}
	}

	return (
		<Layout>
			<NextLink href='/admin/claims' passHref>
				<Link
					backgroundColor='gray.100'
					px={3}
					py={1}
					borderRadius='4px'
					fontWeight={600}
					fontSize='sm'
				>
					<Icon as={ArrowBackIcon as any} mr={2} />
					{t('goBack')}
				</Link>
			</NextLink>
			<Flex width='100%' align='center' justify='space-between'>
				<Heading as='h1' my={3}>
					{t('titleUnique')}
				</Heading>
				{data?.claimById.claim && (
					<Button size='sm' colorScheme='blue'>
						{t('suspendPayment')}
					</Button>
				)}
			</Flex>

			{loading && !data && <Loader />}
			{data?.claimById?.claim && (
				<>
					<Flex
						width='100%'
						align='flex-start'
						justify='space-between'
						flexDir={{ base: 'column-reverse', md: 'row' }}
					>
						<MotionBox
							width={{ base: '100%', md: '64%' }}
							p={{ base: 3, md: 6 }}
							boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
							borderRadius='10px'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<Heading as='h2' size='md' mb={2}>
								{
									// @ts-expect-error
									t(`${data.claimById.claim.booking.service}`)
								}
							</Heading>
							{data.claimById.claim.booking.animalsIds.map((specieId, index) => (
								<Tag
									colorScheme={tagsColorScheme[index]}
									key={`tag-${specieId}`}
									mr={2}
								>
									{speciesLookUp[specieId].name[lang]}
								</Tag>
							))}

							<Text textAlign='left' mb={2}>
								{format(new Date(data.claimById.claim.booking.startDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								})}
								{' - '}
								{format(new Date(data.claimById.claim.booking.endDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								})}
							</Text>
							<Text fontSize='sm' fontWeight={600}>
								{data.claimById.claim.booking.priceWithApplicationFee} €
							</Text>
							<Heading as='h3' size='sm' my={2}>
								{t('claimReason')}
							</Heading>
							<Text fontSize='sm' color='gray.600' mt={2}>
								{data.claimById.claim.reason}
							</Text>
						</MotionBox>

						<MotionBox
							width={{ base: '100%', md: '34%' }}
							p={{ base: 3, md: 6 }}
							boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
							borderRadius='10px'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<Tabs variant='enclosed'>
								<TabList>
									<Tab>{t('owner')}</Tab>
									<Tab>{t('sitter')}</Tab>
								</TabList>
								<TabPanels>
									<TabPanel>
										<Image
											src={
												data?.claimById.claim.author.pictureUrl ||
												'/img/user_yellow.svg'
											}
											fallbackSrc={
												data?.claimById.claim.author.pictureUrl ||
												'/img/user_yellow.svg'
											}
											width='100%'
											borderRadius='10px'
											objectFit='cover'
											alt='pet owner profile picture'
											mb={2}
										/>

										<Heading as='h2' size='md' mb={2}>
											{data?.claimById.claim.author.firstName}{' '}
											{data?.claimById.claim.author.lastName}
										</Heading>

										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.author.address}
										</Text>
										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.author.user.email}
										</Text>
										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.author.phoneNumber}
										</Text>
									</TabPanel>
									<TabPanel>
										<Image
											src={data?.claimById.claim.booking.sitter.pictureUrl}
											fallbackSrc={
												data?.claimById.claim.booking.sitter.pictureUrl
											}
											width='100%'
											borderRadius='10px'
											objectFit='cover'
											alt='pet sitter profile picture'
											mb={2}
										/>
										<Flex
											width='100%'
											align='flex-start'
											justify='space-between'
										>
											<Heading as='h2' size='md' mb={2}>
												{data?.claimById.claim.booking.sitter.firstName}{' '}
												{data?.claimById.claim.booking.sitter.lastName}
											</Heading>
											<Flex fontSize='14px' fontWeight={600}>
												<Image
													src='/img/star.svg'
													fallbackSrc='/img/star.svg'
													width='16px'
													height='16px'
													mr={1}
													alt='ratings stars'
												/>
												{data?.claimById.claim.booking.sitter.stars}{' '}
												<Text ml={1} fontWeight={400} color='gray.700'>
													(
													{
														data?.claimById.claim.booking.sitter.ratings
															.length
													}
													)
												</Text>
											</Flex>
										</Flex>

										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.booking.sitter.address}
										</Text>
										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.booking.sitter.user.email}
										</Text>
										<Text fontSize='sm' color='gray.600'>
											{data?.claimById.claim.booking.sitter.phoneNumber}
										</Text>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</MotionBox>
					</Flex>

					<MotionBox
						width='100%'
						p={{ base: 3, md: 6 }}
						boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
						borderRadius='10px'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Heading as='h2' size='md' mb={2}>
							{t('claimMessages')}
						</Heading>
						<Box
							width='100%'
							height='400px'
							overflowY='auto'
							borderRadius='10px'
							backgroundColor='gray.50'
							p={1}
							boxSizing='border-box'
						>
							{data.claimById.claim.booking.messages.map((message) => {
								if (data.claimById.claim.author.id === message.authorId) {
									return (
										<Flex
											width='100%'
											align='center'
											justify='flex-start'
											my={1}
											flexDir='row'
											key={message.id}
										>
											<Image
												src={
													data?.claimById.claim.author.pictureUrl ||
													'/img/user_yellow.svg'
												}
												fallbackSrc={
													data?.claimById.claim.author.pictureUrl ||
													'/img/user_yellow.svg'
												}
												width='30px'
												borderRadius='50%'
												mr={1}
											/>
											<Box width='auto' maxWidth='95%'>
												<Box
													width='100%'
													backgroundColor='blue.500'
													borderBottomRightRadius='25px'
													borderTopRightRadius='25px'
													borderTopLeftRadius='25px'
													py={2}
													px={3}
												>
													<Text color='white'>{message.content}</Text>
												</Box>
												<Text color='gray.500' fontSize='10px'>
													{format(
														new Date(message.createdAt),
														'dd/MM/yyyy HH:mm'
													)}
												</Text>
											</Box>
										</Flex>
									)
								} else {
									return (
										<Flex
											width='100%'
											align='center'
											justify='flex-end'
											my={1}
											flexDir='row'
										>
											<Box width='auto' maxWidth='95%'>
												<Text
													borderBottomRightRadius='25px'
													borderTopRightRadius='25px'
													borderTopLeftRadius='25px'
													py={2}
													px={3}
													backgroundColor='gray.200'
												>
													{message.content}
												</Text>
												<Text
													color='gray.500'
													fontSize='10px'
													textAlign='right'
												>
													{format(
														new Date(message.createdAt),
														'dd/MM/yyyy HH:mm'
													)}
												</Text>
											</Box>
											<Image
												src={data.claimById.claim.booking.sitter.pictureUrl}
												fallbackSrc={
													data.claimById.claim.booking.sitter.pictureUrl
												}
												width='30px'
												borderRadius='50%'
												ml={1}
											/>
										</Flex>
									)
								}
							})}
						</Box>
					</MotionBox>
					<MotionBox
						width='100%'
						p={{ base: 3, md: 6 }}
						boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
						borderRadius='10px'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Heading as='h2' size='md' mb={2}>
							{t('comments')}
						</Heading>
						<Box
							width='100%'
							height='400px'
							overflowY='auto'
							borderRadius='10px'
							backgroundColor='gray.50'
							p={1}
							boxSizing='border-box'
						>
							{msg?.messagesByClaimId?.messages.map((message) => (
								<Flex
									width='100%'
									align='center'
									justify='flex-start'
									my={1}
									flexDir='row'
									key={message.id}
								>
									<Box width='auto' maxWidth='95%'>
										<Text
											borderBottomRightRadius='25px'
											borderTopRightRadius='25px'
											borderTopLeftRadius='25px'
											py={2}
											px={3}
											backgroundColor='gray.200'
										>
											{message.content}
										</Text>
										<Text color='gray.500' fontSize='10px' textAlign='left'>
											{message.adminAuthor.email}
										</Text>
										<Text color='gray.500' fontSize='10px' textAlign='left'>
											{format(
												new Date(message.createdAt),
												'dd/MM/yyyy HH:mm'
											)}
										</Text>
									</Box>
								</Flex>
							))}
						</Box>

						<FormControl flex='1' isRequired mt={2}>
							<Textarea
								id='content'
								name='content'
								value={state['content'] || ''}
								aria-describedby='content'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['content']}
								maxLength={2000}
							/>
						</FormControl>
						<Button onClick={createMessage}>{t('saveComment')}</Button>
					</MotionBox>
				</>
			)}
		</Layout>
	)
}
