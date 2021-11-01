import React, { useMemo, useEffect } from 'react'
import { Box, Flex, Heading, Image, Text, useToast } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import notificationMessageJSON from 'statics/notifications/message.json'
import notificationStatusJSON from 'statics/notifications/status.json'
import newBookingJSON from 'statics/notifications/newBooking.json'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import {
	useCurrentUserOwnerBookingsLazyQuery,
	useCurrentUserLazyQuery,
	useGetCurrentUserBookingsIdsLazyQuery,
	useCurrentUserSitterBookingsLazyQuery,
	useGetCurrentUserBookingsIdsQuery,
	useSubscribeToUserBookingsMessagesChangesSubscription,
	useSubscribeToUserBookingsStatusChangesSubscription,
	useSubscribeToNewlyCreatedBookingsAsSitterSubscription,
	SubscribeToUserBookingsStatusChangesSubscription,
	SubscribeToUserBookingsMessagesChangesSubscription
} from 'generated/graphql'
import { BookingStatus } from 'layouts/shared/BookingStatus'
import Cookies from 'universal-cookie'
import { useOwnerStore, useSitterStore } from 'lib/stores/search'
const cookies = new Cookies()

export function ApplicationWideQueryAndSubscriptions({ children }) {
	const tokenPresence = cookies.get('token-presence')

	const [getCurrentUser, { data: user }] = useCurrentUserLazyQuery()
	const [getCurrentUserBookingsIds, { data }] = useGetCurrentUserBookingsIdsLazyQuery({
		fetchPolicy: 'cache-and-network'
	})

	useEffect(() => {
		if (tokenPresence && !data && !user) {
			getCurrentUser()
			getCurrentUserBookingsIds()
		}
	}, [])

	const hasBookingsOrIsPetSitter = useMemo(
		() =>
			data?.currentUserBookings?.bookings?.length > 0 ||
			(user?.currentUser?.__typename === 'User' && user?.currentUser?.profile?.isPetSitter),

		[data, user]
	)

	if (user?.currentUser?.__typename === 'User' && hasBookingsOrIsPetSitter) {
		return (
			<ApplicationWideSubscriptions
				bookings={data?.currentUserBookings?.bookings || []}
				user={user.currentUser}
			>
				{children}
			</ApplicationWideSubscriptions>
		)
	}

	return <>{children}</>
}

export function ApplicationWideSubscriptions({ bookings, user, children }) {
	const { t } = useI18n(notificationMessageJSON)
	const { t: t2, lang } = useI18n(notificationStatusJSON)
	const { t: t3 } = useI18n(newBookingJSON)
	const toast = useToast()
	const toastIdRef = React.useRef(null)
	const { push } = useRouter()
	const { data } = useGetCurrentUserBookingsIdsQuery({
		fetchPolicy: 'cache-and-network'
	})
	const ownerStore = useOwnerStore()
	const sitterStore = useSitterStore()

	const [getCurrentUserOwnerBookings] = useCurrentUserOwnerBookingsLazyQuery({
		fetchPolicy: 'cache-and-network'
	})
	const [getCurrentUserSitterBookings] = useCurrentUserSitterBookingsLazyQuery({
		fetchPolicy: 'cache-and-network'
	})

	const ownerBookingsIds = useMemo(
		() => (bookings ? bookings.map((booking) => booking.id) : []),
		[data]
	)

	function redirectTo(bookingId: string, panel: 'details' | 'messages') {
		push({
			pathname: `/bookings/${bookingId}`,
			query: { panel }
		})
		if (toastIdRef.current) {
			toast.close(toastIdRef.current)
		}
	}

	// Newly created bookings
	const {
		data: sitterNewlyCreatedBookings
	} = useSubscribeToNewlyCreatedBookingsAsSitterSubscription({
		variables: { sitterId: user.profile.id },
		onSubscriptionData: () => handleNewlyCreatedBooking()
	})

	function handleNewlyCreatedBooking() {
		const { fns, ...searchParams } = sitterStore
		getCurrentUserSitterBookings({ variables: searchParams })
		const booking = sitterNewlyCreatedBookings?.newlyCreatedBookingsAsSitterSub?.booking
		if (booking) {
			toastIdRef.current = toast({
				position: 'top-right',
				duration: 9000,
				render: () => (
					<NewBookingCreated
						redirectToBookingDetails={() => redirectTo(booking.id, 'details')}
						message={t3('amount', { price: booking.priceWithoutApplicationFee })}
						subTitle={t3('subTitle', {
							start: format(new Date(booking.startDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							}),
							end: format(new Date(booking.endDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							})
						})}
					/>
				)
			})
		}
	}

	// Bookings status changes
	const { data: ownerBookingStatusChange } = useSubscribeToUserBookingsStatusChangesSubscription({
		variables: {
			bookingsIds: ownerBookingsIds
		},
		onSubscriptionData: ({ subscriptionData: { data } }) => handleOwnerBookingStatusChange(data)
	})

	function handleOwnerBookingStatusChange(
		data: SubscribeToUserBookingsStatusChangesSubscription
	) {
		if (data?.userBookingsStatusChangesSub?.booking) {
			const { sitterId, ownerId } = data.userBookingsStatusChangesSub.booking
			if (ownerId === user.profile.id) {
				const { fns, ...searchParams } = ownerStore
				getCurrentUserOwnerBookings({ variables: searchParams })
			} else if (sitterId === user.profile.id) {
				const { fns, ...searchParams } = sitterStore
				getCurrentUserSitterBookings({ variables: searchParams })
			}
			const booking = ownerBookingStatusChange?.userBookingsStatusChangesSub?.booking
			const userIsNotOriginOfChange = booking?.lastUpdatedBy !== user.profile.id
			if (booking?.id && userIsNotOriginOfChange) {
				// Show toast
				const ownerName = `${booking.owner.firstName} ${
					booking.owner.lastName ? `${booking.owner.lastName}` : ''
				}`
				const sitterName = `${booking.sitter.firstName} ${booking.sitter.lastName}`
				const correctNameToShow =
					user.profile.firstName === booking.sitter.firstName ? ownerName : sitterName

				toastIdRef.current = toast({
					position: 'top-right',
					duration: 9000,
					render: () => (
						<BookingStatusChange
							redirectToBookingDetails={() => redirectTo(booking.id, 'details')}
							booking={booking}
							subTitle={t2('subTitle', {
								name: correctNameToShow,
								start: format(new Date(booking.startDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								}),
								end: format(new Date(booking.endDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								})
							})}
						/>
					)
				})
			}
		}
	}

	// Bookings messages changes
	const {
		data: ownerBookingMessagesChange
	} = useSubscribeToUserBookingsMessagesChangesSubscription({
		variables: {
			bookingsIds: ownerBookingsIds,
			authorId: user.profile.id
		},
		onSubscriptionData: ({ subscriptionData: { data } }) =>
			handleOwnerBookingMessagesChange(data)
	})

	function handleOwnerBookingMessagesChange(
		data: SubscribeToUserBookingsMessagesChangesSubscription
	) {
		if (data?.userBookingsMessagesChangesSub?.message?.booking) {
			const { ownerId, sitterId } = data.userBookingsMessagesChangesSub.message.booking
			if (ownerId === user.profile.id) {
				getCurrentUserOwnerBookings()
			} else if (sitterId === user.profile.id) {
				getCurrentUserSitterBookings()
			}
			if (ownerBookingMessagesChange?.userBookingsMessagesChangesSub?.message.id) {
				const bookingId =
					ownerBookingMessagesChange.userBookingsMessagesChangesSub.message.bookingId
				toastIdRef.current = toast({
					position: 'top-right',
					duration: 9000,
					render: () => (
						<NewMessageToast
							redirectToBookingMessages={() => redirectTo(bookingId, 'messages')}
							message={
								ownerBookingMessagesChange?.userBookingsMessagesChangesSub?.message
							}
							subTitle={t('subTitle', {
								name: `${ownerBookingMessagesChange?.userBookingsMessagesChangesSub?.message.author.firstName} ${ownerBookingMessagesChange?.userBookingsMessagesChangesSub?.message.author.lastName}`
							})}
						/>
					)
				})
			}
		}
	}

	return <>{children}</>
}

