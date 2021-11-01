import React from 'react'
import { Box, Flex, Text, Divider, Heading } from '@chakra-ui/react'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import { useI18n } from 'utils/hooks/useI18n'
import bookingJSON from 'statics/booking.json'
import { calculateTotalPrice } from 'utils'
import { BookingTotal } from 'layouts/shared/BookingTotal'

export function BookingMobileInfosBottom({ state, profile, selectedDays }) {
	const { t } = useI18n(bookingJSON)

	return (
		<Box display={['block', 'block', 'block', 'none']} width='100%'>
			<Heading size='md' my={3}>
				{t('priceDetails')}
			</Heading>
			<Flex align='center' justify='space-between' my={2}>
				<Flex align='center' justify='flex-start'>
					<SitterServicePrices
						state={state}
						profile={profile}
						requiredDaysNumber={selectedDays?.length || 0}
						showTotal={false}
					/>
					<Text mx={2} fontSize='14px'>
						x
					</Text>{' '}
					{selectedDays.length}
				</Flex>
				<Text>
					{!state['service']
						? profile.atHomeDay * selectedDays.length
						: profile[state['service']] * selectedDays.length}
					{`€`}
				</Text>
			</Flex>
			{state.selectedOptions.map((option) => (
				<Flex my={2} align='center' justify='space-between' key={option.name}>
					<Text fontSize='14px'>
						{
							// @ts-expect-error
							t(`${option.name}Short`)
						}
					</Text>
					<Text>
						{option.price} {`€`}
					</Text>
				</Flex>
			))}
			<BookingTotal
				total={calculateTotalPrice(
					selectedDays.length,
					state.selectedOptions,
					profile,
					state.service
				)}
			/>
			<Divider my={6} />
		</Box>
	)
}
