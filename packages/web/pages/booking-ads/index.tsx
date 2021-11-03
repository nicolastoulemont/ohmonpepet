import { Heading, Text, chakra, Link, Flex, Tag, useToast, Grid } from '@chakra-ui/react'
import { Layout, Loader } from 'components'
import React, { useEffect } from 'react'
import bookingAdsJSON from 'statics/bookingAds.json'
import { useI18n } from 'utils/hooks/useI18n'
import { NoAdsYet } from 'layouts/booking-ads'
import NextLink from 'next/link'
import { useCurrentUserAdsQuery } from 'generated/graphql'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import { useRouter } from 'next/router'
import { tagsColorScheme } from 'utils/misc'
import { lookUpByItemId } from 'utils'

const MotionLink = chakra(motion.a)

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	const {
		data: { species }
	} = await apolloClient.query({
		query: GET_SPECIES
	})
	const speciesLookUp = lookUpByItemId(species.species)

	return {
		props: {
			speciesLookUp
		}
	}
}

export default function BookingAds({ speciesLookUp }) {
	const { t, lang } = useI18n(bookingAdsJSON)
	const toast = useToast()
	const { query, replace } = useRouter()
	useUserOrRedirect()

	useEffect(() => {
		if (query.deletedAd === 'true') {
			toast({
				position: 'top',
				title: t('adDeleteSuccessTitle'),
				description: t('adDeleteSuccessDescription'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
			replace('/booking-ads')
		}
	}, [query])

	const { data, loading } = useCurrentUserAdsQuery()

	return (
		<Layout>
			<Heading mb={[3, 6]}>{t('title')}</Heading>
			<Text mb={[3, 6]}>{t('subTitle')}</Text>
			<Flex
				width='100%'
				align='center'
				justify='space-between'
				flexDir={{ base: 'column', md: 'row' }}
				mb={{ base: 3, md: 0 }}
			>
				<Heading my={[3, 6]}>{t('bookingAdListTitle')}</Heading>
				<NextLink href='/booking-ads/create' passHref>
					<Link
						backgroundColor='red.500'
						color='white'
						px={4}
						py={2}
						borderRadius='4px'
						fontWeight={600}
					>
						{t('createBookingAdTitle')}
					</Link>
				</NextLink>
			</Flex>
			{loading && <Loader />}
			{data?.currentUserAds?.ads?.length === 0 && <NoAdsYet />}
			{data?.currentUserAds?.ads?.length > 0 && (
				<Grid
					templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
					gap={6}
					mt={3}
				>
					{data.currentUserAds.ads.map((ad) => (
						<NextLink key={ad.id} href={`/booking-ads/${ad.id}`} passHref>
							<MotionLink
								p={3}
								borderRadius='10px'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
								transition='box-shadow 0.3s ease-in-out'
								_hover={{
									boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px'
								}}
							>
								<Flex width='100%' align='center' justify='space-between' mb={2}>
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

								<Text fontSize='sm' fontStyle='italic'>
									{t('publishedThe')}
									{format(new Date(ad.updatedAt), 'MM/dd/yyyy')}
								</Text>
							</MotionLink>
						</NextLink>
					))}
				</Grid>
			)}
		</Layout>
	)
}
