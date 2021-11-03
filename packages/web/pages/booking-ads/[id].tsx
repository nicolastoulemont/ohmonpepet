import { Flex, Heading, Link, Tag, Text, Box, Image, chakra, Grid } from '@chakra-ui/react'
import { Layout, Loader } from 'components'
import React, { useEffect, useMemo, useState } from 'react'
import bookingAdsJSON from 'statics/bookingAds.json'
import { useI18n } from 'utils/hooks/useI18n'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useAdByIdLazyQuery } from 'generated/graphql'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_HOSTINGS } from 'graphql/hosting/query'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { motion } from 'framer-motion'
import { getDist, capitalizeFirstLetter, getIntervalDays, lookUpByItemId } from 'utils'
import { formatForUrl } from 'utils/dates'
import { tagsColorScheme } from 'utils/misc'
import { GET_GENDERS } from 'graphql/gender/query'
import { PetSitterServicesList } from 'layouts/shared/PetSitterServicesList'

const MotionFlex = chakra(motion.div)

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true // See the "fallback" section below
	}
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES, GET_HOSTINGS, GET_GENDERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [{ species }, { hostings }, { genders }] = result

	const gendersLookUp = lookUpByItemId(genders.genders)
	const hostingsLookUp = lookUpByItemId(hostings.hostings)
	const speciesLookUp = lookUpByItemId(species.species)

	return {
		props: {
			speciesLookUp,
			hostingsLookUp,
			gendersLookUp
		}
	}
}

