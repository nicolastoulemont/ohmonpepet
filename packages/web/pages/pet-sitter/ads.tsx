import {
	getIntervalFormattedDays,
	stringToTyped,
	removeTypename,
	lookUpByItemId,
	listAsOptions
} from 'utils'
import dynamic from 'next/dynamic'
import { Layout, Loader } from 'components'
import React, { useState, useEffect, useMemo } from 'react'
import { DEFAULT_SEARCH_RADIUS } from 'utils/constants'
import { isMobile } from 'react-device-detect'
import { useI18n } from 'utils/hooks/useI18n'
import searchAdsJSON from 'statics/searchAds.json'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { bgColor, shadow } from 'theme/colors'
import { useDimensions } from 'utils/hooks'
import { FiMap, FiX } from 'react-icons/fi'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_SERVICES } from 'graphql/service/query'
import { keyValidation } from 'utils/keyboard'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { SEARCH_ADS } from 'graphql/ad/query'
import { tagsColorScheme } from 'utils/misc'
import { NextSeo } from 'next-seo'
import { petsitterAds } from 'next-seo.config'
import {
	useBidForAdMutation,
	useCurrentUserSitterInfosQuery,
	useSearchAdsLazyQuery
} from 'generated/graphql'
import {
	Flex,
	Box,
	Heading,
	Text,
	FormControl,
	FormLabel,
	useColorMode,
	Icon,
	useToast,
	Select,
	Tag,
	Button,
	chakra
} from '@chakra-ui/react'

const SearchMap = dynamic(
	// @ts-expect-error
	() => import('layouts/shared/SearchMap').then((mod) => mod.SearchMap),
	{ ssr: false }
)

const MotionBox = chakra(motion.div)

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES, GET_SERVICES].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [{ species }, { services }] = result

	const speciesLookUp = lookUpByItemId(species.species)
	const servicesOptions =
		listAsOptions(services?.services, locale, 'queryKey', 'alternateName') || []

	return {
		props: {
			speciesLookUp,
			servicesOptions
		}
	}
}

