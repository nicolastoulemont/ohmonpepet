import React from 'react'
import { Button, Box, Flex, Text, Heading, Textarea, useToast, Link } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { formatForUrl } from 'utils/dates'
import bookingJSON from 'statics/booking.json'
import {
	useCreateBookingMutation,
	useProfileByCurrentUserIdLazyQuery,
	useCurrentUserOwnerBookingsLazyQuery
} from 'generated/graphql'

export function BookingConnected({ state, profile, handleChange }) {
	const { t } = useI18n(bookingJSON)
	const toast = useToast()

	const [createBooking] = useCreateBookingMutation()
	const [getCurrentUserProfile] = useProfileByCurrentUserIdLazyQuery()
	const [getCurrentUserOwnerBookings] = useCurrentUserOwnerBookingsLazyQuery()

	async function handleSubmit() {
		const { data } = await createBooking({
			variables: {
				input: {
					sitterId: profile.id,
					startDate: formatForUrl(state.startDate),
					endDate: formatForUrl(state.endDate),
					animalsIds: state.acceptedAnimalsIds,
					service: state.service,
					selectedOptions:
						state.selectedOptions.length === 0
							? []
							: state.selectedOptions.map((option) => ({
									key: option.name,
									price: option.price
							  })),
					message: state['ownerMessage']
				}
			}
		})
		if (data?.createBooking.booking) {
			getCurrentUserProfile()
			getCurrentUserOwnerBookings()
			toast({
				position: 'top',
				duration: 9000,
				render: () => (
					<Box
						p={6}
						mt={6}
						mx={3}
						bg='green.500'
						color='white'
						borderRadius='10px'
						textAlign='left'
					>
						<Heading size='md'>{t('bookingSuccessTitle')}</Heading>
						<Text fontSize='14px'>{t('bookingSuccessMessageOne')}</Text>
						<Text fontSize='14px'>
							{t('bookingSuccessMessageTwo')}{' '}
							<Link href='/bookings' fontWeight={600} textDecoration='underline'>
								{t('bookingSuccessLink')}
							</Link>
						</Text>
					</Box>
				)
			})
		} else {
			toast({
				position: 'top',
				title: t('bookingErrorTitle'),
				description: t('bookingErrorSubTitle'),
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		}
	}

	return (
		<Box width='100%'>
			<Box width='100%' mb={6}>
				<Heading size='lg' textAlign={{ base: 'center', md: 'left' }}>
					{t('additionalInfos')}
				</Heading>
				<Text color='gray.500' mb={6} textAlign={{ base: 'center', md: 'left' }}>
					{t('additionalInfosHelper', { name: profile.firstName })}
				</Text>
				<Textarea
					name='ownerMessage'
					value={[state['ownerMessage'] || '']}
					onChange={handleChange}
				/>
			</Box>

			<Flex
				width='100%'
				flexDir={{ base: 'column', md: 'row' }}
				align='center'
				justify='flex-start'
			>
				<Button type='submit' onClick={handleSubmit} colorScheme='red' size='lg'>
					{t('createBooking')}
				</Button>
				<Flex
					height='100%'
					align='flex-start'
					flexDirection='column'
					flex='1'
					ml={{ base: 0, md: 6 }}
					mt={{ base: 6, md: 0 }}
					textAlign={{ base: 'center', md: 'left' }}
				>
					<Text fontSize='14px' fontWeight={600}>
						{t('createBookingHelperOne')}
					</Text>
					<Text fontSize='14px' color='gray.500'>
						{t('createBookingHelperTwo')}
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}