function NewMessageToast({ redirectToBookingMessages, message, subTitle }) {
	return (
		<Flex
			p={3}
			m={3}
			bg='white'
			boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
			color='black'
			borderRadius='10px'
			align='center'
			justify='space-between'
			_hover={{ cursor: 'pointer' }}
			as='button'
			onClick={redirectToBookingMessages}
		>
			<Box textAlign='left' width={message.author.pictureUrl ? 'calc(100% - 60px)' : '100%'}>
				<Heading fontSize='12px' mb={1}>
					{subTitle}
				</Heading>

				<Text fontSize='12px'>
					{message.content.length > 50
						? message.content.substr(0, 50).concat('...')
						: message.content}
				</Text>
			</Box>
			{message.author.pictureUrl && (
				<Image
					width='50px'
					objectFit='cover'
					borderRadius='10px'
					src={message.author.pictureUrl}
					fallbackSrc={message.author.pictureUrl}
				/>
			)}
		</Flex>
	)
}
function BookingStatusChange({ redirectToBookingDetails, booking, subTitle }) {
	return (
		<Flex
			p={3}
			m={3}
			bg='white'
			boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
			color='black'
			borderRadius='10px'
			align='center'
			justify='space-between'
			_hover={{ cursor: 'pointer' }}
			as='button'
			onClick={redirectToBookingDetails}
			maxW={isMobile ? '300px' : '350px'}
		>
			<Box textAlign='left' width={booking.sitter.pictureUrl ? 'calc(100% - 60px)' : '100%'}>
				<Heading fontSize='12px' mb={1}>
					{subTitle}
				</Heading>
				<BookingStatus status={booking.status} />
			</Box>
			{booking.sitter.pictureUrl && (
				<Image
					width='50px'
					objectFit='cover'
					borderRadius='10px'
					src={booking.sitter.pictureUrl}
					fallbackSrc={booking.sitter.pictureUrl}
				/>
			)}
		</Flex>
	)
}

function NewBookingCreated({ redirectToBookingDetails, message, subTitle }) {
	return (
		<Flex
			p={3}
			m={3}
			bg='white'
			boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
			color='black'
			borderRadius='10px'
			align='center'
			justify='space-between'
			_hover={{ cursor: 'pointer' }}
			as='button'
			onClick={redirectToBookingDetails}
			maxW={isMobile ? '300px' : '350px'}
		>
			<Box textAlign='left' width='100%'>
				<Heading fontSize='12px' mb={1}>
					{subTitle}
				</Heading>
				<Text fontSize='12px'>{message}</Text>
			</Box>
		</Flex>
	)
}
