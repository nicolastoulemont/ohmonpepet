import { useCurrentUserSitterBookingsQuery } from 'generated/graphql'
import React, { useMemo } from 'react'
import { Heading, Text, Box } from '@chakra-ui/react'
import metricsJSON from 'statics/pet-sitter/metrics.json'
import { useI18n } from 'utils/hooks/useI18n'

export function Bookings({ speciesLookUp, gendersLookUp, profile }) {
	const { t, lang } = useI18n(metricsJSON)
	const { data } = useCurrentUserSitterBookingsQuery({ variables: { includeFinished: true } })

	const isFemale = useMemo(
		() =>
			gendersLookUp[profile.genderId] &&
			(gendersLookUp[profile.genderId].name[lang] === 'madame' ||
				gendersLookUp[profile.genderId].name[lang] === 'female'),
		[gendersLookUp]
	)

	const numberBookingsForEachSpecie: Array<{ animalId: string; number: number }> = useMemo(() => {
		if (!data) return []
		const lookup: Record<string, any> =
			data?.currentUserSitterBookings?.bookings &&
			data.currentUserSitterBookings.bookings.reduce((acc, item) => {
				item.animalsIds.forEach((id) => {
					if (acc[id]) {
						acc[id] = acc[id] + 1
					} else {
						acc[id] = 1
					}
				})

				return acc
			}, {})
		return Object.entries(lookup).map((item) => ({
			animalId: item[0],
			number: item[1]
		}))
	}, [data])

	return (
		<Box as='section' mb={6}>
			<Heading size='md' mb={3}>
				{t('bookings')}
			</Heading>
			<Text>
				{t('selected', {
					gender: isFemale ? 'e' : '',
					number: data?.currentUserSitterBookings?.bookings?.length || '',
					colon: numberBookingsForEachSpecie.length > 1 ? ':' : ''
				})}

				{numberBookingsForEachSpecie.map(
					({ animalId, number }, index) =>
						`${index !== 0 ? ',' : ''}${number} ${speciesLookUp[animalId].name[lang]}${
							number > 1 ? 's' : ''
						}${index === numberBookingsForEachSpecie.length - 1 ? '.' : ''}`
				)}
			</Text>
		</Box>
	)
}
