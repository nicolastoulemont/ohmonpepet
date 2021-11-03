import { Layout } from 'components'
import React, { useEffect, useState } from 'react'
import { GeneralInfos } from 'layouts/profile/panels/GeneralInfos'
import { SitterInfos } from 'layouts/profile/panels/SitterInfos'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import { listAsOptions, lookUpByItemId, removeTypename } from 'utils'
import { Link, Flex } from '@chakra-ui/react'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_LANGUAGES } from 'graphql/language/query'
import { GET_GENDERS } from 'graphql/gender/query'
import { GET_HOSTINGS } from 'graphql/hosting/query'
import { useRouter } from 'next/router'
import {
	useProfileByCurrentUserIdQuery,
	useProfilePicturesUrlsByCurrentUserIdQuery
} from 'generated/graphql'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import NextLink from 'next/link'
import { GET_PARTNERS } from 'graphql/partners/query'
import { NextSeo } from 'next-seo'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES, GET_LANGUAGES, GET_HOSTINGS, GET_GENDERS, GET_PARTNERS].map(
		async (query) => {
			const { data } = await apolloClient.query({
				query
			})
			return data
		}
	)

	const [{ species }, { languages }, { hostings }, { genders }, { partners }] = await Promise.all(
		queries
	)

	const speciesOptions = listAsOptions(species?.species, locale) || []
	const languagesOptions = listAsOptions(languages?.languages, locale) || []
	const hostingsOptions = listAsOptions(hostings?.hostings, locale) || []
	const gendersOptions = listAsOptions(genders?.genders, locale) || []
	const partnersOptions = listAsOptions(partners?.partners, locale) || []
	const partnersLookUp = lookUpByItemId(partners?.partners)

	return {
		props: {
			speciesOptions,
			languagesOptions,
			hostingsOptions,
			gendersOptions,
			partnersOptions,
			partnersLookUp
		}
	}
}

export default function CurrentUserProfile({
	speciesOptions,
	languagesOptions,
	hostingsOptions,
	gendersOptions,
	partnersOptions,
	partnersLookUp
}) {
	const [state, setState] = useState<{ [key: string]: any }>({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const { t } = useI18n(profileJson)
	useUserOrRedirect()
	const { query } = useRouter()
	const { data: profile } = useProfileByCurrentUserIdQuery()
	const { data: pics } = useProfilePicturesUrlsByCurrentUserIdQuery()

	useEffect(() => {
		if (profile?.profileByCurrentUserId.profile) {
			setState({ ...state, ...removeTypename(profile?.profileByCurrentUserId.profile) })
		}
	}, [profile])

	return (
		<Layout>
			<NextSeo title='Ohmonpepet | Profile' />
			<Flex width='100%' align='center' justify='flex-start' mb={6}>
				<NextLink href='/profile' passHref>
					<Link
						backgroundColor='gray.100'
						color='black'
						px={4}
						py={1}
						borderRadius='4px'
						fontWeight={600}
					>
						{t('profile')}
					</Link>
				</NextLink>
				{profile?.profileByCurrentUserId.profile?.isPetSitter ? (
					<NextLink href={{ pathname: '/profile', query: { panel: 'sitter' } }} passHref>
						<Link
							ml={6}
							backgroundColor='red.500'
							color='white'
							px={4}
							py={1}
							borderRadius='4px'
							fontWeight={600}
						>
							{t('sitterProfile')}
						</Link>
					</NextLink>
				) : (
					<NextLink href='/onboarding' passHref>
						<Link
							ml={6}
							backgroundColor='blue.500'
							color='white'
							px={4}
							py={1}
							borderRadius='4px'
							fontWeight={600}
						>
							{t('toOnBoarding')}
						</Link>
					</NextLink>
				)}
			</Flex>
			{query?.panel === 'sitter' ? (
				<SitterInfos
					state={state}
					setState={setState}
					errors={errors}
					setErrors={setErrors}
					speciesOptions={speciesOptions}
					hostingsOptions={hostingsOptions}
					partnersOptions={partnersOptions}
					partnersLookUp={partnersLookUp}
				/>
			) : (
				<GeneralInfos
					state={state}
					setState={setState}
					errors={errors}
					setErrors={setErrors}
					languagesOptions={languagesOptions}
					gendersOptions={gendersOptions}
					profilePictures={pics?.profileByCurrentUserId?.profile}
				/>
			)}
		</Layout>
	)
}
