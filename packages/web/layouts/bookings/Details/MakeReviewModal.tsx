import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { handleErrors } from 'utils/errors'
import { useCreateReviewMutation } from 'generated/graphql'
import { GET_BOOKING_BY_ID, GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS } from 'graphql/booking/query'
import { IoIosStar } from 'react-icons/io'
import {
	Text,
	Button,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	useToast,
	IconButton,
	Flex
} from '@chakra-ui/react'

interface ReviewState {
	title: string
	body: string
	rating: number | undefined
}

export function MakeReviewModal({ onClose, booking }) {
	const [state, setState] = useState<ReviewState>({
		title: '',
		body: '',
		rating: 0
	})
	const [errors, setErrors] = useState({})
	const { t } = useI18n(profileBookingJSON)
	const toast = useToast()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const [makeReview] = useCreateReviewMutation({
		variables: {
			input: {
				bookingId: booking.id,
				sitterId: booking.sitter.id,
				title: state.title,
				body: state.body,
				rating: state.rating
			}
		},
		refetchQueries: [
			{ query: GET_BOOKING_BY_ID, variables: { id: booking.id } },
			{ query: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS }
		]
	})

	async function handleReviewSubmit() {
		if (state.rating === 0) {
			setErrors({ ...errors, rating: 'error' })
		} else {
			const { data } = await makeReview()
			if (data?.createReview.errors) {
				// @ts-expect-error
				handleErrors(data.createReview.errors, setErrors)
			} else {
				// Close modal
				onClose()
				// success toast
				toast({
					position: 'top',
					title: t('reviewSuccessTitle'),
					description: t('reviewSuccessDescription'),
					status: 'success',
					duration: 9000,
					isClosable: true
				})
			}
		}
	}

	function handleStarClick(value: number) {
		if (state['rating'] && state['rating'] === value) {
			setState({ ...state, rating: 0 })
		} else {
			setErrors({ ...errors, rating: undefined })
			setState({ ...state, rating: value })
		}
	}

	const STAR_DEFAULT_COLOR = '#A0AEC0'
	const STAR_IN_RANGE_COLOR = '#ECC94B'

	return (
		<>
			<ModalHeader fontSize='2xl' textAlign='center'>
				{t('makeReviewModalTitle', { petSitterName: booking.sitter.firstName })}
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text textAlign='center' color='gray.700' mb={2}>
					{t('makeReviewModalSubtitle', { petSitterName: booking.sitter.firstName })}
				</Text>
				<FormControl my={2}>
					<FormLabel htmlFor='rating' color={errors['rating'] ? 'red.500' : 'gray.800'}>
						{t('makeReviewModalRatingFieldLabel')}
					</FormLabel>
					<Flex>
						<IconButton
							icon={
								<IoIosStar
									color={
										state['rating'] && state['rating'] >= 1
											? STAR_IN_RANGE_COLOR
											: STAR_DEFAULT_COLOR
									}
								/>
							}
							aria-label={t('makeReviewModalRatingFieldArialLabel', { note: '1' })}
							bgColor='transparent'
							fontSize='25px'
							borderRadius='50%'
							onClick={() => handleStarClick(1)}
						/>
						<IconButton
							icon={
								<IoIosStar
									color={
										state['rating'] && state['rating'] >= 2
											? STAR_IN_RANGE_COLOR
											: STAR_DEFAULT_COLOR
									}
								/>
							}
							aria-label={t('makeReviewModalRatingFieldArialLabel', { note: '2' })}
							bgColor='transparent'
							fontSize='25px'
							borderRadius='50%'
							onClick={() => handleStarClick(2)}
						/>
						<IconButton
							icon={
								<IoIosStar
									color={
										state['rating'] && state['rating'] >= 3
											? STAR_IN_RANGE_COLOR
											: STAR_DEFAULT_COLOR
									}
								/>
							}
							aria-label={t('makeReviewModalRatingFieldArialLabel', { note: '3' })}
							bgColor='transparent'
							fontSize='25px'
							borderRadius='50%'
							onClick={() => handleStarClick(3)}
						/>
						<IconButton
							icon={
								<IoIosStar
									color={
										state['rating'] && state['rating'] >= 4
											? STAR_IN_RANGE_COLOR
											: STAR_DEFAULT_COLOR
									}
								/>
							}
							aria-label={t('makeReviewModalRatingFieldArialLabel', { note: '4' })}
							bgColor='transparent'
							fontSize='25px'
							borderRadius='50%'
							onClick={() => handleStarClick(4)}
						/>
						<IconButton
							icon={
								<IoIosStar
									color={
										state['rating'] && state['rating'] >= 5
											? STAR_IN_RANGE_COLOR
											: STAR_DEFAULT_COLOR
									}
								/>
							}
							aria-label={t('makeReviewModalRatingFieldArialLabel', { note: '5' })}
							bgColor='transparent'
							fontSize='25px'
							borderRadius='50%'
							onClick={() => handleStarClick(5)}
						/>
					</Flex>
				</FormControl>
				<FormControl my={2} isRequired>
					<FormLabel htmlFor='title'>{t('makeReviewModalTitleFieldLabel')}</FormLabel>
					<Input
						type='text'
						id='title'
						name='title'
						value={state['title'] || ''}
						aria-describedby={t('makeReviewModalTitleFieldLabel')}
						variant='outline'
						onChange={handleChange}
						isInvalid={!!errors['title']}
					/>
				</FormControl>
				<FormControl my={2}>
					<FormLabel htmlFor='body'>
						{t('makeReviewModalDescriptionFieldLabel')}
					</FormLabel>
					<Textarea
						type='text'
						id='body'
						name='body'
						value={state['body'] || ''}
						aria-describedby={t('makeReviewModalDescriptionFieldLabel')}
						variant='outline'
						onChange={handleChange}
						isInvalid={!!errors['body']}
					/>
				</FormControl>
			</ModalBody>
			<ModalFooter
				display='flex'
				alignItems='center'
				flexDirection={{ base: 'column-reverse', md: 'row' }}
				justifyContent={{ base: 'center', md: 'space-between' }}
			>
				<Button colorScheme='gray' onClick={onClose}>
					{t('goBackBtn')}
				</Button>
				<Button colorScheme='red' onClick={handleReviewSubmit} mb={{ base: 6, md: 0 }}>
					{t('createReviewBtn')}
				</Button>
			</ModalFooter>
		</>
	)
}
