import React, { useState, useEffect, useMemo } from 'react'
import profileBookingJSON from 'statics/profileBooking.json'
import { Messages } from 'layouts/bookings/Messages'
import { Details } from 'layouts/bookings/Details'
import { useI18n } from 'utils/hooks/useI18n'
import { Layout } from 'components'
import { useRouter } from 'next/router'
import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { initializeApollo } from 'lib'
import { GET_PARTNERS } from 'graphql/partners/query'
import { lookUpByItemId } from 'utils'
import NextLink from 'next/link'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
	useBookingByIdLazyQuery,
	useMessagesByBookingIdLazyQuery,
	useSubscribeToBookingMessagesSubscription
} from 'generated/graphql'
import {
	Heading,
	Box,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Flex,
	Icon,
	Link,
	Tag,
	TagLeftIcon,
	TagLabel
} from '@chakra-ui/react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STIPE_TESTING_PUBLIC_KEY as string)

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true // See the "fallback" section below
	}
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const queries = [GET_PARTNERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const [{ partners }] = await Promise.all(queries)
	const partnersLookUp = lookUpByItemId(partners?.partners)

	return {
		props: {
			partnersLookUp
		}
	}
}

export default function BookingPage({ partnersLookUp }) {
	const [tabIndex, setTabIndex] = useState(0)
	const { t } = useI18n(profileBookingJSON)
	const { query } = useRouter()
	const { user } = useUserOrRedirect()
	const [getBooking, { data: booking }] = useBookingByIdLazyQuery()
	const [getMessages, { data: messages }] = useMessagesByBookingIdLazyQuery({
		fetchPolicy: 'cache-and-network'
	})

	useSubscribeToBookingMessagesSubscription({
		variables: { bookingId: (query.id as string) || '' },
		onSubscriptionData: () => getMessages({ variables: { id: query.id as string } })
	})

	const unReadMessages = useMemo(() => {
		if (messages?.messagesByBookingId?.messages && user?.currentUser?.__typename === 'User') {
			const userProfileId = user.currentUser.profile.id
			return messages?.messagesByBookingId?.messages.filter(
				(message) => !message.readAt && message.authorId !== userProfileId
			)
		} else {
			return []
		}
	}, [messages, user])

	useEffect(() => {
		if (query?.id && query.id !== '') {
			getBooking({ variables: { id: query.id as string } })
			getMessages({ variables: { id: query.id as string } })
		}
	}, [query])

	useEffect(() => {
		if (query?.panel === 'details') setTabIndex(0)
		if (query?.panel === 'messages') setTabIndex(1)
	}, [query])

	return (
		<Elements stripe={stripePromise}>
			<Layout>
				<Box width='100%'>
					<Flex
						align='center'
						justify={['space-between', 'space-between', 'flex-start']}
						mb={[3, 3, 3, 6]}
					>
						<NextLink href={(query.src ? query.src : '/') as string} passHref>
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
						<Heading ml={6}>{t('pageTitle')}</Heading>
					</Flex>

					<Tabs
						index={tabIndex}
						variant='enclosed'
						isFitted
						onChange={(index) => setTabIndex(index)}
					>
						<TabList mb={4}>
							<Tab>{t('details')}</Tab>
							<Tab>
								{t('messages')}
								{unReadMessages.length > 0 && tabIndex !== 1 ? (
									<Tag size='sm' variant='subtle' colorScheme='red' ml={3}>
										<TagLeftIcon boxSize='12px' as={ChatIcon} />
										<TagLabel>{unReadMessages.length}</TagLabel>
									</Tag>
								) : null}
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								{booking?.bookingById?.booking &&
									user?.currentUser?.__typename === 'User' && (
										<Details
											booking={booking.bookingById.booking}
											user={user.currentUser}
											partnersLookUp={partnersLookUp}
										/>
									)}
							</TabPanel>
							<TabPanel>
								{messages?.messagesByBookingId?.messages &&
									booking?.bookingById?.booking &&
									user?.currentUser?.__typename === 'User' && (
										<Messages
											messages={messages.messagesByBookingId.messages}
											user={user.currentUser}
											booking={booking.bookingById.booking}
											unReadMessages={unReadMessages}
											tabIndex={tabIndex}
										/>
									)}
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Layout>
		</Elements>
	)
}
