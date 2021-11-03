import { Layout, MultiSelect, RangeInputPolyvalent, AddressInputPolyvalent } from 'components'
import React, { useEffect, useMemo, useState } from 'react'
import bookingAdsJSON from 'statics/bookingAds.json'
import { useI18n } from 'utils/hooks/useI18n'
import { handleErrors } from 'utils/errors'
import NextLink from 'next/link'
import { listAsOptions, removeTypename, stringToTyped } from 'utils'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_SERVICES } from 'graphql/service/query'
import { GET_CURRENT_USER_ADS } from 'graphql/ad/query'
import { useRouter } from 'next/router'
import { useUserOrRedirect } from 'utils/hooks/useUser'
import {
	ChangeAdInput,
	useAdByIdLazyQuery,
	useChangeAdMutation,
	useDeleteAdMutation
} from 'generated/graphql'
import {
	Heading,
	Text,
	Link,
	Flex,
	FormControl,
	FormLabel,
	Textarea,
	Select,
	Button,
	Alert,
	AlertIcon,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Box
} from '@chakra-ui/react'

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

	const speciesOptions = listAsOptions(species?.species, locale) || []
	const servicesOptions = listAsOptions(services?.services, locale, 'queryKey') || []

	return {
		props: {
			speciesOptions,
			servicesOptions
		}
	}
}
const initialState = {
	animalsSpeciesId: [],
	service: 'atHomeDay',
	startDate: '',
	endDate: '',
	address: '',
	location: {
		type: 'Point',
		coordinates: []
	}
}

