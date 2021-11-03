import React, { useEffect, useState, useMemo } from 'react'
import { Layout, Loader } from 'components'
import { useRouter } from 'next/router'
import { Flex, Box, Divider } from '@chakra-ui/react'
import { BookingActions } from 'layouts/booking/BookingActions'
import { BookingInfos } from 'layouts/booking/BookingInfos'
import { parseUrl, stringToTyped, getIntervalDays, lookUpByItemId, listAsOptions } from 'utils'
import { BookingNotConnected } from 'layouts/booking/BookingNotConnected'
import { BookingMobileInfosBottom } from 'layouts/booking/BookingMobileInfosBottom'
import { BookingMobileInfosTop } from 'layouts/booking/BookingMobileInfosTop'
import { BookingConnected } from 'layouts/booking/BookingConnected'
import { initializeApollo } from 'lib'
import { GET_GENDERS } from 'graphql/gender/query'
import { useCurrentUserQuery, useProfileBookingInfosByIdLazyQuery } from 'generated/graphql'
import { NextSeo } from 'next-seo'
import { GET_SERVICES } from 'graphql/service/query'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_GENDERS, GET_SERVICES].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)
	const [{ genders }, { services }] = result

	const gendersLookUp = lookUpByItemId(genders.genders)
	const servicesOptions = listAsOptions(services?.services, locale, 'queryKey') || []

	return {
		props: {
			gendersLookUp,
			servicesOptions
		}
	}
}
export default function BookSitter({ gendersLookUp, servicesOptions }) {
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		id: '',
		service: 'atHomeDay',
		startDate: Date.now(),
		endDate: Date.now(),
		acceptedAnimalsIds: [],
		selectedOptions: []
	})
	const { query } = useRouter()

	useEffect(() => {
		const url = parseUrl(query)
		// @ts-expect-error
		if (url.selectedOptions) {
			// @ts-expect-error
			const { selectedOptions, ...rest } = url
			const options = selectedOptions.reduce((acc, item) => {
				const [name] = item.split('+')
				acc[name] = true
				return acc
			}, {})
			setState({ ...state, ...rest, ...options })
		} else {
			setState({ ...state, ...url })
		}
	}, [query])

	const { data: user } = useCurrentUserQuery()

	const [getProfile, { data: profile, loading }] = useProfileBookingInfosByIdLazyQuery()
	useEffect(() => {
		// @ts-expect-error
		query.id && query?.id !== '' && getProfile({ variables: { id: query.id } })
	}, [query])

	const selectedDays = useMemo(() => getIntervalDays(state.startDate, state.endDate), [
		state['startDate'],
		state['endDate']
	])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	function handleCheckBoxes(name: string, checked: boolean) {
		setState({ ...state, [name]: checked })
	}

	useEffect(() => {
		if (profile?.profileById.profile) {
			const POSSIBLE_AT_HOME_ADDITIONAL_SERVICES = [
				'atHomeContinuously',
				'atHomeExclusivity',
				'atHomeOnlyBringPet',
				'atHomeComeGetPet'
			]
			const POSSIBLE_AT_OWNERHOME_ADDITIONAL_SERVICES = [
				'atOwnerHomeMail',
				'atOwnerHomePlantsCare',
				'atOwnerHomeCurtains'
			]
			if (state.service === 'atHomeDay' || state.service === 'atHomeHour') {
				let selectedServices = []
				POSSIBLE_AT_HOME_ADDITIONAL_SERVICES.forEach((service) => {
					if (state[service]) {
						selectedServices.push({
							name: service,
							price: profile.profileById.profile[`${service}ExtraPrice`]
						})
					}
				})
				if (JSON.stringify(selectedServices) !== JSON.stringify(state.selectedOptions)) {
					setState({ ...state, selectedOptions: selectedServices })
				}
			} else if (state.service === 'atOwnerHomeDay' || state.service === 'atOwnerHomeHour') {
				let selectedServices = []
				POSSIBLE_AT_OWNERHOME_ADDITIONAL_SERVICES.forEach((service) => {
					if (state[service]) {
						selectedServices.push({
							name: service,
							price: profile.profileById.profile[`${service}ExtraPrice`]
						})
					}
				})
				if (JSON.stringify(selectedServices) !== JSON.stringify(state.selectedOptions)) {
					setState({ ...state, selectedOptions: selectedServices })
				}
			}
		}
	}, [state, profile])

	const isLoggedIn = user?.currentUser?.__typename === 'User'

	return (
		<Layout>
			<Flex width='100%' align='flex-start' justify='space-between' boxSizing='border-box'>
				{loading && <Loader />}
				{profile?.profileById.profile && (
					<>
						<NextSeo title={`Ohmonpepet | ${profile?.profileById.profile.firstName}`} />
						<Box width={['100%', '100%', '100%', '60%']}>
							<BookingMobileInfosTop profile={profile.profileById.profile} />
							<BookingActions
								state={state}
								setState={setState}
								profile={profile.profileById.profile}
								handleChange={handleChange}
								handleCheckBoxes={handleCheckBoxes}
								errors={errors}
								gendersLookUp={gendersLookUp}
								servicesOptions={servicesOptions}
							/>
							<Divider my={6} />
							<BookingMobileInfosBottom
								state={state}
								profile={profile.profileById.profile}
								selectedDays={selectedDays}
							/>
							{isLoggedIn ? (
								<BookingConnected
									state={state}
									profile={profile.profileById.profile}
									handleChange={handleChange}
								/>
							) : (
								<BookingNotConnected id={query.id} state={state} />
							)}
							<Divider my={6} />
						</Box>
						<BookingInfos
							state={state}
							profile={profile.profileById.profile}
							selectedDays={selectedDays}
						/>
					</>
				)}
			</Flex>
		</Layout>
	)
}
