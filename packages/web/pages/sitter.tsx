import dynamic from 'next/dynamic'
import React, { useMemo, useState, useEffect } from 'react'
import LazyLoad from 'react-lazy-load'
import { Intro, Booking, Details, MobileBooking, Reviews } from 'layouts/sitter'
import { HeaderSearchForm } from 'layouts/shared/HeaderForm'
import { Layout, Loader } from 'components'
import { useRouter } from 'next/router'
import { Box, Flex, Divider } from '@chakra-ui/react'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_LANGUAGES } from 'graphql/language/query'
import { getIntervalDays, stringToTyped, listAsOptions, parseUrl, lookUpByItemId } from 'utils'
import { useProfileByIdLazyQuery } from 'generated/graphql'
import { GET_GENDERS } from 'graphql/gender/query'
import { useSearchAndPush } from 'utils/hooks/useSearchAndPush'
import { formatForUrl } from 'utils/dates'
import { GET_PARTNERS } from 'graphql/partners/query'
import { NextSeo } from 'next-seo'
import { GET_SERVICES } from 'graphql/service/query'

const Map = dynamic(
	// @ts-expect-error
	() => import('layouts/sitter').then((mod) => mod.Map),
	{ ssr: false }
)

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES, GET_LANGUAGES, GET_GENDERS, GET_PARTNERS, GET_SERVICES].map(
		async (query) => {
			const { data } = await apolloClient.query({
				query
			})
			return data
		}
	)

	const result = await Promise.all(queries)
	const [{ species }, { languages }, { genders }, { partners }, { services }] = result

	const gendersLookUp = lookUpByItemId(genders.genders)
	const speciesLookUp = lookUpByItemId(species.species)
	const languagesLookUp = lookUpByItemId(languages.languages)
	const partnersLookUp = lookUpByItemId(partners.partners)

	const speciesOptions = listAsOptions(species?.species, locale) || []
	const servicesOptions = listAsOptions(services?.services, locale, 'queryKey') || []
	return {
		props: {
			gendersLookUp,
			languagesLookUp,
			speciesLookUp,
			speciesOptions,
			partnersLookUp,
			servicesOptions
		}
	}
}

export default function SitterProfile({
	gendersLookUp,
	languagesLookUp,
	speciesLookUp,
	speciesOptions,
	partnersLookUp,
	servicesOptions
}) {
	const [firstAvailableResult, setFirstAvailableResult] = useState({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		}
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		id: '',
		service: 'atHomeDay',
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		startDate: Date.now(),
		endDate: Date.now(),
		acceptedAnimalsIds: []
	})
	const { query, push } = useRouter()

	useEffect(() => {
		setState({ ...state, ...parseUrl(query) })
	}, [query])

	const { valid, search } = useSearchAndPush(state, firstAvailableResult)
	const [getProfile, { data, loading }] = useProfileByIdLazyQuery()

	useEffect(() => {
		// @ts-expect-error
		query.id && query.id !== '' && getProfile({ variables: { id: query.id } })
	}, [query])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const selectedDays = useMemo(() => getIntervalDays(state.startDate, state.endDate), [
		state['startDate'],
		state['endDate']
	])

	function handleSubmit() {
		push({
			pathname: '/booking',
			query: {
				id: query.id,
				address: state.address,
				lat: state.location.coordinates[1],
				lng: state.location.coordinates[0],
				startDate: formatForUrl(state.startDate),
				endDate: formatForUrl(state.endDate),
				acceptedAnimalsIds: state.acceptedAnimalsIds,
				service: state.service
			}
		})
	}

	return (
		<Layout
			headerFocusComponent={
				<HeaderSearchForm
					state={state}
					setState={setState}
					errors={errors}
					speciesLookUp={speciesLookUp}
					speciesOptions={speciesOptions}
					showBtn={true}
					handleSearch={() => valid && search()}
					setFirstAvailableResult={setFirstAvailableResult}
				/>
			}
		>
			<Box width='100%' pos='relative'>
				{loading && <Loader />}
				{data?.profileById.profile && (
					<>
						<NextSeo title={`Ohmonpepet | ${data?.profileById.profile.firstName}`} />
						<Intro
							profile={data.profileById.profile}
							languagesLookUp={languagesLookUp}
						/>
						<Flex width='100%' align='stretch' justify='space-between' mb={6}>
							<Details
								profile={data.profileById.profile}
								gendersLookUp={gendersLookUp}
								state={state}
								setState={setState}
								selectedDays={selectedDays}
								partnersLookUp={partnersLookUp}
							/>

							<Booking
								state={state}
								setState={setState}
								selectedDays={selectedDays}
								profile={data.profileById.profile}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
								servicesOptions={servicesOptions}
							/>
						</Flex>
						{data.profileById.profile.reviewsAsSitter.length > 0 && (
							<>
								<Divider my={{ base: 4, sm: 6 }} />
								<Reviews reviews={data.profileById.profile.reviewsAsSitter} />
							</>
						)}
						<LazyLoad offsetVertical={200}>
							<Map
								// @ts-ignore
								profile={data.profileById.profile}
							/>
						</LazyLoad>
					</>
				)}
			</Box>
			{data?.profileById.profile ? (
				<MobileBooking
					state={state}
					setState={setState}
					selectedDays={selectedDays}
					profile={data.profileById.profile}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					servicesOptions={servicesOptions}
				/>
			) : null}
		</Layout>
	)
}
