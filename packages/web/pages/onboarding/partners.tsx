import { Layout } from 'components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingPartnerJSON from 'statics/onboarding/partner.json'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { listAsOptions, lookUpByItemId, removeTypename, stringToTyped } from 'utils'
import { initializeApollo } from 'lib'
import { GET_PARTNERS } from 'graphql/partners/query'
import {
	useCurrentUserQuery,
	useHandleProfileMutation,
	useProfileByCurrentUserIdQuery
} from 'generated/graphql'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Select,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Image,
	Link,
	Text
} from '@chakra-ui/react'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_PARTNERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const [{ partners }] = await Promise.all(queries)

	const partnersOptions = listAsOptions(partners?.partners, locale) || []
	const partnersLookUp = lookUpByItemId(partners?.partners)

	return {
		props: {
			partnersOptions,
			partnersLookUp
		}
	}
}

export default function OnBoardingPartners({ partnersOptions, partnersLookUp }) {
	const [state, setState] = useState({ partnerId: '', partnerPercentage: 0 })
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const { t } = useI18n(onBoardingPartnerJSON)
	const { data } = useCurrentUserQuery()
	const { data: profile } = useProfileByCurrentUserIdQuery()
	const { push } = useRouter()

	useEffect(() => {
		if (data?.currentUser.__typename === 'UserAuthenticationError') {
			push({
				pathname: '/onboarding',
				query: { panel: 'signin', src: 'onboarding' }
			})
		}
	}, [data])

	useEffect(() => {
		if (profile?.profileByCurrentUserId.profile) {
			setState({ ...state, ...removeTypename(profile?.profileByCurrentUserId.profile) })
		}
	}, [profile])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	function handleSliderChange(value: number) {
		if (value !== state['partnerPercentage']) {
			setState((state) => ({ ...state, partnerPercentage: value }))
		}
	}

	// Clean up errors
	useEffect(() => {
		if (errors['availability']) {
			setErrors({ availability: undefined })
		}
	}, [state])
	const [handleProfile] = useHandleProfileMutation()

	async function saveProfile() {
		const { data } = await handleProfile({
			variables: {
				input: {
					...state
				}
			},
			refetchQueries: [{ query: CURRENT_USER_PROFILE }]
		})
		data.handleProfile.profile && push('/onboarding/complete')
	}

	return (
		<Layout>
			<Box
				width='100%'
				height={['auto', 'auto', 'calc(100vh - 98px)']}
				boxSizing='border-box'
			>
				<Flex width='100%' align='center' justify='flex-start' mb={{ base: 6, lg: 12 }}>
					<NextLink href='/onboarding/hosting' passHref>
						<Button mr={6} size='sm' as={Link}>
							{t('back')}
						</Button>
					</NextLink>
					<Heading as='h1'>{t('title')}</Heading>
				</Flex>
				<Box mb={{ base: 6, lg: 12 }}>
					<Heading mb={2} size='md'>
						{t('partnerContributionTitle')}
					</Heading>
					<Text mb={2}>{t('partnerContributionExplanationOne')}</Text>
					<Text mb={2}>{t('partnerContributionExplanationTwo')}</Text>
					<Flex
						width='100%'
						justify='flex-start'
						alignItems='flex-start'
						my={{ base: 6, lg: 12 }}
						flexDir={{ base: 'column', lg: 'row' }}
					>
						<FormControl width={{ base: '100%', lg: '30%' }} mt={{ base: 6, lg: 0 }}>
							<FormLabel htmlFor='partnerId'>{t('partnerListLabel')}</FormLabel>
							<Select
								id='partnerId'
								name='partnerId'
								value={state['partnerId'] || ''}
								aria-describedby='association partner id'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['partnerId']}
								placeholder={t('partnerListPlaceholder')}
							>
								{partnersOptions.map((partner) => (
									<option key={partner.key} value={partner.value}>
										{partner.text}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl
							width={{ base: '100%', lg: '30%' }}
							ml={{ base: 0, lg: 6 }}
							mt={{ base: 6, lg: 0 }}
						>
							<FormLabel mt={{ base: 0, lg: 1 }} mb={3}>
								{t('partnerPercentageLabel')}{' '}
								{state['partnerPercentage']
									? `- ${state['partnerPercentage']} %`
									: null}
							</FormLabel>
							<Flex boxSizing='border-box' width='100%'>
								<Text mr={4}>0</Text>
								<Slider
									value={state['partnerPercentage']}
									onChangeEnd={handleSliderChange}
									max={100}
									min={0}
									name='percentage'
								>
									<SliderTrack />
									<SliderFilledTrack />
									<SliderThumb />
								</Slider>
								<Text ml={4}>100</Text>
							</Flex>
						</FormControl>
					</Flex>
					{state?.partnerId && state.partnerId !== '' ? (
						<Flex
							width='100%'
							maxW={{ base: '100%', lg: '75%' }}
							flexDir={{ base: 'column', lg: 'row' }}
							alignItems='flex-start'
							justify='flex-start'
							my={{ base: 6, lg: 12 }}
							p={3}
							boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
							borderRadius='10px'
						>
							<Image
								src={partnersLookUp[state.partnerId].logoUrl}
								fallbackSrc={partnersLookUp[state.partnerId].logoUrl}
								width={{ base: '200px', lg: '100px' }}
								mr={{ base: 0, lg: 3 }}
								alignSelf={{ base: 'center', lg: 'unset' }}
							/>
							<Box>
								<Heading size='md' mb={3}>
									{partnersLookUp[state.partnerId].name}
								</Heading>
								<Text mb={3}>{partnersLookUp[state.partnerId].description}</Text>
								<Link
									isExternal
									href={partnersLookUp[state.partnerId].websiteUrl}
									color='blue.500'
									fontWeight={600}
								>
									{partnersLookUp[state.partnerId].websiteUrl}
								</Link>
							</Box>
						</Flex>
					) : null}
				</Box>
				<Flex width='100%' align='center' justify='flex-end' my={6}>
					<Button onClick={saveProfile} colorScheme='red' mr={3}>
						{t('saveProfile')}
					</Button>
					<NextLink href='/onboarding/complete' passHref>
						<Button as='a' variant='ghost'>
							{t('skip')}
						</Button>
					</NextLink>
				</Flex>
			</Box>
		</Layout>
	)
}
