import { Text, Box, Flex, Image, chakra } from '@chakra-ui/react'
import profileBookingListJSON from 'statics/profileBookingList.json'
import React, { useMemo } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import { BookingStatus } from 'layouts/shared/BookingStatus'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getValueFromPercentage, roundToTwoDecimals } from 'utils'

const MotionLink = chakra(motion.a)

interface BookingProps {
	booking: any
	user: any
	viewer: 'owner' | 'sitter'
	partnersLookUp: any
}

export function Booking({ booking, user, viewer, partnersLookUp }: BookingProps) {
	const { t, lang } = useI18n(profileBookingListJSON)
	const { pathname } = useRouter()

	const unReadMessages = useMemo(
		() =>
			booking.messages.reduce(
				(acc, item) =>
					!item.readAt && item.authorId !== user.profile.id ? (acc = acc + 1) : acc,
				0
			),
		[booking.messages]
	)

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

	return (
		<NextLink
			href={{
				pathname: `/bookings/${booking.id}`,
				query: { src: pathname, panel: unReadMessages > 0 ? 'messages' : 'details' }
			}}
			passHref
		>
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
					align={{ base: 'center', md: 'flex-start' }}
					justify={{ base: 'center', md: 'space-between' }}
					flexDir={{ base: 'column-reverse', md: 'row' }}
				>
					<Box width={{ base: '100%', md: 'calc(100% - 80px)' }}>
						<Text
							fontSize={{ base: '18px', md: '14px' }}
							fontWeight={{ base: 600, md: 500 }}
							color='gray.600'
						>
							{
								// @ts-expect-error
								t(`${booking.service}`)
							}
						</Text>

						<Text textAlign='left' mb={3}>
							{format(new Date(booking.startDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							})}
							{' - '}
							{format(new Date(booking.endDate), 'd LLL', {
								locale: lang === 'fr' ? fr : enUS
							})}
						</Text>
						<BookingStatus status={booking.status} />
						<Text fontSize='sm' fontWeight={600}>
							{viewer === 'sitter'
								? `${
										sitterHasPartnerShip
											? roundToTwoDecimals(
													booking.priceWithoutApplicationFee -
														amountGivenToPartner
											  )
											: booking.priceWithoutApplicationFee
								  } €`
								: null}
							{viewer === 'owner' ? `${booking.priceWithApplicationFee} €` : null}
						</Text>
						{sitterHasPartnerShip ? (
							<Text fontSize='xs'>
								{`${viewer === 'sitter' ? '+ ' : ''}${amountGivenToPartner} € `}
								{t('givenTo', {
									pluriel: amountGivenToPartner > 1 ? 's' : ''
								})}{' '}
								{partnersLookUp[booking.sitter.partnerId].name}{' '}
							</Text>
						) : null}
					</Box>
					<Flex
						flexDir='column'
						align={{ base: 'center', md: 'flex-end' }}
						justify='center'
						py={2}
						width={{ base: '100%', md: '80px' }}
					>
						{booking?.sitter?.pictureUrl && (
							<Image
								src={booking.sitter.pictureUrl}
								alt='pet sitter picture'
								width={{ base: '90%', md: '75px' }}
								maxW={{ base: '250px', md: 'unset' }}
								borderRadius='10px'
								objectFit='cover'
							/>
						)}
						{booking?.owner && (
							<Image
								src={
									booking.owner.pictureUrl
										? booking.owner.pictureUrl
										: '/img/user_yellow.svg'
								}
								alt='pet owner picture'
								width={{ base: '90%', md: '75px' }}
								maxW={{ base: '250px', md: 'unset' }}
								borderRadius='10px'
								objectFit='cover'
							/>
						)}
						<Flex
							flexDir='column'
							width='100%'
							align={{ base: 'center', md: 'flex-end' }}
							justify='center'
						>
							{booking.sitter && (
								<Text
									fontSize='sm'
									fontWeight={600}
									display={{ base: 'none', md: 'block' }}
								>
									{booking.sitter.firstName}
								</Text>
							)}
							{booking.owner && <Text>{booking.owner.firstName}</Text>}
							{booking?.sitter?.stars && booking?.sitter?.ratings && (
								<Flex
									width='100%'
									align='center'
									justify={{ base: 'space-between', md: 'flex-end' }}
									fontSize='16px'
									mt={{ base: 3, md: 0 }}
								>
									<Text
										fontSize='sm'
										fontWeight={600}
										display={{ base: 'block', md: 'none' }}
									>
										{booking.sitter.firstName}
									</Text>
									<Flex align='center' justify='center'>
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
								</Flex>
							)}
						</Flex>
					</Flex>

					{unReadMessages > 0 ? (
						<Box
							pos='absolute'
							right='0px'
							top='-25px'
							backgroundColor='red.400'
							borderRadius='10px'
							width='auto'
							px={2}
							py={1}
							color='white'
							display='flex'
							alignItems='center'
							justifyContent='center'
							boxShadow='rgba(0, 0, 0, 0.12) 0px 2px 6px'
							transition='background-color 0.5s linear'
							zIndex={1}
							_hover={{ backgroundColor: 'red.500', zIndex: 99 }}
						>
							<Text fontSize='12px'>
								{unReadMessages}{' '}
								{t('newMessages', {
									pluriel: unReadMessages > 1 ? 'x' : '',
									plurielTwo: unReadMessages > 1 ? 's' : ''
								})}
							</Text>
						</Box>
					) : null}
				</Flex>
			</MotionLink>
		</NextLink>
	)
}
