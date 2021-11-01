import React, { useEffect, useMemo } from 'react'
import { Flex, Image, Heading, Text, Tag, Tooltip, Link, Box } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { capitalizeFirstLetter } from 'utils'
import profileCardJSON from 'statics/search/profileCard.json'
import { SitterServicePricesMobileHorizontal } from 'layouts/shared/SitterServicePricesMobileHorizontal'
import NextLink from 'next/link'
import { isMobile } from 'react-device-detect'
import { formatForUrl } from 'utils/dates'
import { shadowMd } from 'theme/colors'
import { useIntersection } from 'react-use'

export function ProfileCardMobileHorizontal({
	profile,
	state,
	hostingsLookUp,
	partnersLookUp,
	currentHoverId,
	setCurrentHoverId,
	preventIntersectionEffect
}) {
	const { t, lang } = useI18n(profileCardJSON)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 1
	})

	const sitterHasPartnerShip = profile.partnerId && profile.partnerPercentage !== 0

	const address = useMemo(
		() =>
			isMobile
				? `${profile.city}, ${profile.postcode}`.substring(0, 18).concat('...')
				: `${profile.city}, ${profile.postcode}`,
		[isMobile]
	)

	useEffect(() => {
		if (
			!preventIntersectionEffect &&
			intersection &&
			intersection.intersectionRatio === 1 &&
			currentHoverId !== profile.id
		) {
			setCurrentHoverId(profile.id)
		}
	}, [intersection, preventIntersectionEffect, profile, currentHoverId])

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
			<Link
				ref={intersectionRef}
				width='100%'
				height='120px'
				borderRadius='25px'
				bg='white'
				boxShadow={shadowMd}
				display='flex'
				alignItems='center'
				justifyContent='flex-start'
			>
				<Image
					src={profile.pictureUrl}
					fallbackSrc={profile.pictureUrl}
					borderTopLeftRadius='25px'
					borderBottomLeftRadius='25px'
					height='100%'
					width='auto'
					objectFit='cover'
					alt={`${profile.firstName} profile image'`}
				/>
				<Box
					flex='1'
					height='100%'
					borderTopRightRadius='25px'
					borderBottomRightRadius='25px'
					display='flex'
					flexDir='column'
					alignItems='flex-start'
					justifyContent='space-evenly'
					p={3}
				>
					{profile.stars && profile.ratings && (
						<Flex
							fontSize='12px'
							fontWeight={600}
							width='100%'
							align='center'
							justify='space-between'
						>
							<Flex>
								<Image
									src='/img/star.svg'
									fallbackSrc='/img/star.svg'
									width='14px'
									height='14px'
									mr={1}
									alt='ratings stars'
								/>
								{profile.stars}{' '}
								<Text ml={1} fontWeight={400} color='gray.500'>
									({profile.ratings.length})
								</Text>
							</Flex>

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
										tabIndex={0}
									/>
								</Tooltip>
							) : null}
						</Flex>
					)}
					<Flex align='center' justify='flex-start'>
						<Heading size='sm' fontWeight='500'>
							{profile.firstName}
						</Heading>
						<Tag colorScheme='blue' size='sm' ml={3}>
							{hostingsLookUp[profile.hostingId] &&
								capitalizeFirstLetter(hostingsLookUp[profile.hostingId].name[lang])}
						</Tag>
					</Flex>
					<Text fontSize='14px' color='gray.700'>
						{address}
					</Text>
					<SitterServicePricesMobileHorizontal state={state} profile={profile} />
				</Box>
			</Link>
		</NextLink>
	)
}
