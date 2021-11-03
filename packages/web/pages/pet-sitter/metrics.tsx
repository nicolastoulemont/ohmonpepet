import { Layout } from 'components'
import metricsJSON from 'statics/pet-sitter/metrics.json'
import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { lookUpByItemId } from 'utils'
import { initializeApollo } from 'lib'
import { GET_PARTNERS } from 'graphql/partners/query'
import { Heading, Box } from '@chakra-ui/react'
import { Donations } from 'layouts/pet-sitter/metrics/Donations'
import { Bookings } from 'layouts/pet-sitter/metrics/Bookings'
import { GET_SPECIES } from 'graphql/species/query'
import { useProfileByCurrentUserIdQuery } from 'generated/graphql'
import { GET_GENDERS } from 'graphql/gender/query'
import { NextSeo } from 'next-seo'
import { petsitterMetrics } from 'next-seo.config'
export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const queries = [GET_PARTNERS, GET_SPECIES, GET_GENDERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const [{ partners }, { species }, { genders }] = await Promise.all(queries)
	const partnersLookUp = lookUpByItemId(partners?.partners)
	const speciesLookUp = lookUpByItemId(species?.species)
	const gendersLookUp = lookUpByItemId(genders?.genders)

	return {
		props: {
			partnersLookUp,
			speciesLookUp,
			gendersLookUp
		}
	}
}

export default function CurrentUserBookingsAsSitter({
	partnersLookUp,
	speciesLookUp,
	gendersLookUp
}) {
	const { t, lang } = useI18n(metricsJSON)
	useUserOrRedirect()
	const { data } = useProfileByCurrentUserIdQuery()

	return (
		<Layout>
			<NextSeo title={`Ohmonpepet | ${petsitterMetrics[lang]}`} />
			<Box width='100%'>
				<Heading mb={{ base: 3, md: 6 }} textAlign={{ base: 'center', md: 'left' }}>
					{t('title')}
				</Heading>
				{data?.profileByCurrentUserId?.profile && (
					<>
						<Bookings
							speciesLookUp={speciesLookUp}
							gendersLookUp={gendersLookUp}
							profile={data?.profileByCurrentUserId.profile}
						/>
						<Donations partnersLookUp={partnersLookUp} />
					</>
				)}
			</Box>
		</Layout>
	)
}
