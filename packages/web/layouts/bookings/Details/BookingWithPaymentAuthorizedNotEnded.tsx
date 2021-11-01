import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { useCancelOnGoingBookingMutation } from 'generated/graphql'
import { handleErrors } from 'utils/errors'

import {
	GET_BOOKING_BY_ID,
	GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS,
	GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS
} from 'graphql/booking/query'
import {
	Text,
	Button,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Textarea
} from '@chakra-ui/react'

export function BookingWithPaymentAuhorizedStartedNotEnded({
	isPetSitter,
	isPetOwner,
	bookingHasStarted,
	booking,
	onClose
}) {
	const [cancellationReason, setCancellationReason] = useState('')
	const [errors, setErrors] = useState({})
	const { t, lang } = useI18n(profileBookingJSON)
	const [cancelOnGoingBooking] = useCancelOnGoingBookingMutation()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setCancellationReason(value)
	}

	async function cancelBooking() {
		const { data } = await cancelOnGoingBooking({
			variables: {
				id: booking.id,
				source: isPetSitter ? 'SITTER' : 'OWNER',
				reason: cancellationReason
			},
			refetchQueries: [
				{
					query: GET_BOOKING_BY_ID,
					variables: { id: booking.id }
				},
				{
					query: isPetSitter
						? GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS
						: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS
				}
			]
		})
		if (data.cancelOnGoingBooking.booking) {
			onClose()
		} else {
			// @ts-expect-error
			handleErrors(data.cancelOnGoingBooking.errors, setErrors)
		}
	}

	return (
		<>
			<ModalHeader fontSize='2xl' textAlign='center'>
				{isPetSitter &&
					t('refuseBookingModalTitle', {
						action: lang === 'fr' ? 'annuler' : 'cancel'
					})}

				{isPetOwner &&
					t('refuseBookingModalTitle', {
						action: lang === 'fr' ? 'annuler' : 'cancel'
					})}
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				{bookingHasStarted ? (
					<Text textAlign='center' color='gray.700' mb={2}>
						{t('cancelStartedBookingSubTitleOne')}{' '}
						{t('cancelStartedBookingSubTitleTwo')}
					</Text>
				) : (
					<Text textAlign='center' color='gray.700'>
						{t('cancelNonStartedAuthorizedBookingSubtitle')}
					</Text>
				)}

				{bookingHasStarted && (
					<FormControl my={2}>
						<FormLabel>{t('cancelationReasons')}</FormLabel>
						<Textarea
							type='text'
							id='reason'
							name='reason'
							value={cancellationReason}
							aria-describedby='cancelation reasons'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['reason']}
						/>
					</FormControl>
				)}
			</ModalBody>
			<ModalFooter
				display='flex'
				alignItems='center'
				flexDirection={['column-reverse', 'column-reverse', 'row']}
				justifyContent={['center', 'center', 'space-between']}
			>
				<Button colorScheme='gray' onClick={cancelBooking}>
					{t('cancelBooking')}
				</Button>

				<Button colorScheme='red' onClick={onClose} mb={[6, 6, 0]}>
					{t('goBackBtn')}
				</Button>
			</ModalFooter>
		</>
	)
}
