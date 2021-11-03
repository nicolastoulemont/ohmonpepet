import dynamic from 'next/dynamic'
import { Layout } from 'components'
import { HeaderSearchForm } from 'layouts/shared/HeaderForm'
import React, { useState, useEffect, useMemo } from 'react'
import { DEFAULT_SEARCH_RADIUS } from 'utils/constants'
import { isMobileOnly } from 'react-device-detect'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_LANGUAGES } from 'graphql/language/query'
import { GET_HOSTINGS } from 'graphql/hosting/query'
import { GET_PARTNERS } from 'graphql/partners/query'
import { GET_GENDERS } from 'graphql/gender/query'
import { GET_SERVICES } from 'graphql/service/query'
import { useSearchProfilesLazyQuery, useProfileByIdLazyQuery } from 'generated/graphql'
import {
	listAsOptions,
	stringToTyped,
	getIntervalDays,
	capitalizeFirstLetter,
	parseUrl,
	lookUpByItemId
} from 'utils'

const DesktopAndTabletUI = dynamic(
	// @ts-expect-error
	() => import('layouts/search/Uis/DesktopAndTabletUI').then((mod) => mod.DesktopAndTabletUI),
	{ ssr: false }
)
const MobileUI = dynamic(
	// @ts-expect-error
	() => import('layouts/search/Uis/MobileUI').then((mod) => mod.MobileUI),
	{ ssr: false }
)

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [
		GET_SPECIES,
		GET_LANGUAGES,
		GET_HOSTINGS,
		GET_GENDERS,
		GET_PARTNERS,
		GET_SERVICES
	].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [
		{ species },
		{ languages },
		{ hostings },
		{ genders },
		{ partners },
		{ services }
	] = result

	const gendersLookUp = lookUpByItemId(genders.genders)
	const hostingsLookUp = lookUpByItemId(hostings.hostings)
	const speciesLookUp = lookUpByItemId(species.species)
	const languagesLookUp = lookUpByItemId(languages.languages)
	const partnersLookUp = lookUpByItemId(partners.partners)

	const speciesOptions = listAsOptions(species?.species, locale) || []
	const languagesOptions = listAsOptions(languages?.languages, locale) || []
	const hostingsOptions = listAsOptions(hostings.hostings, locale) || []
	const servicesOptions = listAsOptions(services.services, locale, 'queryKey') || []

	return {
		props: {
			languagesLookUp,
			hostingsLookUp,
			speciesLookUp,
			gendersLookUp,
			partnersLookUp,
			speciesOptions,
			languagesOptions,
			hostingsOptions,
			servicesOptions
		}
	}
}

export default function Search({
	hostingsLookUp,
	languagesLookUp,
	speciesLookUp,
	gendersLookUp,
	partnersLookUp,
	speciesOptions,
	languagesOptions,
	hostingsOptions,
	servicesOptions
}) {
	const [currentHoverId, setCurrentHoverId] = useState('')
	const { query } = useRouter()
	const { lang } = useI18n(searchJSON)
	const [_, setFirstAvailableResult] = useState({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		}
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		service: 'atHomeDay',
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		startDate: undefined,
		endDate: undefined,
		acceptedAnimalsIds: [],
		maxDistance: DEFAULT_SEARCH_RADIUS
	})

	useEffect(() => {
		setState({ ...state, ...parseUrl(query) })
	}, [query])

	const [searchProfiles, { data, loading }] = useSearchProfilesLazyQuery()
	const [getProfile] = useProfileByIdLazyQuery()

	useEffect(() => {
		const {
			address,
			postcode,
			country_code,
			city,
			country,
			startDate,
			endDate,
			...rest
		} = state
		if (startDate && endDate) {
			searchProfiles({
				variables: {
					fields: {
						startDate,
						endDate,
						...rest
					},
					params: {
						sortKey: 'updatedAt',
						sort: 'descending',
						offset: 0,
						limit: 0
					}
				}
			})
		}
	}, [state])

	useEffect(() => {
		if (currentHoverId !== '') {
			getProfile({ variables: { id: currentHoverId } })
		}
	}, [currentHoverId])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	function handleCheckBoxes(name: string, checked: boolean) {
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: checked })
	}

	const requiredDaysNumber = useMemo(
		() => getIntervalDays(state.startDate, state.endDate).length,
		[state['startDate'], state['endDate']]
	)

	const sittersGeoInfos = useMemo(
		() =>
			data?.searchProfiles.profiles
				? data.searchProfiles.profiles.map((profile) => ({
						...profile,
						id: profile.id,
						latitude: profile.location.coordinates[1],
						longitude: profile.location.coordinates[0],
						name: profile.firstName,
						hosting:
							hostingsLookUp[profile.hostingId] &&
							capitalizeFirstLetter(hostingsLookUp[profile.hostingId].name[lang]),
						price: profile[state['service']]
							? profile[state['service']]
							: profile.atHomeDay
				  }))
				: [],
		[data]
	)

	return (
		<Layout
			maxWidth='none'
			headerFocusComponent={
				<HeaderSearchForm
					state={state}
					setState={setState}
					errors={errors}
					speciesLookUp={speciesLookUp}
					speciesOptions={speciesOptions}
					setFirstAvailableResult={setFirstAvailableResult}
				/>
			}
		>
			{isMobileOnly ? (
				<MobileUI
					// @ts-ignore
					state={state}
					setState={setState}
					sittersGeoInfos={sittersGeoInfos}
					errors={errors}
					languagesOptions={languagesOptions}
					hostingsOptions={hostingsOptions}
					servicesOptions={servicesOptions}
					handleChange={handleChange}
					handleCheckBoxes={handleCheckBoxes}
					data={data}
					loading={loading}
					languagesLookUp={languagesLookUp}
					hostingsLookUp={hostingsLookUp}
					gendersLookUp={gendersLookUp}
					partnersLookUp={partnersLookUp}
					requiredDaysNumber={requiredDaysNumber}
					currentHoverId={currentHoverId}
					setCurrentHoverId={setCurrentHoverId}
				/>
			) : (
				<DesktopAndTabletUI
					// @ts-ignore
					state={state}
					setState={setState}
					sittersGeoInfos={sittersGeoInfos}
					errors={errors}
					languagesOptions={languagesOptions}
					hostingsOptions={hostingsOptions}
					servicesOptions={servicesOptions}
					handleChange={handleChange}
					handleCheckBoxes={handleCheckBoxes}
					data={data}
					loading={loading}
					languagesLookUp={languagesLookUp}
					hostingsLookUp={hostingsLookUp}
					gendersLookUp={gendersLookUp}
					partnersLookUp={partnersLookUp}
					requiredDaysNumber={requiredDaysNumber}
					currentHoverId={currentHoverId}
					setCurrentHoverId={setCurrentHoverId}
				/>
			)}
		</Layout>
	)
}
