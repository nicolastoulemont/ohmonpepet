import React, { useMemo } from 'react'
import { Box, Button, Text, Link } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import bookingJSON from 'statics/booking.json'
import NextLink from 'next/link'
import { formatForUrl } from 'utils/dates'

export function BookingNotConnected({ id, state }) {
	const { t } = useI18n(bookingJSON)

	const query = useMemo(
		() => ({
			src: 'booking',
			id: id,
			address: state.address,
			lat: state.location.coordinates[1],
			lng: state.location.coordinates[0],
			startDate: formatForUrl(state.startDate),
			endDate: formatForUrl(state.endDate),
			acceptedAnimalsIds: state.acceptedAnimalsIds,
			service: state.service,
			selectedOptions: state.selectedOptions.map((option) => `${option.name}+${option.price}`)
		}),
		[id, state]
	)

	return (
		<Box width='100%'>
			<NextLink passHref href={{ pathname: '/signup', query }}>
				<Button as={Link} my={3} colorScheme='red' height='45px' size='lg'>
					{t('notConnectedBtn')}
				</Button>
			</NextLink>

			<Text mb={3} fontSize='18px'>
				{t('notConnectedLinkOne')}{' '}
				<NextLink passHref href={{ pathname: '/signin', query }}>
					<Link fontWeight={600} textDecoration='underline'>
						{t('notConnectedLinkTwo')}
					</Link>
				</NextLink>
			</Text>
		</Box>
	)
}
