import React, { useEffect, useMemo, useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { BookingStatus } from 'layouts/shared/BookingStatus'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import { BookingActionsAndPayment } from './BookingActionsAndPayment'
import { BookingWithPaymentAuhorizedEnded } from './BookingWithPaymentAuthorizedEnded'
import { BookingWithPaymentAuhorizedStartedNotEnded } from './BookingWithPaymentAuthorizedNotEnded'
import { MakeReviewModal } from './MakeReviewModal'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { getIntervalDays, getValueFromPercentage, roundToTwoDecimals } from 'utils'
import { isAfter } from 'date-fns'
import { useCancelBookingMutation } from 'generated/graphql'
import {
	GET_BOOKING_BY_ID,
	GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS,
	GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS
} from 'graphql/booking/query'
import {
	Box,
	Heading,
	Flex,
	Text,
	Image,
	Divider,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter
} from '@chakra-ui/react'

type ModalState =
	| 'PAYMENT_AUTHORIZED_STARTED_NOT_ENDED'
	| 'OTHER'
	| 'PAYMENT_AUTHORIZED_ENDED'
	| 'MAKE_REVIEW'

export function Details({ booking, user, partnersLookUp }) {
	const [modalContent, setModalContent] = useState<ModalState>('OTHER')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { t, lang } = useI18n(profileBookingJSON)

	useEffect(() => {
		modalContent !== 'OTHER' && setModalContent('OTHER')
	}, [])

	const selectedDays = useMemo(
		() => (booking ? getIntervalDays(booking.startDate, booking.endDate) : []),
		[booking]
	)

	const isPetSitter = user.profile.id === booking.sitter.id
	const isPetOwner = user.profile.id === booking.owner.id

	const [cancelBookingMutation] = useCancelBookingMutation()

	const bookingHasStarted = isAfter(new Date(), new Date(booking.startDate))
	const bookingHasEnded = isAfter(new Date(), new Date(booking.endDate))

	const sitterHasPartnerShip =
		booking?.sitter?.partnerId && booking?.sitter?.partnerPercentage !== 0

	const amountGivenToPartner = sitterHasPartnerShip
		? roundToTwoDecimals(
				getValueFromPercentage(
					booking.sitter.partnerPercentage as number,
					booking.priceWithoutApplicationFee
				)
		  )
		: 0

	async function cancelBooking(source: 'OWNER' | 'SITTER') {
		await cancelBookingMutation({
			variables: { id: booking.id, source },
			refetchQueries: [
				{
					query: GET_BOOKING_BY_ID,
					variables: { id: booking.id }
				},
				{
					query:
						source === 'OWNER'
							? GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS
							: GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS
				}
			]
		})
		onClose()
	}

	return (
		<Box width='100%' boxSizing='border-box'>
			<Flex
				width='100%'
				align={['center', 'center', 'stretch']}
				justify={['center', 'center', 'space-between']}
				flexDir={['column-reverse', 'column-reverse', 'row']}
				mb={[3, 3, 3, 6]}
			>
				<Flex
					width={['100%', '100%', '66%']}
					flexDir='column'
					align='flex-start'
					justify='flex-start'
					p={3}
				>
					<Flex width='100%' align='center' justify='space-between' my={3}>
						<Heading fontSize={['base', 'base', '2xl']}>{t('dates')}</Heading>
						<Text fontWeight={600} fontSize='lg'>
							{format(new Date(booking.startDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							})}
							{' - '}
							{format(new Date(booking.endDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							})}
						</Text>
					</Flex>
					<Flex width='100%' my={3} justify='space-between'>
						<Heading fontSize={['base', 'base', '2xl']}>
							{isPetOwner ? t('sitter') : isPetSitter ? t('owner') : null}
						</Heading>
						<Flex align='center' justify='center'>
							{isPetOwner && (
								<>
									<Heading size='md'>{booking.sitter.firstName}</Heading>
									{booking.sitter.stars && booking.sitter.ratings && (
										<Flex width='100%' align='center' justify='flex-end' ml={3}>
											<Image
												src='/img/star.svg'
												width='16px'
												height='16px'
												mr={1}
											/>
											{booking.sitter.stars}{' '}
											<Text ml={1} fontWeight={400} color='gray.500'>
												({booking.sitter.ratings.length})
											</Text>
										</Flex>
									)}
								</>
							)}
							{isPetSitter && <Heading size='md'>{booking.owner.firstName}</Heading>}
						</Flex>
					</Flex>
					<Flex width='100%' align='center' justify='space-between' my={3}>
						<Heading fontSize={['base', 'base', '2xl']} mr={[3, 3, 0]}>
							{t('status')}
						</Heading>
						<BookingStatus status={booking.status} />
					</Flex>
					<Box width='100%'>
						<Divider mb={4} />
						<Heading fontSize={['base', 'base', '2xl']} my={3}>
							{t('priceDetails')}
						</Heading>
						<Flex align='center' justify='space-between' my={2}>
							<Flex align='center' justify='flex-start'>
								<SitterServicePrices
									state={{ server: booking.service }}
									profile={booking.sitter}
									requiredDaysNumber={selectedDays?.length || 0}
									showTotal={false}
								/>
								<Text mx={2} fontSize='14px'>
									x
								</Text>
								{selectedDays.length}
							</Flex>
							<Text>
								{booking.sitter[booking.service] * selectedDays.length}
								{`€`}
							</Text>
						</Flex>
						{booking.selectedOptions.map((option) => (
							<Flex my={1} align='center' justify='space-between' key={option.key}>
								<Text>
									{
										// @ts-expect-error
										t(`${option.key}Short`)
									}
								</Text>
								<Text>
									{option.price} {`€`}
								</Text>
							</Flex>
						))}
						<Box width='100%' mt={3}>
							<Divider my={2} />
							{isPetOwner ? (
								<>
									<Flex width='100%' align='center' justify='space-between'>
										<Text fontSize='14px' fontWeight={400} my={0}>
											{t('service')}
										</Text>
										<Text fontSize='14px' fontWeight={400}>
											{booking.applicationFeeAmount}
											{`€`}
										</Text>
									</Flex>
									<Divider my={2} />
								</>
							) : null}

							<Flex width='100%' align='center' justify='space-between' mt={1}>
								<Text fontSize='17px' fontWeight={600}>
									{t('total')}
								</Text>
								<Text fontSize='17px' fontWeight={600}>
									{isPetOwner ? booking.priceWithApplicationFee : null}
									{isPetSitter
										? sitterHasPartnerShip
											? roundToTwoDecimals(
													booking.priceWithoutApplicationFee -
														amountGivenToPartner
											  )
											: booking.priceWithoutApplicationFee
										: null}
									{`€`}
								</Text>
							</Flex>
							{sitterHasPartnerShip ? (
								<Flex width='100%' align='center' justify='flex-end'>
									<Text fontSize='xs'>
										{`${isPetSitter ? '+ ' : ''}${amountGivenToPartner} € `}
										{t('givenTo', {
											pluriel: amountGivenToPartner > 1 ? 's' : ''
										})}{' '}
										{partnersLookUp[booking.sitter.partnerId].name}{' '}
									</Text>
								</Flex>
							) : null}
						</Box>
					</Box>
				</Flex>
				{isPetSitter && (
					<Flex width={['100%', '100%', '33%']}>
						<Image
							src={
								booking.owner.pictureUrl
									? booking.owner.pictureUrl
									: '/img/user_yellow.svg'
							}
							alt='pet sitter picture'
							width='100%'
							maxHeight={['200px', '300px', '500px']}
							borderRadius='10px'
							objectFit={booking.owner.pictureUrl ? 'cover' : 'none'}
						/>
					</Flex>
				)}
				{isPetOwner && (
					<Flex width={['100%', '100%', '33%']}>
						<Image
							src={
								booking.sitter.pictureUrl
									? booking.sitter.pictureUrl
									: '/img/user_yellow.svg'
							}
							alt='pet sitter picture'
							width='100%'
							maxHeight={['200px', '300px', '500px']}
							borderRadius='10px'
							objectFit={booking.sitter.pictureUrl ? 'cover' : 'none'}
						/>
					</Flex>
				)}
			</Flex>
			<BookingActionsAndPayment
				isPetSitter={isPetSitter}
				isPetOwner={isPetOwner}
				booking={booking}
				bookingHasStarted={bookingHasStarted}
				bookingHasEnded={bookingHasEnded}
				onOpen={onOpen}
				setModalContent={setModalContent}
			/>
			<Modal onClose={onClose} isOpen={isOpen} isCentered size='lg'>
				<ModalOverlay />
				<ModalContent>
					{modalContent === 'OTHER' && (
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
								<Text textAlign='center' color='gray.700'>
									{t('refuseBookingModalSubTitle')}
								</Text>
							</ModalBody>
							<ModalFooter
								display='flex'
								alignItems='center'
								flexDirection={['column-reverse', 'column-reverse', 'row']}
								justifyContent={['center', 'center', 'space-between']}
							>
								{isPetSitter && booking.status !== 'CANCELED' && (
									<Button
										colorScheme='gray'
										onClick={() => cancelBooking('SITTER')}
									>
										{booking.sitterOk?.confirm
											? t('cancelBooking')
											: t('refuseBooking')}
									</Button>
								)}
								{isPetOwner && booking.status !== 'CANCELED' && (
									<Button
										colorScheme='gray'
										onClick={() => cancelBooking('OWNER')}
									>
										{booking.ownerOk?.confirm
											? t('cancelBooking')
											: t('refuseBooking')}
									</Button>
								)}
								<Button colorScheme='red' onClick={onClose} mb={[6, 6, 0]}>
									{t('goBackBtn')}
								</Button>
							</ModalFooter>
						</>
					)}
					{modalContent === 'MAKE_REVIEW' && (
						<MakeReviewModal onClose={onClose} booking={booking} />
					)}
					{modalContent === 'PAYMENT_AUTHORIZED_STARTED_NOT_ENDED' && (
						<BookingWithPaymentAuhorizedStartedNotEnded
							isPetOwner={isPetOwner}
							isPetSitter={isPetSitter}
							bookingHasStarted={bookingHasStarted}
							booking={booking}
							onClose={onClose}
						/>
					)}
					{modalContent === 'PAYMENT_AUTHORIZED_ENDED' && (
						<BookingWithPaymentAuhorizedEnded onClose={onClose} booking={booking} />
					)}
				</ModalContent>
			</Modal>
		</Box>
	)
}
