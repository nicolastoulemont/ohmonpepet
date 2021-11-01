import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { Flex, Button } from '@chakra-ui/react'
import { CardInput } from 'components'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import {
	useAuthorizePaymentMutation,
	useConfirmBookingMutation,
	useUpdateBookingPaymentStatusMutation
} from 'generated/graphql'
import {
	GET_BOOKING_BY_ID,
	GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS,
	GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS
} from 'graphql/booking/query'

export function BookingActionsAndPayment({
	isPetSitter,
	isPetOwner,
	booking,
	bookingHasStarted,
	bookingHasEnded,
	onOpen,
	setModalContent
}) {
	const [paymentProcessing, setPaymentProcessing] = useState(false)
	const [error, setError] = useState<undefined | string>(undefined)
	const { t } = useI18n(profileBookingJSON)
	const [confirmBooking] = useConfirmBookingMutation()
	const [authorizePayment] = useAuthorizePaymentMutation()
	const [updateBookingPaymentStatus] = useUpdateBookingPaymentStatusMutation()

	const stripe = useStripe()
	const elements = useElements()
	async function handlePaymentSubmit(event) {
		event.preventDefault()

		if (!stripe || !elements) {
			return
		}
		setPaymentProcessing(true)

		const { data } = await authorizePayment({ variables: { bookingId: booking.id } })

		if (data?.authorizePayment.stripeTargetApi === 'SETUP_INTENT') {
			if (data?.authorizePayment.clientSecret) {
				const result = await stripe.confirmCardSetup(data.authorizePayment.clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement)
					}
				})
				if (result.error) {
					setError(result.error.message)
				} else if (result.setupIntent.payment_method) {
					updateBookingPaymentStatus({
						variables: {
							bookingId: booking.id,
							paymentMethodId: result.setupIntent.payment_method
						},
						refetchQueries: [
							{ query: GET_BOOKING_BY_ID, variables: { id: booking.id } },
							{ query: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS }
						]
					})
				}
			}
		} else if (data?.authorizePayment.stripeTargetApi === 'PAYMENT_INTENT') {
			if (data?.authorizePayment.clientSecret) {
				const result = await stripe.confirmCardPayment(data.authorizePayment.clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement)
					}
				})
				if (result.error) {
					setError(result.error.message)
				} else if (result.paymentIntent.status === 'requires_capture') {
					updateBookingPaymentStatus({
						variables: { bookingId: booking.id },
						refetchQueries: [
							{ query: GET_BOOKING_BY_ID, variables: { id: booking.id } },
							{ query: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS }
						]
					})
				}
			}
		}

		setPaymentProcessing(false)
	}

	// Owner actions conditions
	const isOwnerAndBookingIsPendingOwnerOrAllValidation =
		isPetOwner &&
		(booking.status === 'PENDING_OWNER_VALIDATION' || booking.status === 'NONE_CONFIRMED')

	const isOwnerAndBookingIsReadyForPayment = isPetOwner && booking.status === 'BOTH_CONFIRMED'
	const isOwnerAndBookingIsNotCanceled = isPetOwner && booking.status !== 'CANCELED'
	const isOwnerAndBookingIsNotPaidYet =
		isPetOwner &&
		booking.status !== 'BOTH_CONFIRMED' &&
		booking.status !== 'CANCELED' &&
		booking.status !== 'PAYMENT_AUTHORIZED' &&
		booking.status !== 'UNDER_REVIEW' &&
		booking.status !== 'PAID'

	const isOwnerAndBookingHasEndedAndHasNoReviewYet =
		isPetOwner &&
		bookingHasEnded &&
		booking.reviews.length === 0 &&
		(booking.status === 'PAYMENT_AUTHORIZED' || booking.status === 'PAID')

	const isOwnerAndBookingHasEndedAndPaymentHasBeenAuthorized =
		isPetOwner && booking.status === 'PAYMENT_AUTHORIZED' && bookingHasEnded

	// Sitter actions conditions
	const isSitterAndBookingIsPendingSitterOrAllValidation =
		isPetSitter &&
		(booking.status === 'PENDING_SITTER_VALIDATION' || booking.status === 'NONE_CONFIRMED')

	const isSitterAndBookingIsNotStartedNorPaidYet =
		isPetSitter &&
		booking.status !== 'CANCELED' &&
		booking.status !== 'PAID' &&
		booking.status !== 'UNDER_REVIEW' &&
		booking.status !== 'PAYMENT_AUTHORIZED' &&
		!bookingHasStarted

	const isSitterAndBookingIsNotStartedAndPaymentHasBeenAuthorized =
		isPetSitter && booking.status === 'PAYMENT_AUTHORIZED' && !bookingHasStarted

	// Owner and sitter actions conditions
	const bookingHasStartedButNotEndedAndPaymentHasBeenAuthorized =
		booking.status === 'PAYMENT_AUTHORIZED' && bookingHasStarted && !bookingHasEnded

	return (
		<>
			{isOwnerAndBookingIsReadyForPayment && (
				<Flex width={{ base: '100%', md: '66%' }}>
					<Flex
						width='50%'
						as='form'
						flexDir='column'
						align='center'
						justify='center'
						onSubmit={handlePaymentSubmit}
					>
						<CardInput
							error={error}
							handleChange={() => error && setError(undefined)}
						/>
						<Button
							width={{ base: '100%' }}
							mt={6}
							px={4}
							colorScheme='red'
							isLoading={paymentProcessing}
							disabled={!stripe || paymentProcessing}
							onClick={handlePaymentSubmit}
						>
							{t('pay')}
						</Button>
					</Flex>
					<Flex width='50%' align='flex-end' justify='flex-end'>
						{isOwnerAndBookingIsNotCanceled && (
							<Button colorScheme='gray' onClick={onOpen} size='sm'>
								{booking.ownerOk?.confirm ? t('cancelBooking') : t('refuseBooking')}
							</Button>
						)}
					</Flex>
				</Flex>
			)}
			<Flex
				width={['100%', '100%', '66%']}
				align='center'
				justify={['center', 'center', 'space-between']}
				flexDir={['column-reverse', 'column-reverse', 'row']}
			>
				{isSitterAndBookingIsNotStartedNorPaidYet && (
					<Button colorScheme='gray' onClick={onOpen}>
						{booking.sitterOk?.confirm ? t('cancelBooking') : t('refuseBooking')}
					</Button>
				)}

				{isOwnerAndBookingIsNotPaidYet && (
					<Button colorScheme='gray' onClick={onOpen}>
						{booking.ownerOk?.confirm ? t('cancelBooking') : t('refuseBooking')}
					</Button>
				)}

				{isSitterAndBookingIsNotStartedAndPaymentHasBeenAuthorized && (
					<Button colorScheme='gray' onClick={onOpen}>
						{booking.sitterOk?.confirm ? t('cancelBooking') : t('refuseBooking')}
					</Button>
				)}
				{bookingHasStartedButNotEndedAndPaymentHasBeenAuthorized && (
					<Button
						colorScheme='gray'
						onClick={() => {
							setModalContent('PAYMENT_AUTHORIZED_STARTED_NOT_ENDED')
							onOpen()
						}}
					>
						{t('cancelBooking')}
					</Button>
				)}
				{isOwnerAndBookingHasEndedAndPaymentHasBeenAuthorized && (
					<Button
						colorScheme='gray'
						onClick={() => {
							setModalContent('PAYMENT_AUTHORIZED_ENDED')
							onOpen()
						}}
					>
						{t('makeAClaim')}
					</Button>
				)}

				{isSitterAndBookingIsPendingSitterOrAllValidation && (
					<Button
						colorScheme='red'
						mb={{ base: 6, md: 0 }}
						onClick={() =>
							confirmBooking({
								variables: { id: booking.id, source: 'SITTER' },
								refetchQueries: [
									{
										query: GET_BOOKING_BY_ID,
										variables: { id: booking.id }
									},
									{ query: GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS }
								]
							})
						}
					>
						{t('confirmBooking')}
					</Button>
				)}
				{isOwnerAndBookingIsPendingOwnerOrAllValidation && (
					<Button
						colorScheme='red'
						mb={{ base: 6, md: 0 }}
						onClick={() =>
							confirmBooking({
								variables: { id: booking.id, source: 'OWNER' },
								refetchQueries: [
									{
										query: GET_BOOKING_BY_ID,
										variables: { id: booking.id }
									}
								]
							})
						}
					>
						{t('confirmBooking')}
					</Button>
				)}
				{isOwnerAndBookingHasEndedAndHasNoReviewYet && (
					<Button
						colorScheme='blue'
						mb={{ base: 6, md: 0 }}
						onClick={() => {
							setModalContent('MAKE_REVIEW')
							onOpen()
						}}
					>
						{t('makeReviewBtn')}
					</Button>
				)}
			</Flex>
		</>
	)
}
