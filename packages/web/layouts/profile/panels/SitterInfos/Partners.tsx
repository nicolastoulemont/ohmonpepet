import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import NextLink from 'next/link'
import {
	Box,
	Flex,
	FormControl,
	Heading,
	Text,
	FormLabel,
	Select,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Image,
	Link
} from '@chakra-ui/react'
export default function Partners({
	state,
	setState,
	handleChange,
	partnersOptions,
	partnersLookUp,
	errors
}) {
	const { t } = useI18n(profileJson)

	function handleSliderChange(value: number) {
		if (value !== state['partnerPercentage']) {
			setState((state) => ({ ...state, partnerPercentage: value }))
		}
	}

	return (
		<>
			<Heading size='md' mb={6}>
				{t('partnerContributionTitle')}
			</Heading>
			<Box mb={[6, 6, 6, 12]}>
				<Text mb={2}>{t('partnerContributionExplanationOne')}</Text>
				<Text mb={2}>{t('partnerContributionExplanationTwo')}</Text>
				<Flex
					width='100%'
					justify='flex-start'
					alignItems='flex-start'
					mb={{ base: 6, lg: 0 }}
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
								defaultValue={state['partnerPercentage'] || 0}
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
						my={6}
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
							<Flex width='100%' align='center' justify='space-between'>
								<Link
									isExternal
									href={partnersLookUp[state.partnerId].websiteUrl}
									color='blue.500'
									fontWeight={600}
								>
									{partnersLookUp[state.partnerId].websiteUrl}
								</Link>
								<NextLink href={`/partner/${state.partnerId}`} passHref>
									<Link fontStyle='italic' color='gray.500' fontSize={14}>
										{t('seePartnerPage')}
									</Link>
								</NextLink>
							</Flex>
						</Box>
					</Flex>
				) : null}
			</Box>
		</>
	)
}
