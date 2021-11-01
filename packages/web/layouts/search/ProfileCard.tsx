import React, { useMemo } from 'react'
import { Flex, Image, Heading, Text, chakra, Tag, Tooltip } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { getDist, capitalizeFirstLetter } from 'utils'
import profileCardJSON from 'statics/search/profileCard.json'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { PetSitterServicesList } from 'layouts/shared/PetSitterServicesList'
import { getValueFromPercentage, roundToTwoDecimals } from 'utils'
import { isMobile } from 'react-device-detect'
import { formatForUrl } from 'utils/dates'

const MotionLink = chakra(motion.a)

export function ProfileCard({
	profile,
	state,
	hostingsLookUp,
	languagesLookUp,
	gendersLookUp,
	requiredDaysNumber,
	setCurrentHoverId,
	partnersLookUp
}) {
	const { t, lang } = useI18n(profileCardJSON)
	const sitterHasPartnerShip = profile.partnerId && profile.partnerPercentage !== 0

	const total =
		state['service'] && state['service'] !== ''
			? profile[state['service']] * requiredDaysNumber
			: profile['atHomeDay'] * requiredDaysNumber

	const amountGivenToPartner = sitterHasPartnerShip
		? roundToTwoDecimals(getValueFromPercentage(profile.partnerPercentage as number, total))
		: 0

	const address = useMemo(
		() =>
			isMobile
				? `${profile.city}, ${profile.postcode}`.substring(0, 18).concat('...')
				: `${profile.city}, ${profile.postcode}`,
		[isMobile]
	)

	return (
		<NextLink
			passHref
			href={{
				pathname: '/sitter',
				query: {
					id: profile.id,
					address: state.address,
					lat: state.location.coordinates[1],
					lng: state.location.coordinates[0],
					startDate: formatForUrl(state.startDate),
					endDate: formatForUrl(state.endDate),
					acceptedAnimalsIds: state.acceptedAnimalsIds,
					service: state.service
				}
			}}
		>
			{/* @ts-ignore */}
			<MotionLink
				display='flex'
				flexDir={{ base: 'column', md: 'row' }}
				alignItems={{ base: 'center', md: 'flex-start' }}
				justifyContent='flex-start'
				my={{ base: 3, md: 1 }}
				py={3}
				width='100%'
				height={{ base: 'auto', md: '230px' }}
				key={profile.id}
				borderTopColor='gray.300'
				borderBottom='1px solid'
				borderBottomColor='gray.300'
				boxSizing='border-box'
				onMouseEnter={() => setCurrentHoverId(profile.id)}
				onMouseLeave={() => setCurrentHoverId('')}
				onFocus={() => setCurrentHoverId(profile.id)}
				onBlur={() => setCurrentHoverId('')}
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
			>
				<Image
					src={profile.pictureUrl}
					fallbackSrc={profile.pictureUrl}
					width={{ base: '100%', md: '200px' }}
					height={{ base: '200px', md: '200px' }}
					borderRadius='10px'
					objectFit='cover'
					mr={{ base: 0, md: 3 }}
					mb={{ base: 2, md: 0 }}
					alt='petsitter profile image'
				/>
				<Flex
					flexDir='column'
					align='flex-start'
					justify={{ base: 'flex-start', md: 'space-between' }}
					width='100%'
					boxSizing='border-box'
					height={{ base: 'auto', md: '200px' }}
				>
					<Flex
						flexDir='column'
						align='flex-start'
						justifyContent='flex-start'
						width='100%'
						boxSizing='border-box'
					>
						<Flex
							width='100%'
							align='center'
							justify='space-between'
							boxSizing='border-box'
						>
							<Text fontSize='14px' color='gray.700'>
								{address}
								<span style={{ fontStyle: 'italic', fontSize: '13px' }}>
									{' '}
									-{' '}
									{getDist(
										{
											lng: state.location.coordinates[0],
											lat: state.location.coordinates[1]
										},
										{
											lng: profile.location.coordinates[0],
											lat: profile.location.coordinates[1]
										}
									)}
								</span>
							</Text>
							{profile.stars && profile.ratings && (
								<Flex fontSize='14px' fontWeight={600}>
									<Image
										src='/img/star.svg'
										fallbackSrc='/img/star.svg'
										width='16px'
										height='16px'
										mr={1}
										alt='ratings stars'
									/>
									{profile.stars}{' '}
									<Text ml={1} fontWeight={400} color='gray.700'>
										({profile.ratings.length})
									</Text>
								</Flex>
							)}
						</Flex>
						<Flex
							width='100%'
							align='center'
							justify='space-between'
							boxSizing='border-box'
						>
							<Flex
								flexDir={{ base: 'column', md: 'row' }}
								align={{ base: 'flex-start', md: 'center' }}
								justify='flex-start'
								my={{ base: 3, md: 0 }}
							>
								<Flex align='center' justify='flex-start'>
									<Heading size='lg' fontWeight='500'>
										{profile.firstName}
									</Heading>
									<Tag colorScheme='blue' ml={3}>
										{hostingsLookUp[profile.hostingId] &&
											capitalizeFirstLetter(
												hostingsLookUp[profile.hostingId].name[lang]
											)}
									</Tag>
								</Flex>

								<Flex align='center' justify='flex-start' mt={{ base: 3, md: 0 }}>
									{profile.languagesIds.map((languageId) => (
										<Image
											key={languageId}
											src={
												languagesLookUp[languageId] &&
												languagesLookUp[languageId].iconUrl
											}
											fallbackSrc={
												languagesLookUp[languageId] &&
												languagesLookUp[languageId].iconUrl
											}
											width='20px'
											height='20px'
											ml={{ base: 0, md: 2 }}
											mr={{ base: 2, md: 0 }}
											alt={`spoken language : ${
												languagesLookUp[languageId] &&
												languagesLookUp[languageId].name[lang]
											}`}
										/>
									))}
									{sitterHasPartnerShip ? (
										<Tooltip
											label={
												<Text>
													{t('giveTo', {
														name: profile.firstName,
														percentage: profile.partnerPercentage
													})}{' '}
													{partnersLookUp[profile.partnerId].name}
												</Text>
											}
										>
											<Image
												src='/img/donation.svg'
												fallbackSrc='/img/donation.svg'
												alt={`${t('giveTo', {
													name: profile.firstName,
													percentage: profile.partnerPercentage
												})} ${partnersLookUp[profile.partnerId].name}`}
												width='20px'
												ml={{ base: 0, md: 3 }}
												tabIndex={0}
											/>
										</Tooltip>
									) : null}
								</Flex>
							</Flex>
						</Flex>
						<Flex
							align='center'
							justify='flex-start'
							width={{ base: '100%', md: '70%' }}
							wrap='wrap'
						>
							<PetSitterServicesList
								petsitter={profile}
								gendersLookUp={gendersLookUp}
							/>
						</Flex>
					</Flex>
					<Flex width='100%' align='flex-end' justify='space-between'>
						{sitterHasPartnerShip ? (
							<Text fontSize='xs' mr={3}>
								{`${amountGivenToPartner} € `}
								{t('givenTo', {
									pluriel: amountGivenToPartner > 1 ? 's' : ''
								})}{' '}
								{partnersLookUp[profile.partnerId].name}{' '}
							</Text>
						) : null}

						<SitterServicePrices
							state={state}
							profile={profile}
							requiredDaysNumber={requiredDaysNumber}
						/>
					</Flex>
				</Flex>
			</MotionLink>
		</NextLink>
	)
}
