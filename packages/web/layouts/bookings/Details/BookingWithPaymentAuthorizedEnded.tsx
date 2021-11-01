import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { handleErrors } from 'utils/errors'
import { useCreateBookingClaimMutation } from 'generated/graphql'
import { GET_BOOKING_BY_ID, GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS } from 'graphql/booking/query'
import {
	Text,
	Button,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Textarea,
	useToast
} from '@chakra-ui/react'

export function BookingWithPaymentAuhorizedEnded({ onClose, booking }) {
	const [state, setState] = useState({})
	const [errors, setErrors] = useState({})
	const { t } = useI18n(profileBookingJSON)
	const toast = useToast()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const [makeClaim] = useCreateBookingClaimMutation({
		variables: { bookingId: booking.id, reason: state['reason'] || '' },
		refetchQueries: [
			{ query: GET_BOOKING_BY_ID, variables: { id: booking.id } },
			{ query: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS }
		]
	})

	async function handleClaimSubmit() {
		const { data } = await makeClaim()
		if (data?.createBookingClaim.errors) {
			// @ts-expect-error
			handleErrors(data.createBookingClaim.errors, setErrors)
		} else {
			// Close modal
			onClose()
			// success toast
			toast({
				position: 'top',
				title: t('claimSuccessTitle'),
				description: t('claimSuccessDescription'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		}
	}

	return (
		<>
			<ModalHeader fontSize='2xl' textAlign='center'>
				{t('reclamationBookingModalTitle')}
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text textAlign='center' color='gray.700' mb={2}>
					{t('cancelEndedBookingSubTitleOne')} {t('cancelEndedBookingSubTitleTwo')}
				</Text>
				<FormControl my={2}>
					<FormLabel>{t('reclamationReasons')}</FormLabel>
					<Textarea
						type='text'
						id='reason'
						name='reason'
						value={state['reason'] || ''}
						aria-describedby='reclamation rease'
						variant='outline'
						onChange={handleChange}
						isInvalid={!!errors['reason']}
					/>
				</FormControl>
			</ModalBody>
			<ModalFooter
				display='flex'
				alignItems='center'
				flexDirection={['column-reverse', 'column-reverse', 'row']}
				justifyContent={['center', 'center', 'space-between']}
			>
				<Button colorScheme='gray' onClick={handleClaimSubmit}>
					{t('makeAClaim')}
				</Button>

				<Button colorScheme='red' onClick={onClose} mb={[6, 6, 0]}>
					{t('goBackBtn')}
				</Button>
			</ModalFooter>
		</>
	)
}