export default function SearchAds({ speciesLookUp, servicesOptions }) {
	const [showSmallScreenMap, setShowSmallScreenMap] = useState(undefined)
	const [currentHoverId, setCurrentHoverId] = useState('')
	useUserOrRedirect()
	const { data: sitterInfos } = useCurrentUserSitterInfosQuery()
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		service: 'atHomeDay',
		location: {
			type: 'Point',
			coordinates: []
		},
		acceptedAnimalsIds: [],
		ownAnimalsIds: [],
		maxDistance: DEFAULT_SEARCH_RADIUS
	})
	const { t, lang } = useI18n(searchAdsJSON)
	const { colorMode } = useColorMode()
	const [width] = useDimensions()
	const { back } = useRouter()
	const [searchAds, { data, loading }] = useSearchAdsLazyQuery()
	const [bidForAd, { loading: bidLoading }] = useBidForAdMutation()
	const toast = useToast()

	useEffect(() => {
		if (sitterInfos?.profileByCurrentUserId.profile) {
			setState({ ...state, ...removeTypename(sitterInfos?.profileByCurrentUserId.profile) })
		}
	}, [sitterInfos])

	useEffect(() => {
		const { availability, ...rest } = state
		if (state.location && state.location.coordinates.length > 0) {
			searchAds({
				variables: {
					fields: {
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
		if (width && width > 992 && showSmallScreenMap) {
			setShowSmallScreenMap(false)
		}
	}, [width])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const filteredAdsWithAvailability = useMemo(
		() =>
			data?.searchAds.ads && sitterInfos?.profileByCurrentUserId.profile
				? data.searchAds.ads.filter((ad) =>
						getIntervalFormattedDays(
							new Date(ad.startDate),
							new Date(ad.endDate)
						).every((day) =>
							sitterInfos.profileByCurrentUserId.profile.availability.includes(day)
						)
				  )
				: [],
		[data, sitterInfos]
	)

	const adsGeoInfos = useMemo(
		() =>
			filteredAdsWithAvailability
				? filteredAdsWithAvailability.map((ad) => ({
						id: ad.id,
						latitude: ad.location.coordinates[1],
						longitude: ad.location.coordinates[0],
						start: format(new Date(ad.startDate), 'dd/MM'),
						end: format(new Date(ad.endDate), 'dd/MM'),
						speciesNames: ad.animalsSpeciesId.map(
							(specie) => speciesLookUp[specie].name[lang]
						)
				  }))
				: [],
		[filteredAdsWithAvailability, lang]
	)

	// Only made the sitter services available for chosing
	const currentUserSitterServices = useMemo(
		() =>
			sitterInfos?.profileByCurrentUserId?.profile
				? servicesOptions.filter(
						(option) =>
							typeof sitterInfos.profileByCurrentUserId.profile[option.value] ===
							'number'
				  )
				: [],
		[sitterInfos, servicesOptions]
	)

	async function sendBidForAd(adId) {
		const { availability, ...rest } = state
		const { data } = await bidForAd({
			variables: { id: adId },
			refetchQueries: [
				{
					query: SEARCH_ADS,
					variables: {
						fields: {
							...rest
						},
						params: {
							sortKey: 'updatedAt',
							sort: 'descending',
							offset: 0,
							limit: 0
						}
					}
				}
			]
		})
		if (data?.bidForAd.success) {
			toast({
				position: 'top',
				title: t('bidSentTitle'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		}
	}

	return (
		<Layout maxWidth='none'>
			<NextSeo title={`Ohmonpepet | ${petsitterAds[lang]}`} />

			{showSmallScreenMap && (
				<Box
					zIndex={99}
					width='100%'
					height='calc(100vh - 65px)'
					pos='absolute'
					top='60px'
					left={0}
					boxSizing='border-box'
				>
					<Box width='100%' height='100%' pos='relative'>
						<Icon
							as={FiX}
							width='50px'
							height='50px'
							p={3}
							backgroundColor={bgColor['dark']}
							color='white'
							boxShadow={shadow[colorMode]}
							borderRadius='50%'
							pos='absolute'
							bottom='30px'
							left='30px'
							zIndex={100}
							fontSize='10px'
							role='button'
							onClick={() => setShowSmallScreenMap(false)}
							onKeyDown={(event) =>
								keyValidation(event) && setShowSmallScreenMap(false)
							}
						/>
						<SearchMap
							//@ts-expect-error
							coordinates={state.location.coordinates}
							searchItems={adsGeoInfos}
							state={state}
							setState={setState}
							heightParam='60'
							currentHoverId={currentHoverId}
							setCurrentHoverId={setCurrentHoverId}
							fullScreen={true}
						/>
					</Box>
				</Box>
			)}
			<Flex align='flex-start' justify='space-between' height={['auto', '100%']} width='100%'>
				<Box
					width={['100%', '100%', '100%', '50%']}
					minWidth={['none', 'none', 'none', '650px']}
					maxWidth={['none', 'none', 'none', '800px']}
					boxSizing='border-box'
					height={['auto', '100%', '100%', `calc(100vh - 98px)`]}
					overflowY='scroll'
				>
					<Box width='100%' py={[0, 0, 3]} pr={[0, 0, 6]} boxSizing='border-box'>
						<Flex align='center' justify='flex-start' mb={[4, 4, 6]}>
							<Button size='sm' onClick={back}>
								{t('goBack')}
							</Button>
							<Heading size='md' ml={2}>
								{t('searchHeader')}
							</Heading>
						</Flex>

						<Flex
							width='100%'
							flexDir={['column', 'column', 'row']}
							align={['flex-start', 'flex-start', 'center']}
							justify={['center', 'center', 'flex-start']}
							mb={[4, 4, 6]}
						>
							<FormControl width={{ base: '100%', md: '50%' }}>
								<FormLabel htmlFor='service'>{t('serviceType')}</FormLabel>
								<Select
									id='service'
									name='service'
									value={state['service'] || ''}
									aria-describedby='service'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['service']}
									placeholder={t('servicePlaceholder')}
								>
									{currentUserSitterServices.map((service) => (
										<option key={service.key} value={service.value}>
											{service.text}
										</option>
									))}
								</Select>
							</FormControl>
						</Flex>
					</Box>

					<Flex width='100%' flexDir='column' pr={[0, 0, 0, 6]} flex='1'>
						{loading && <Loader />}
						{!loading && data && filteredAdsWithAvailability.length === 0 && (
							<Heading size='sm' textAlign='center' mt={6}>
								{t('noAdsHere')}
							</Heading>
						)}
						{filteredAdsWithAvailability.length > 0 &&
							filteredAdsWithAvailability.map((ad, index) => (
								<MotionBox
									width='100%'
									my={2}
									p={3}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									borderTop={index === 0 && width >= 480 ? '1px solid' : ''}
									borderTopColor='gray.300'
									borderBottom='1px solid'
									borderBottomColor='gray.300'
									onMouseEnter={() => setCurrentHoverId(ad.id)}
									onMouseLeave={() => setCurrentHoverId('')}
									onFocus={() => setCurrentHoverId(ad.id)}
									onBlur={() => setCurrentHoverId('')}
								>
									<Flex
										width='100%'
										align='center'
										justify='space-between'
										mb={2}
									>
										<Heading size='sm'>
											{/* @ts-ignore */}
											{t(`${ad.service}-card`)}
										</Heading>
										<Flex align='center' justify='flex-end'>
											{ad.animalsSpeciesId.map((specieId, index) => (
												<Tag
													colorScheme={tagsColorScheme[index]}
													key={`tag-${specieId}`}
													ml={2}
												>
													{speciesLookUp[specieId].name[lang]}
												</Tag>
											))}
										</Flex>
									</Flex>
									<Text>
										{t('dates')}
										{format(new Date(ad.startDate), 'd LLL', {
											locale: lang === 'fr' ? fr : enUS
										})}
										{' - '}
										{format(new Date(ad.endDate), 'd LLL', {
											locale: lang === 'fr' ? fr : enUS
										})}
									</Text>
									<Flex width='100%' align='flex-end' justify='space-between'>
										<Text fontSize='sm' fontStyle='italic'>
											{t('publishedThe')}
											{format(new Date(ad.updatedAt), 'MM/dd/yyyy')}
										</Text>
										<Button
											size='sm'
											colorScheme={currentHoverId === ad.id ? 'red' : 'gray'}
											onClick={() => sendBidForAd(ad.id)}
											isLoading={bidLoading}
										>
											{t('bidForAd')}
										</Button>
									</Flex>
								</MotionBox>
							))}
					</Flex>
				</Box>

				<Flex
					display={['none', 'none', 'none', 'flex']}
					flex='1'
					maxWidth='calc(100% - 650px)'
					height='100%'
					borderRadius='4px'
					boxSizing='border-box'
					pos='relative'
					zIndex={1}
				>
					{(!width || width > 991) && !isMobile && (
						// Add width condition to prevent map loading when on mobile
						<SearchMap
							//@ts-expect-error
							coordinates={state.location.coordinates}
							searchItems={adsGeoInfos}
							state={state}
							setState={setState}
							currentHoverId={currentHoverId}
							setCurrentHoverId={setCurrentHoverId}
						/>
					)}
				</Flex>
				<Flex
					display={['flex', 'flex', 'flex', 'none']}
					pos='fixed'
					bottom='15px'
					left='calc(50% - 50px)'
					width='100px'
					zIndex={3}
					align='center'
					justify='center'
					borderRadius='20px'
					py={2}
					px={4}
					role='button'
					tabIndex={0}
					backgroundColor={bgColor['dark']}
					color='white'
					boxShadow={shadow[colorMode]}
					onClick={() => setShowSmallScreenMap(true)}
					onKeyDown={(event) => keyValidation(event) && setShowSmallScreenMap(true)}
				>
					<Box as={FiMap} mr={2} />
					{t('map')}
				</Flex>
			</Flex>
		</Layout>
	)
}
