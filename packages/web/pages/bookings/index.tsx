import { Layout, RangeInputPolyvalent } from 'components'
import profileBookingListJSON from 'statics/profileBookingList.json'
import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import { Booking } from 'layouts/shared/Booking'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import NextLink from 'next/link'
import { useCurrentUserOwnerBookingsQuery } from 'generated/graphql'
import { useSortByOptions } from 'utils/hooks/useSortByOptions'
import { listAsOptions, lookUpByItemId, stringToTyped } from 'utils'
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import { initializeApollo } from 'lib'
import { GET_PARTNERS } from 'graphql/partners/query'
import { NextSeo } from 'next-seo'
import { bookingList } from 'next-seo.config'
import { useOwnerStore } from 'lib/stores/search'

import {
	Heading,
	Box,
	Flex,
	Link,
	FormControl,
	FormLabel,
	Select,
	IconButton,
	theme,
	Button,
	Text,
	Grid
} from '@chakra-ui/react'
import { GET_SERVICES } from 'graphql/service/query'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_PARTNERS, GET_SERVICES].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const [{ partners }, { services }] = await Promise.all(queries)
	const partnersLookUp = lookUpByItemId(partners?.partners)
	const servicesOptions = listAsOptions(services?.services, locale, 'queryKey') || []

	return {
		props: {
			partnersLookUp,
			servicesOptions
		}
	}
}

export default function CurrentUserBookings({ partnersLookUp, servicesOptions }) {
	const { t, lang } = useI18n(profileBookingListJSON)
	const { user } = useUserOrRedirect()
	const {
		includeFinished,
		sortKey,
		sortValue,
		startDate,
		endDate,
		filterByService,
		fns
	} = useOwnerStore()

	const { data: owner } = useCurrentUserOwnerBookingsQuery({
		variables: { includeFinished, sortKey, sortValue, startDate, endDate, filterByService }
	})
	const sortByOptions = useSortByOptions()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		if (name === 'sortKey') fns.changeSortKey(value as string)
		if (name === 'filterByService') fns.changefilterByService(value as string)
	}

	function setRange({ startDate, endDate }) {
		fns.changeRange({
			startDate: startDate ? new Date(startDate).getTime() : undefined,
			endDate: endDate ? new Date(endDate).getTime() : undefined
		})
	}

	return (
		<Layout>
			<NextSeo title={`Ohmonpepet | ${bookingList[lang]}`} />
			<Box width='100%'>
				<Flex
					align='center'
					justify={{ base: 'center', sm: 'space-between' }}
					my={{ base: 0, md: 6 }}
					width='100%'
					flexDir={{ base: 'column', sm: 'row' }}
				>
					<Heading>{t('pageTitle')}</Heading>
				</Flex>
				<Flex
					width='100%'
					align={{ base: 'flex-start', lg: 'flex-end' }}
					mb={6}
					flexDir={{ base: 'column', lg: 'row' }}
				>
					<Flex
						align={{ base: 'flex-start', md: 'flex-end' }}
						mb={{ base: 3, lg: 0 }}
						flexDir={{ base: 'column', md: 'row' }}
						width={{ base: '100%', md: 'auto' }}
					>
						<FormControl
							mr={{ base: 0, md: 2 }}
							mb={{ base: 3, md: 0 }}
							width={{ base: '100%', md: '300px' }}
						>
							<FormLabel>{t('serviceType')}</FormLabel>
							<Select
								id='filterByService'
								name='filterByService'
								value={filterByService || ''}
								aria-describedby='filterByService'
								variant='outline'
								onChange={handleChange}
								isInvalid={false}
								placeholder={t('servicePlaceholder')}
							>
								{servicesOptions.map((service) => (
									<option key={service.key} value={service.value}>
										{service.text}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl mx={{ base: 0, md: 2 }} width={{ base: '100%', md: '220px' }}>
							<FormLabel>{t('sortKey')}</FormLabel>
							<Select
								id='sortKey'
								name='sortKey'
								value={sortKey || ''}
								aria-describedby='sortKey'
								variant='outline'
								onChange={handleChange}
								isInvalid={false}
								placeholder={t('sortKeyPlaceholder')}
							>
								{sortByOptions.map((option) => (
									<option key={option.key} value={option.value}>
										{option.text}
									</option>
								))}
							</Select>
						</FormControl>
						<RangeInputPolyvalent
							state={{
								startDate,
								endDate
							}}
							setState={setRange}
							errors={{}}
							label={t('datesFieldLabel')}
							placeholder={t('datesFieldPlaceholder')}
							showClearBtn={true}
							styles={{
								mt: { base: 3, md: 0 },
								ml: { base: 0, md: 4 },
								width: { base: '100%', sm: '200px' }
							}}
						/>
					</Flex>

					<Flex align='flex-end'>
						<IconButton
							aria-label='Sort descending'
							icon={<FaSortAmountDown />}
							ml={{ base: 0, lg: 2 }}
							mr={1}
							bgColor={fns.showDescending() ? theme.colors.green['600'] : 'white'}
							color={fns.showDescending() ? 'white' : theme.colors.gray['800']}
							_hover={{
								bgColor: fns.showDescending()
									? theme.colors.green['500']
									: theme.colors.green['100']
							}}
							onClick={() => fns.changeSortValue('descending')}
						/>
						<IconButton
							aria-label='Sort ascending'
							icon={<FaSortAmountUp />}
							ml={1}
							mr={{ base: 1, lg: 2 }}
							bgColor={fns.showAscending() ? theme.colors.green['600'] : 'white'}
							color={fns.showAscending() ? 'white' : theme.colors.gray['800']}
							_hover={{
								bgColor: fns.showAscending()
									? theme.colors.green['500']
									: theme.colors.green['100']
							}}
							onClick={() => fns.changeSortValue('ascending')}
						/>
						<Button
							size='sm'
							bgColor='white'
							mb={1}
							_hover={{
								bgColor: !includeFinished
									? theme.colors.green['100']
									: theme.colors.red['100']
							}}
							onClick={() => fns.changeIncluded()}
							display={{ base: 'none', sm: 'block' }}
						>
							<Text>
								{includeFinished ? t('excludeFinished') : t('includeFinished')}
							</Text>
						</Button>
					</Flex>
					<Button
						size='sm'
						bgColor='white'
						mb={1}
						_hover={{
							bgColor: !includeFinished
								? theme.colors.green['100']
								: theme.colors.red['100']
						}}
						onClick={() => fns.changeIncluded()}
						display={{ base: 'block', sm: 'none' }}
					>
						<Text>{includeFinished ? t('excludeFinished') : t('includeFinished')}</Text>
					</Button>
				</Flex>
				{owner?.currentUserOwnerBookings?.bookings?.length === 0 && (
					<Flex width='100%' align='center' justify='center' flexDirection='column'>
						<Heading as='h2' size='md' textAlign='center'>
							{t('noBookingsOwnerTitle')}
						</Heading>
						<NextLink href='/' passHref>
							<Link
								mt={2}
								color='blue.400'
								fontWeight={600}
								textDecoration='underline'
								textAlign='center'
							>
								{t('noBookingsOwnerSubTitle')}
							</Link>
						</NextLink>
					</Flex>
				)}
				<Grid
					templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
					gap={6}
					mt={3}
				>
					{user?.currentUser?.__typename === 'User' &&
						owner?.currentUserOwnerBookings?.bookings?.map((booking) => (
							<Booking
								booking={booking}
								key={booking.id}
								user={user.currentUser}
								viewer='owner'
								partnersLookUp={partnersLookUp}
							/>
						))}
				</Grid>
			</Box>
		</Layout>
	)
}
