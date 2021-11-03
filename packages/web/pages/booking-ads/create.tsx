import { Layout, MultiSelect, RangeInputPolyvalent, AddressInputPolyvalent } from 'components'
import React, { useState, useMemo } from 'react'
import bookingAdsJSON from 'statics/bookingAds.json'
import { useI18n } from 'utils/hooks/useI18n'
import { handleErrors } from 'utils/errors'
import NextLink from 'next/link'
import { listAsOptions, stringToTyped } from 'utils'
import { initializeApollo } from 'lib'
import { GET_SPECIES } from 'graphql/species/query'
import { GET_SERVICES } from 'graphql/service/query'
import { AdInput, useCreateAdMutation } from 'generated/graphql'
import { GET_CURRENT_USER_ADS } from 'graphql/ad/query'
import { useUserOrRedirect } from 'utils/hooks/useUser'

import {
	Heading,
	Text,
	Link,
	useToast,
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

export default function CreateBookingAd({ speciesOptions, servicesOptions }) {
	const [showSuccess, setShowSuccess] = useState(false)
	const [state, setState] = useState<AdInput>(initialState)
	const [errors, setErrors] = useState({})
	const toast = useToast()
	const { t, lang } = useI18n(bookingAdsJSON)
	useUserOrRedirect()

	const [createAd, { loading }] = useCreateAdMutation({
		variables: {
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

	async function publishAd(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await createAd()

		if (data?.createAd.errors && data.createAd.errors[0].key === 'existingAd') {
			toast({
				position: 'top',
				title: t('adErrorTitle'),
				description: t('adErrorSubTitle'),
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		} else if (data?.createAd.errors) {
			// @ts-expect-error
			handleErrors(data.createAd.errors, setErrors)
		} else if (data?.createAd.ad) {
			setShowSuccess(true)
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
			<Heading my={[3, 6]}>{t('createBookingAdTitle')}</Heading>
			<Text mb={[3, 6]}>{t('subTitle')}</Text>
			<Box width='100%' as='form' onSubmit={publishAd}>
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
						mr={{ base: 0, md: 6 }}
						onClick={publishAd}
						isLoading={loading}
					>
						{t('publishAd')}
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
								<Heading size='sm'>{t('adSuccessTitle')}</Heading>
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
