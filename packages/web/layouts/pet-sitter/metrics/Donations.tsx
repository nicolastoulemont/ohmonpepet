import { Box, Flex, Heading, Image, Tag, Text } from '@chakra-ui/react'
import { useCurrentUserSitterDonationsQuery } from 'generated/graphql'
import React, { useMemo } from 'react'
import metricsJSON from 'statics/pet-sitter/metrics.json'
import { roundToTwoDecimals } from 'utils'
import { useI18n } from 'utils/hooks/useI18n'
import { Partner } from 'generated/graphql'

type PartnerLookUpInfos = Pick<Partner, 'id' | 'name' | 'description' | 'websiteUrl' | 'logoUrl'>
type CalculatedInfos = {
	numberOfDonations: number
	amountToDonate: number
	amountDonated: number
}

interface DonationsProps {
	partnersLookUp: Record<string, PartnerLookUpInfos>
}

export function Donations({ partnersLookUp }: DonationsProps) {
	const { t } = useI18n(metricsJSON)
	const { data } = useCurrentUserSitterDonationsQuery()
	const donations = useMemo(() => {
		if (!data) return []
		const lookup: Record<string, CalculatedInfos> =
			data?.currentUserSitterDonations?.donations &&
			data?.currentUserSitterDonations?.donations
				.filter((donation) => donation.booking.status === 'PAID')
				.reduce((acc, item) => {
					if (acc[item.partnerId]) {
						acc[item.partnerId] = {
							...acc[item.partnerId],
							numberOfDonations: acc[item.partnerId].numberOfDonations + 1,
							amountToDonate: roundToTwoDecimals(
								acc[item.partnerId].amountToDonate +
									(item.donated ? 0 : item.amountToDonate)
							),
							amountDonated: roundToTwoDecimals(
								acc[item.partnerId].amountDonated +
									(item.donated ? item.amountToDonate : 0)
							)
						}
					} else {
						acc[item.partnerId] = {
							...acc[item.partnerId],
							numberOfDonations: 1,
							amountToDonate: item.donated ? 0 : item.amountToDonate,
							amountDonated: item.donated ? item.amountToDonate : 0
						}
					}
					return acc
				}, {})

		return Object.entries(lookup).map((item) => ({
			partner: partnersLookUp[item[0]],
			...item[1]
		}))
	}, [data])

	return (
		<Box as='section' mb={6}>
			<Heading as='h2' size='md' mb={3}>
				{t('donationHeading')}
			</Heading>
			{donations.length === 0 && (
				<Flex width='100%'>
					<Text>{t('noDonationsYet')}</Text>
				</Flex>
			)}
			{donations.length > 0 &&
				donations.map((infos) => (
					<Flex key={infos.partner.id} width='100%' align='strech' justify='flex-start'>
						<Image
							src={infos.partner.logoUrl}
							fallbackSrc={infos.partner.logoUrl}
							width='50px'
							rounded='md'
							mr={3}
						/>
						<Box>
							<Heading size='sm'>{infos.partner.name}</Heading>
							<Flex mt={3} flexDir={{ base: 'column', sm: 'row' }}>
								<Tag
									colorScheme='cyan'
									mr={{ base: 0, sm: 3 }}
									mb={{ base: 1, sm: 0 }}
								>
									{t('donated')} {infos.amountDonated} €
								</Tag>
								<Tag colorScheme='red'>
									{t('toBeDonated')} {infos.amountToDonate} €
								</Tag>
							</Flex>
						</Box>
					</Flex>
				))}
		</Box>
	)
}
