import React, { useMemo } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import bookingJSON from 'statics/booking.json'
import { addMonths, format } from 'date-fns'
import { getIntervalDays } from 'utils'
import { DATE_SEARCH_FORMAT } from 'utils/constants'
import { RangeInputPolyvalent } from 'components'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { formatForUrl } from 'utils/dates'

import {
	Box,
	Heading,
	Divider,
	FormControl,
	FormLabel,
	Select,
	Flex,
	Text,
	Switch,
	Link
} from '@chakra-ui/react'

export function BookingActions({
	profile,
	state,
	setState,
	handleChange,
	errors,
	gendersLookUp,
	handleCheckBoxes,
	servicesOptions
}) {
	const { query } = useRouter()
	const { t, lang } = useI18n(bookingJSON)

	const disabledDates = useMemo(() => {
		const firstDay = new Date(
			new Date(state.startDate).getFullYear(),
			new Date(state.startDate).getMonth(),
			1
		)
		const lastDay = new Date(
			new Date(addMonths(new Date(state.endDate), 1)).getFullYear(),
			new Date(addMonths(new Date(state.endDate), 1)).getMonth()
		)
		const availableDaysAsDates = profile.availability.map((day) =>
			format(new Date(day), DATE_SEARCH_FORMAT)
		)
		const allVisibleDays = getIntervalDays(firstDay, lastDay).map((day) =>
			format(day, DATE_SEARCH_FORMAT)
		)

		return allVisibleDays.filter((day) => !availableDaysAsDates.includes(day))
	}, [profile.availability])

	const isFemale = useMemo(
		() =>
			gendersLookUp[profile.genderId] &&
			(gendersLookUp[profile.genderId].name[lang] === 'madame' ||
				gendersLookUp[profile.genderId].name[lang] === 'female'),
		[gendersLookUp]
	)

	return (
		<>
			<NextLink
				passHref
				href={{
					pathname: '/sitter',
					query: {
						id: query.id,
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
					display={{ base: 'none', lg: 'flex' }}
					mb={3}
					width='75px'
					height='35px'
					alignItems='center'
					justifyContent='center'
					bgColor='gray.100'
					rounded='md'
				>
					{t('goBack')}
				</Link>
			</NextLink>

			<Heading display={['none', 'none', 'none', 'block']}>{t('confirm')}</Heading>
			<Divider my={6} />
			<Box width={['100%', '100%', '100%', '50%']}>
				<RangeInputPolyvalent
					state={state}
					setState={setState}
					errors={{}}
					disabledDays={disabledDates}
					label={t('datesFieldLabel')}
					placeholder={t('datesFieldPlaceholder')}
				/>
				<FormControl my={6}>
					<FormLabel>{t('serviceType')}</FormLabel>
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
			</Box>
			{(state.service === 'atHomeDay' || state.service === 'atHomeHour') && (
				<>
					{(profile.atHomeContinuously ||
						profile.atHomeExclusivity ||
						profile.atHomeOnlyBringPet ||
						profile.atHomeComeGetPet) && (
						<>
							<Divider my={[4, 6]} />
							<Flex
								width='100%'
								flexDir='column'
								align='flex-start'
								justify='flex-start'
							>
								<Heading size='lg'>
									{t('atHomeFeatures', { gender: isFemale ? 'her' : 'his' })}
								</Heading>
								{profile.atHomeContinuously && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atHomeContinuously'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atHomeContinuously',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
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
															euros:
																profile.atHomeContinuouslyExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atHomeContinuouslyHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
								{profile.atHomeExclusivity && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atHomeExclusivity'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atHomeExclusivity',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
											<Text fontWeight={600} fontSize={['sm', 'md']}>
												{t('atHomeExclusivity', {
													name: profile.firstName
												})}
												{profile.atHomeExclusivityExtraPrice ? (
													<span
														style={{
															fontWeight: 400,
															fontStyle: 'italic',
															fontSize: '14px'
														}}
													>
														{t('additional', {
															euros:
																profile.atHomeExclusivityExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atHomeExclusivityHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
								{profile.atHomeOnlyBringPet && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atHomeOnlyBringPet'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atHomeOnlyBringPet',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
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
															euros:
																profile.atHomeOnlyBringPetExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atHomeOnlyBringPetHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
								{profile.atHomeComeGetPet && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atHomeComeGetPet'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atHomeComeGetPet',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
											<Text fontWeight={600} fontSize={['sm', 'md']}>
												{t('atHomeComeGetPet', {
													name: profile.firstName
												})}
												{profile.atHomeComeGetPetExtraPrice ? (
													<span
														style={{
															fontWeight: 400,
															fontStyle: 'italic',
															fontSize: '14px'
														}}
													>
														{t('additional', {
															euros:
																profile.atHomeComeGetPetExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atHomeComeGetPetHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
							</Flex>
						</>
					)}
				</>
			)}
			{(state.service === 'atOwnerHomeDay' || state.service === 'atOwnerHomeHour') && (
				<>
					{(profile.atOwnerHomeMail ||
						profile.atOwnerHomePlantsCare ||
						profile.atOwnerHomeCurtains) && (
						<>
							<Divider my={[4, 6]} />
							<Flex
								width='100%'
								flexDir='column'
								align='flex-start'
								justify='flex-start'
							>
								<Heading size='lg'>{t('atOwnerHomeFeatures')}</Heading>
								{profile.atOwnerHomeMail && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atOwnerHomeMail'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atOwnerHomeMail',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
											<Text fontWeight={600} fontSize={['sm', 'md']}>
												{t('atOwnerHomeMail', {
													name: profile.firstName
												})}
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
										</FormLabel>
									</Flex>
								)}
								{profile.atOwnerHomePlantsCare && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atOwnerHomePlantsCare'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atOwnerHomePlantsCare',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
											<Text fontWeight={600} fontSize={['sm', 'md']}>
												{t('atOwnerHomePlantsCare', {
													name: profile.firstName
												})}
												{profile.atOwnerHomePlantsCareExtraPrice ? (
													<span
														style={{
															fontWeight: 400,
															fontStyle: 'italic',
															fontSize: '14px'
														}}
													>
														{t('additional', {
															euros:
																profile.atOwnerHomePlantsCareExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atOwnerHomePlantsCareHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
								{profile.atOwnerHomeCurtains && (
									<Flex width='100%' align='center' justify='flex-start' my={4}>
										<Switch
											size='lg'
											isChecked={state['atOwnerHomeCurtains'] || false}
											onChange={(e) =>
												handleCheckBoxes(
													'atOwnerHomeCurtains',
													e.target.checked
												)
											}
										/>
										<FormLabel ml={[2, 6]} p={0}>
											<Text fontWeight={600} fontSize={['sm', 'md']}>
												{t('atOwnerHomeCurtains', {
													name: profile.firstName
												})}
												{profile.atOwnerHomeCurtainsExtraPrice ? (
													<span
														style={{
															fontWeight: 400,
															fontStyle: 'italic',
															fontSize: '14px'
														}}
													>
														{t('additional', {
															euros:
																profile.atOwnerHomeCurtainsExtraPrice
														})}
													</span>
												) : null}
											</Text>
											<Text color='gray.500' fontSize='14px'>
												{t('atOwnerHomeCurtainsHelper')}
											</Text>
										</FormLabel>
									</Flex>
								)}
							</Flex>
						</>
					)}
				</>
			)}
		</>
	)
}
