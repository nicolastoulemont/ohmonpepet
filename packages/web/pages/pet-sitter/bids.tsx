import { Layout, Loader } from 'components'
import { useCurrentUserBidsQuery, useRemoveBidForAdMutation } from 'generated/graphql'
import { GET_SPECIES } from 'graphql/species/query'
import { CURRENT_USER_BIDS } from 'graphql/ad/query'
import { initializeApollo } from 'lib'
import React, { useState } from 'react'
import { Button, Flex, Heading, Text, Tag, useToast, chakra, Grid } from '@chakra-ui/react'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { NoBidsYet } from 'layouts/booking-ads'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import bookingAdsJSON from 'statics/bookingAds.json'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { tagsColorScheme } from 'utils/misc'
import { lookUpByItemId } from 'utils'
import { NextSeo } from 'next-seo'
import { petsitterBids } from 'next-seo.config'

const MotionBox = chakra(motion.div)

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const queries = [GET_SPECIES].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [{ species }] = result

	const speciesLookUp = lookUpByItemId(species.species)

	return {
		props: {
			speciesLookUp
		}
	}
}

export default function CurrentUserBids({ speciesLookUp }) {
	const { back } = useRouter()
	const { data, loading } = useCurrentUserBidsQuery()
	const { t, lang } = useI18n(bookingAdsJSON)
	useUserOrRedirect()

	return (
		<Layout>
			<NextSeo title={`Ohmonpepet | ${petsitterBids[lang]}`} />
			<Flex align='center' justify='space-between' mb={[4, 4, 6]}>
				<Heading>{t('bidsPageTitle')}</Heading>
				<Button size='sm' onClick={back}>
					{t('goBackToAdsList')}
				</Button>
			</Flex>
			{loading && <Loader />}
			{data?.currentUserBids?.ads?.length === 0 && <NoBidsYet />}
			{data?.currentUserBids?.ads?.length > 0 && (
				<Grid
					templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
					gap={6}
					mt={3}
				>
					{data.currentUserBids.ads.map((ad) => (
						<Bid key={ad.id} ad={ad} speciesLookUp={speciesLookUp} />
					))}
				</Grid>
			)}
		</Layout>
	)
}

function Bid({ ad, speciesLookUp }) {
	const [btnColorScheme, setBtnColorScheme] = useState('gray')
	const { t, lang } = useI18n(bookingAdsJSON)
	const toast = useToast()

	const [removeBid, { loading }] = useRemoveBidForAdMutation({
		refetchQueries: [{ query: CURRENT_USER_BIDS }]
	})

	async function handleClick() {
		if (!loading) {
			const { data } = await removeBid({ variables: { id: ad.id } })
			if (data?.removeBidForAd.success) {
				toast({
					position: 'top',
					title: t('removeBidSuccess'),
					status: 'success',
					duration: 9000,
					isClosable: true
				})
			}
		}
	}

	return (
		<MotionBox
			key={ad.id}
			p={3}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			transition='box-shadow 0.3s ease-in-out'
			_hover={{
				boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px'
			}}
			borderRadius='10px'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onMouseEnter={() => setBtnColorScheme('red')}
			onMouseLeave={() => setBtnColorScheme('gray')}
		>
			<Flex width='100%' align='center' justify='space-between' mb={2}>
				<Heading size='sm'>
					{/* @ts-ignore */}
					{t(`${ad.service}-card`)}
				</Heading>
				<Flex align='center' justify='flex-end'>
					{ad.animalsSpeciesId.map((specieId, index) => (
						<Tag colorScheme={tagsColorScheme[index]} key={`tag-${specieId}`} ml={2}>
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
			<Flex
				width='100%'
				align={{ base: 'flex-start', sm: 'center' }}
				justify={{ base: 'flex-start', sm: 'space-between' }}
				flexDir={{ base: 'column', sm: 'row' }}
			>
				<Text fontSize='sm' fontStyle='italic' textAlign='left'>
					{t('publishedThe')}
					{format(new Date(ad.updatedAt), 'MM/dd/yyyy')}
				</Text>
				<Button
					mt={{ base: 3, sm: 0 }}
					size='sm'
					alignSelf='flex-end'
					isLoading={loading}
					colorScheme={btnColorScheme}
					onFocus={() => btnColorScheme === 'gray' && setBtnColorScheme('red')}
					onBlur={() => btnColorScheme === 'red' && setBtnColorScheme('gray')}
					onClick={handleClick}
				>
					{t('removeBid')}
				</Button>
			</Flex>
		</MotionBox>
	)
}