export default function ChangeBookingAd({ speciesOptions, servicesOptions }) {
	const [showSuccess, setShowSuccess] = useState(false)
	const [state, setState] = useState<ChangeAdInput>(initialState)
	const [errors, setErrors] = useState({})
	const { t, lang } = useI18n(bookingAdsJSON)
	const { query, push } = useRouter()
	useUserOrRedirect()

	const [getAd, { data }] = useAdByIdLazyQuery()

	useEffect(() => {
		// @ts-ignore
		query.id && getAd({ variables: { id: query.id } })
	}, [query])

	useEffect(() => {
		if (data?.adById.ad) {
			const { id, ...rest } = removeTypename(data.adById.ad)
			// @ts-ignore
			setState(rest)
		}
	}, [data])

	const [deleteAd, { loading: delLoading }] = useDeleteAdMutation({
		variables: {
			// @ts-expect-error
			id: query.id
		},
		refetchQueries: [{ query: GET_CURRENT_USER_ADS }]
	})

	const [changeAd, { loading }] = useChangeAdMutation({
		variables: {
			// @ts-expect-error
			id: query.id,
			input: state
		},
		refetchQueries: [{ query: GET_CURRENT_USER_ADS }]
	})

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)

		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const serviceOrDefault = useMemo(
		() => (state['service'] && state['service'] !== '' ? state['service'] : 'atHomeDay'),
		[state['service']]
	)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await changeAd()
		if (data?.changeAd.errors) {
			// @ts-expect-error
			handleErrors(data.createAd.errors, setErrors)
		} else if (data?.changeAd.ad) {
			setShowSuccess(true)
		}
	}

	async function delAd() {
		const { data } = await deleteAd()
		if (data?.deleteAd.success) {
			push({ pathname: '/booking-ads', query: { deletedAd: true } })
		}
	}

	function handleSliderChange(value: number) {
		if (value !== state['maxPrice']) {
			setState((state) => ({ ...state, maxPrice: value }))
		}
	}

	return (
		<Layout>
			<NextLink href='/booking-ads' passHref>
				<Link backgroundColor='gray.100' px={4} py={2} borderRadius='4px' fontWeight={600}>
					{t('goBackToAdsList')}
				</Link>
			</NextLink>
			<Flex width='100%' align='center' justify='space-between'>
				<Heading my={[3, 6]}>{t('changeBookingAdTitle')}</Heading>
				<Button onClick={delAd} isLoading={delLoading}>
					{t('deleteAd')}
				</Button>
			</Flex>
			<Box width='100%' as='form' onSubmit={handleSubmit}>
				<Flex
					width='100%'
					align={{ base: 'flex-start', lg: 'flex-start' }}
					justify={{ base: 'center', lg: 'flex-start' }}
					flexDir={{ base: 'column', lg: 'row' }}
					mb={6}
				>
					<Flex
						align={{ base: 'flex-start', md: 'flex-start' }}
						justify={{ base: 'center', md: 'flex-start' }}
						flexDir={{ base: 'column', md: 'row' }}
						width={{ base: '100%', lg: '50%' }}
						mb={{ base: 6, lg: 0 }}
					>
						<FormControl
							mr={{ base: 0, md: 3 }}
							width={{ base: '100%', md: '50%', lg: '250px' }}
							isRequired
						>
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
								{servicesOptions.map((service) => (
									<option key={service.key} value={service.value}>
										{service.text}
									</option>
								))}
							</Select>
						</FormControl>
						<MultiSelect
							name='animalsSpeciesId'
							placeholder={t('animalsFieldPlaceholder')}
							options={speciesOptions}
							state={state['animalsSpeciesId']}
							setState={setState}
							errors={errors}
							label={t('animalsField')}
							type='text'
							showHelper={false}
							containerWidth='100%'
							styles={{
								ml: { base: 0, md: 3 },
								mt: { base: 3, md: 0 },
								maxWidth: { base: '100%', md: '50%', lg: '250px' }
							}}
							required
						/>
					</Flex>
					<Flex
						align={{ base: 'flex-start', md: 'flex-start' }}
						justify={{ base: 'center', md: 'flex-start' }}
						flexDir={{ base: 'column', md: 'row' }}
						width={{ base: '100%', lg: '50%' }}
					>
						<RangeInputPolyvalent
							state={state}
							setState={setState}
							errors={errors}
							required={true}
							showErrorText={false}
							label={t('datesFieldLabel')}
							placeholder={t('datesFieldPlaceholder')}
							styles={{
								mr: { base: 0, md: 3 },
								my: { base: 3, md: 0 },
								ml: { base: 0, lg: 3 }
							}}
						/>
						<FormControl ml={{ base: 0, md: 3 }} with={{ base: '100%', lg: '50%' }}>
							<FormLabel>
								{
									// @ts-ignore
									t(serviceOrDefault, {
										max: lang === 'fr' ? 'maximum' : 'Maximum'
									})
								}{' '}
								{state['maxPrice'] && `- ${state['maxPrice']} €`}
							</FormLabel>
							<Flex boxSizing='border-box' width='100%' mt={3}>
								<Text mr={4}>0</Text>
								<Slider
									defaultValue={state['maxPrice'] || 0}
									value={state['maxPrice']}
									onChangeEnd={handleSliderChange}
									max={100}
									min={0}
									name='max price'
								>
									<SliderTrack />
									<SliderFilledTrack />
									<SliderThumb />
								</Slider>
								<Text ml={4}>100</Text>
							</Flex>
						</FormControl>
					</Flex>
				</Flex>
				<AddressInputPolyvalent
					parentState={state}
					setParentState={setState}
					setErrors={setErrors}
					address={state['address']}
					location={state['location']}
					label={t('ownAddressLabel')}
					isRequired={true}
					isInvalid={!!errors['coordinates']}
				/>
				<FormControl flex='1' mt={6}>
					<FormLabel htmlFor='additionalInformations'>
						{t('additionalInformationsLabel')}
					</FormLabel>
					<Textarea
						id='additionalInformations'
						name='additionalInformations'
						value={state['additionalInformations'] || ''}
						aria-describedby='additionalInformations'
						placeholder={t('additionalInformationsPlaceholder')}
						variant='outline'
						onChange={handleChange}
						isInvalid={!!errors['additionalInformations']}
						maxLength={2000}
					/>
				</FormControl>
				<Flex
					width='100%'
					align={{ base: 'flex-start', md: 'flex-start' }}
					justify={{ base: 'center', md: 'flex-start' }}
					flexDir={{ base: 'column', md: 'row' }}
					mt={6}
				>
					<Button
						colorScheme='red'
						onClick={handleSubmit}
						isLoading={loading}
						mr={{ base: 0, md: 6 }}
					>
						{t('changeAd')}
					</Button>
					{showSuccess && (
						<Alert
							status='success'
							flexDirection='column'
							alignItems='flex-start'
							borderRadius='0.25rem'
							mt={{ base: 3, md: 0 }}
							width={{ base: '100%', md: '300px' }}
						>
							<Flex width='100%' align='center' justify='flex-start'>
								<AlertIcon />
								<Heading size='sm'>{t('adChangeSuccessTitle')}</Heading>
							</Flex>

							<Text fontSize='14px' textAlign='left'>
								{t('adSuccessMessageTwo')}{' '}
								<NextLink href='/booking-ads' passHref>
									<Link fontWeight={600} textDecoration='underline'>
										{t('adSuccessLink')}
									</Link>
								</NextLink>
							</Text>
						</Alert>
					)}
				</Flex>
			</Box>
		</Layout>
	)
}
