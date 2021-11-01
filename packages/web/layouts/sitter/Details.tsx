import React, { useMemo, useState } from 'react'
import { Box, Flex, Heading, Text, Image, Divider, Link, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import profileByIdJSON from 'statics/profileById.json'
import { useI18n } from 'utils/hooks/useI18n'
import { RangeWithDisabledDayPicker, Carousel } from 'components'
import { useDimensions } from 'utils/hooks'
import { format, addMonths } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { getIntervalDays } from 'utils'
import { DATE_SEARCH_FORMAT } from 'utils/constants'
import { keyValidation } from 'utils/keyboard'

export function Details({ profile, gendersLookUp, state, setState, selectedDays, partnersLookUp }) {
	const [pictureIndex, setPictureIndex] = useState(0)
	const { t, lang } = useI18n(profileByIdJSON)
	const [showFullDescription, setShowFullDescription] = useState(false)
	const [width] = useDimensions()

	const isFemale = useMemo(
		() =>
			gendersLookUp[profile.genderId] &&
			(gendersLookUp[profile.genderId].name[lang] === 'madame' ||
				gendersLookUp[profile.genderId].name[lang] === 'female'),
		[gendersLookUp]
	)

	const disabledDates = useMemo(() => {
		const firstDay = new Date(
			new Date(state.startDate).getFullYear(),
			new Date(state.startDate).getMonth(),
			1
		)
		const lastDay = new Date(
			new Date(
				addMonths(new Date(state.endDate), !width || width > 910 ? 2 : 1)
			).getFullYear(),
			new Date(addMonths(new Date(state.endDate), !width || width > 910 ? 2 : 1)).getMonth()
		)
		const availableDaysAsDates = profile.availability
			? profile.availability.map((day) => format(new Date(day), DATE_SEARCH_FORMAT))
			: []

		const allVisibleDays = getIntervalDays(firstDay, lastDay).map((day) =>
			format(day, DATE_SEARCH_FORMAT)
		)

		return allVisibleDays
			.filter((day) => !availableDaysAsDates.includes(day))
			.map((day) => new Date(day))
	}, [profile.availability])

	const sitterHasPartnerShip = profile.partnerId && profile.partnerPercentage !== 0

	const sitterPictures = useMemo(
		() =>
			profile.otherPictureUrls && profile.otherPictureUrls.length > 0
				? [profile.pictureUrl, ...profile.otherPictureUrls]
				: [profile.pictureUrl],
		[profile]
	)

	return (
		<Box width={['100%', '100%', '100%', '66%']}>
			<Flex
				align='flex-start'
				justify='space-between'
				width='100%'
				height={['200px', '450px']}
				boxSizing='border-box'
				pos='relative'
			>
				{sitterPictures.length > 1 ? (
					<Carousel imagesUrls={sitterPictures} />
				) : (
					<Image
						src={profile.pictureUrl}
						fallbackSrc={profile.pictureUrl}
						alt='petsitter profile picture'
						width='100%'
						height='100%'
						objectFit='cover'
						borderRadius='10px'
					/>
				)}
			</Flex>
			{sitterHasPartnerShip ? (
				<Flex width='100%' align='center' justify='flex-start' my={4}>
					<Image
						src='/img/donation.svg'
						fallbackSrc='/img/donation.svg'
						width='5vw'
						maxWidth='2.8em'
						mr={2}
						display={{ base: 'none', sm: 'block' }}
					/>
					<Box ml={{ base: 0, sm: 6 }}>
						<Text fontWeight={600} fontSize={{ base: 'sm', sm: 'md' }}>
							{t('giveTo', {
								name: profile.firstName,
								percentage: profile.partnerPercentage
							})}{' '}
							<Link
								href={partnersLookUp[profile.partnerId].websiteUrl}
								isExternal
								color='blue.500'
								fontWeight={600}
							>
								{partnersLookUp[profile.partnerId].name}
							</Link>
						</Text>
						<Text color='gray.500' fontSize='14px'>
							{partnersLookUp[profile.partnerId].description}
						</Text>
					</Box>
				</Flex>
			) : null}
			{(profile.flexibleCancelation ||
				profile.acceptShortNotice ||
				profile.professionalPetSitter ||
				profile.abilityToProvideMedicalCare) && (
				<>
					<Divider my={[4, 6]} color='gray.500' />
					<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start'>
						{profile.flexibleCancelation && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/cancel.svg'
									fallbackSrc='/img/cancel.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('flexibleCancelation', { name: profile.firstName })}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('flexibleCancelationHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.acceptShortNotice && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/chrono.svg'
									fallbackSrc='/img/chrono.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('acceptShortNotice', { name: profile.firstName })}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('acceptShortNoticeHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.professionalPetSitter && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/certificate.svg'
									fallbackSrc='/img/certificate.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('professionalPetSitter', {
											name: profile.firstName,
											genderOne: isFemale ? 'e' : '',
											genderTwo: isFemale ? 'le' : ''
										})}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('professionalPetSitterHelper', {
											name: profile.firstName
										})}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.abilityToProvideMedicalCare && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/veterinary.svg'
									fallbackSrc='/img/veterinary.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('abilityToProvideMedicalCare', {
											name: profile.firstName
										})}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('abilityToProvideMedicalCareHelper')}
									</Text>
								</Box>
							</Flex>
						)}
					</Flex>
				</>
			)}

			{profile.description && (
				<>
					<Divider my={[4, 6]} />
					<Box py={4} pr={4}>
						{profile.description.length > 600 && !showFullDescription ? (
							<Text>
								{profile.description.substring(0, 597).concat('...')}{' '}
								<span
									onClick={() => setShowFullDescription(true)}
									tabIndex={0}
									role='button'
									onKeyDown={(event) =>
										keyValidation(event) && setShowFullDescription(true)
									}
									style={{ fontWeight: 600, textDecoration: 'underline' }}
								>
									{t('readMore')}
								</span>
							</Text>
						) : (
							<Text>{profile.description}</Text>
						)}
					</Box>
				</>
			)}

			{(profile.atHomeContinuously ||
				profile.atHomeExclusivity ||
				profile.atHomeOnlyBringPet ||
				profile.atHomeComeGetPet) && (
				<>
					<Divider my={[4, 6]} />
					<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start'>
						<Heading size='lg'>
							{t('atHomeFeatures', { gender: isFemale ? 'her' : 'his' })}
						</Heading>
						{profile.atHomeContinuously && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/home.svg'
									fallbackSrc='/img/home.svg'
									width='5vw'
									maxWidth='1.5em'
									display={['none', 'block']}
								/>
								<Image
									src='/img/time.svg'
									fallbackSrc='/img/time.svg'
									width='5vw'
									maxWidth='1.5em'
									ml={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atHomeContinuously', {
											name: profile.firstName,
											gender: isFemale ? 'e' : ''
										})}
										{profile.atHomeContinuouslyExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atHomeContinuouslyExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atHomeContinuouslyHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.atHomeExclusivity && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/first.svg'
									fallbackSrc='/img/first.svg'
									width='5vw'
									maxWidth='1.5em'
									display={['none', 'block']}
								/>
								<Image
									src='/img/cats.svg'
									fallbackSrc='/img/cats.svg'
									width='5vw'
									maxWidth='1.5em'
									ml={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atHomeExclusivity', { name: profile.firstName })}
										{profile.atHomeExclusivityExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atHomeExclusivityExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atHomeExclusivityHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.atHomeOnlyBringPet && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/pet-food.svg'
									fallbackSrc='/img/pet-food.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atHomeOnlyBringPet', {
											name: profile.firstName,
											gender: isFemale
												? lang === 'fr'
													? 'elle'
													: 'her'
												: lang == 'fr'
												? 'lui'
												: 'his'
										})}
										{profile.atHomeOnlyBringPetExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atHomeOnlyBringPetExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atHomeOnlyBringPetHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.atHomeComeGetPet && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/thank-you.svg'
									fallbackSrc='/img/thank-you.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atHomeComeGetPet', { name: profile.firstName })}
										{profile.atHomeComeGetPetExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atHomeComeGetPetExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atHomeComeGetPetHelper')}
									</Text>
								</Box>
							</Flex>
						)}
					</Flex>
				</>
			)}
			{(profile.atOwnerHomeMail ||
				profile.atOwnerHomePlantsCare ||
				profile.atOwnerHomeCurtains) && (
				<>
					<Divider my={[4, 6]} />
					<Flex width='100%' flexDir='column' align='flex-start' justify='flex-start'>
						<Heading size='lg'>{t('atOwnerHomeFeatures')}</Heading>
						{profile.atOwnerHomeMail && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/delivery.svg'
									fallbackSrc='/img/delivery.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atOwnerHomeMail', { name: profile.firstName })}
										{profile.atOwnerHomeMailExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atOwnerHomeMailExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atOwnerHomeMailHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.atOwnerHomePlantsCare && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/plantscare.svg'
									fallbackSrc='/img/plantscare.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atOwnerHomePlantsCare', { name: profile.firstName })}
										{profile.atOwnerHomePlantsCareExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atOwnerHomePlantsCareExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atOwnerHomePlantsCareHelper')}
									</Text>
								</Box>
							</Flex>
						)}
						{profile.atOwnerHomeCurtains && (
							<Flex width='100%' align='center' justify='flex-start' my={4}>
								<Image
									src='/img/window.svg'
									fallbackSrc='/img/window.svg'
									width='5vw'
									maxWidth='2.8em'
									mr={2}
									display={['none', 'block']}
								/>
								<Box ml={[0, 6]}>
									<Text fontWeight={600} fontSize={['sm', 'md']}>
										{t('atOwnerHomeCurtains', { name: profile.firstName })}
										{profile.atOwnerHomeCurtainsExtraPrice ? (
											<span
												style={{
													fontWeight: 400,
													fontStyle: 'italic',
													fontSize: '14px'
												}}
											>
												{t('additional', {
													euros: profile.atOwnerHomeCurtainsExtraPrice
												})}
											</span>
										) : null}
									</Text>
									<Text color='gray.500' fontSize='14px'>
										{t('atOwnerHomeCurtainsHelper')}
									</Text>
								</Box>
							</Flex>
						)}
					</Flex>
				</>
			)}
			<Divider my={[4, 6]} />
			<Flex
				width='100%'
				align='flex-start'
				height='360px'
				flexDir='column'
				justify='flex-start'
			>
				<Heading size='md'>
					{selectedDays.length}{' '}
					{t('daysAt', { many: selectedDays.length > 1 ? 's' : '' })} {profile.firstName}
				</Heading>

				<Text fontSize='14px' color='gray.500'>
					{state['startDate']
						? format(new Date(state.startDate), 'dd LLLL yyyy', {
								locale: lang === 'fr' ? fr : enUS
						  })
						: null}{' '}
					{state['endDate']
						? `- ${format(new Date(state.endDate), 'dd LLLL yyyy', {
								locale: lang === 'fr' ? fr : enUS
						  })}`
						: null}
				</Text>
				<RangeWithDisabledDayPicker
					state={state}
					setState={setState}
					numberOfMonths={2}
					disabledDates={disabledDates}
				/>
			</Flex>
		</Box>
	)
}