export default function BookingAd({ speciesLookUp, hostingsLookUp, gendersLookUp }) {
	const { t, lang } = useI18n(bookingAdsJSON)
	const { query } = useRouter()
	useUserOrRedirect()

	const [getAdById, { data, loading }] = useAdByIdLazyQuery({
		variables: { id: query.id as string }
	})

	useEffect(() => {
		if (query.id && query.id !== '') getAdById()
	}, [query])

	return (
		<Layout>
			<Flex align='center' justify='space-between' width='100%'>
				<NextLink href='/booking-ads' passHref>
					<Link
						backgroundColor='gray.100'
						px={4}
						py={1}
						borderRadius='4px'
						fontWeight={600}
					>
						{t('goBackToAdsList')}
					</Link>
				</NextLink>
				<NextLink
					href={{
						pathname: '/booking-ads/edit',
						query: { id: (query.id as string) || '' }
					}}
					passHref
				>
					<Link
						backgroundColor='gray.100'
						px={4}
						py={1}
						borderRadius='4px'
						fontWeight={600}
						display={{ base: 'block', md: 'none' }}
					>
						{t('editBookingLinkShort')}
					</Link>
				</NextLink>
			</Flex>

			<Flex width='100%' align='center' justify='space-between'>
				<Heading my={[3, 6]}>{t('seeBookingTitle')}</Heading>
				<NextLink
					href={{
						pathname: '/booking-ads/edit',
						query: { id: (query.id as string) || '' }
					}}
					passHref
				>
					<Link
						backgroundColor='gray.100'
						px={4}
						py={2}
						borderRadius='4px'
						fontWeight={600}
						display={{ base: 'none', md: 'block' }}
					>
						{t('editBookingLink')}
					</Link>
				</NextLink>
			</Flex>
			{loading && <Loader />}
			{data?.adById?.ad && (
				<>
					<Flex width='100%' align='flex-start' justify='center'>
						<Box
							width={{ base: '95%', md: '80%' }}
							boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
							borderRadius='10px'
							p={3}
						>
							<Flex width='100%' align='center' justify='space-between' mb={2}>
								<Heading size='sm'>
									{/* @ts-ignore */}
									{t(`${data.adById.ad.service}-card`)}
								</Heading>
								<Flex align='center' justify='flex-end'>
									{data.adById.ad.animalsSpeciesId.map((specieId, index) => (
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
								{format(new Date(data.adById.ad.startDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								})}
								{' - '}
								{format(new Date(data.adById.ad.endDate), 'd LLL', {
									locale: lang === 'fr' ? fr : enUS
								})}
							</Text>

							<Text fontSize='sm' fontStyle='italic'>
								{t('publishedThe')}
								{format(new Date(data.adById.ad.updatedAt), 'MM/dd/yyyy')}
							</Text>
						</Box>
					</Flex>
					<Box width='100%' my={[3, 6]}>
						<Heading>{t('bidders')}</Heading>
						{data.adById.ad.bidders.length === 0 && (
							<Text textAlign='center' fontWeight={600} my={2}>
								{t('noBidders')}
							</Text>
						)}
						{data.adById.ad.bidders?.length > 0 && (
							<Grid
								templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
								gap={6}
								mt={3}
							>
								{data.adById.ad.bidders.map((bidder, index) => (
									<Bidder
										key={bidder.id}
										ad={data.adById.ad}
										bidder={bidder}
										hostingsLookUp={hostingsLookUp}
										gendersLookUp={gendersLookUp}
									/>
								))}
							</Grid>
						)}
					</Box>
				</>
			)}
		</Layout>
	)
}

function Bidder({ ad, bidder, hostingsLookUp, gendersLookUp }) {
	const [btnColorScheme, setBtnColorScheme] = useState('gray')
	const { t, lang } = useI18n(bookingAdsJSON)
	const selectedDays = useMemo(() => getIntervalDays(ad.startDate, ad.endDate), [ad])

	const isFemale = useMemo(
		() =>
			gendersLookUp[bidder.genderId] &&
			(gendersLookUp[bidder.genderId].name[lang] === 'madame' ||
				gendersLookUp[bidder.genderId].name[lang] === 'female'),
		[gendersLookUp]
	)

	return (
		<MotionFlex
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			borderRadius='10px'
			p={3}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			transition='box-shadow 0.3s ease-in-out'
			_hover={{
				boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px'
			}}
			display='flex'
			alignItems='flex-start'
			justifyContent='space-between'
			flexDirection={{ base: 'column-reverse', lg: 'row' }}
			onMouseEnter={() => setBtnColorScheme('red')}
			onMouseLeave={() => setBtnColorScheme('gray')}
		>
			<Flex
				width={{ base: '100%', lg: 'auto' }}
				align='flex-start'
				justify='flex-start'
				flexDir='column'
			>
				<Flex width='100%' align='center' justify='flex-start'>
					<Heading>{bidder.firstName}</Heading>
					<Tag colorScheme='blue' ml={3}>
						{capitalizeFirstLetter(hostingsLookUp[bidder.hostingId].name[lang])}
					</Tag>
					{bidder.stars && bidder.ratings && (
						<Flex fontSize='14px' fontWeight={600} ml={3}>
							<Image src='/img/star.svg' width='16px' height='16px' mr={1} />
							{bidder.stars}{' '}
							<Text ml={1} fontWeight={400} color='gray.700'>
								({bidder.ratings.length})
							</Text>
						</Flex>
					)}
				</Flex>
				<Flex width='100%' align='center' justify='flex-start'>
					<Text fontStyle='italic' fontSize='14px' mr={2}>
						{t('distanceFromAdOwner', {
							distance: getDist(
								{
									lng: ad.location.coordinates[0],
									lat: ad.location.coordinates[1]
								},
								{
									lng: bidder.location.coordinates[0],
									lat: bidder.location.coordinates[1]
								}
							)
						})}
					</Text>
					{` - `}
					<Text fontWeight={600} ml={2}>
						{
							// @ts-ignore
							t(`${ad.service}-price`, {
								price: bidder[ad.service]
							})
						}
					</Text>
					<Text fontWeight={400} fontSize='13px' fontStyle='italic' ml={2}>{`${
						bidder[ad.service] * selectedDays.length
					}€ total`}</Text>
				</Flex>

				<Flex
					align='center'
					justify='flex-start'
					mb={3}
					width={{ base: '70%', lg: '100%' }}
					wrap='wrap'
				>
					<PetSitterServicesList petsitter={bidder} gendersLookUp={gendersLookUp} />
				</Flex>

				<Flex width='100%' align='center' justify='flex-end'>
					<NextLink
						href={{
							pathname: '/booking',
							query: {
								id: bidder.id,
								startDate: formatForUrl(ad.startDate),
								endDate: formatForUrl(ad.endDate),
								acceptedAnimalsIds: ad.acceptedAnimalsIds,
								service: ad.service
							}
						}}
						passHref
					>
						<Link
							display={{ base: 'block', lg: 'none' }}
							color={btnColorScheme === 'gray' ? 'black' : 'white'}
							backgroundColor={btnColorScheme === 'gray' ? 'gray.100' : 'red.500'}
							onFocus={() => btnColorScheme === 'gray' && setBtnColorScheme('red')}
							onBlur={() => btnColorScheme === 'red' && setBtnColorScheme('gray')}
							px={3}
							py={1}
							fontWeight={600}
							borderRadius='0.3em'
						>
							{t('choose')}
						</Link>
					</NextLink>
				</Flex>
			</Flex>
			<Flex
				width={{ base: '100%', lg: '100px' }}
				height='100%'
				align={{ base: 'center', lg: 'flex-end' }}
				justify={{ base: 'center', lg: 'space-between' }}
				flexDir='column'
			>
				<Image
					src={bidder.pictureUrl}
					fallbackSrc={bidder.pictureUrl}
					width={{ base: '100%', lg: '100px' }}
					maxHeight={{ base: '200px', sm: '300px', lg: 'none' }}
					borderRadius='10px'
					objectFit='cover'
					mb={3}
				/>
				<NextLink
					href={{
						pathname: '/booking',
						query: {
							id: bidder.id,
							startDate: formatForUrl(ad.startDate),
							endDate: formatForUrl(ad.endDate),
							acceptedAnimalsIds: ad.acceptedAnimalsIds,
							service: ad.service
						}
					}}
					passHref
				>
					<Link
						display={{ base: 'none', lg: 'block' }}
						color={btnColorScheme === 'gray' ? 'black' : 'white'}
						backgroundColor={btnColorScheme === 'gray' ? 'gray.100' : 'red.500'}
						onFocus={() => btnColorScheme === 'gray' && setBtnColorScheme('red')}
						onBlur={() => btnColorScheme === 'red' && setBtnColorScheme('gray')}
						px={3}
						py={1}
						fontWeight={600}
						borderRadius='0.3em'
					>
						{t('choose')}
					</Link>
				</NextLink>
			</Flex>
		</MotionFlex>
	)
}
