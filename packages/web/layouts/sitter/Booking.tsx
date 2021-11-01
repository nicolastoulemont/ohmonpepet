import React, { useMemo } from 'react'
import { RangeInput } from 'components'
import { useI18n } from 'utils/hooks/useI18n'
import profileByIdJSON from 'statics/profileById.json'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import { addMonths, format } from 'date-fns'
import { getIntervalDays } from 'utils'
import { DATE_SEARCH_FORMAT } from 'utils/constants'

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Select,
	Button,
	Text,
	Image,
	Divider
} from '@chakra-ui/react'

export function Booking({
	state,
	setState,
	selectedDays,
	profile,
	errors = {},
	handleChange,
	handleSubmit,
	servicesOptions
}) {
	const { t } = useI18n(profileByIdJSON)

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
		const availableDaysAsDates = profile.availability
			? profile.availability.map((day) => format(new Date(day), DATE_SEARCH_FORMAT))
			: []
		const allVisibleDays = getIntervalDays(firstDay, lastDay).map((day) =>
			format(day, DATE_SEARCH_FORMAT)
		)

		return allVisibleDays.filter((day) => !availableDaysAsDates.includes(day))
	}, [profile.availability])

	return (
		<Flex display={['none', 'none', 'none', 'flex']} width='33%' pl={6} pos='relative'>
			<Box
				pos='sticky'
				top='100px'
				width='100%'
				height='400px'
				boxShadow='rgba(0, 0, 0, 0.12) 0px 6px 16px'
				borderRadius='10px'
				p={6}
			>
				<Flex width='100%' alignItems='center' justifyContent='space-between' mb={6}>
					<SitterServicePrices
						state={state}
						profile={profile}
						requiredDaysNumber={selectedDays?.length || 0}
						showTotal={false}
					/>
					{profile.stars && profile.ratings && (
						<Flex fontSize='14px' fontWeight={600}>
							<Image src='/img/star.svg' width='16px' height='16px' mr={1} />
							{profile.stars}{' '}
							<Text ml={1} fontWeight={400} color='gray.500'>
								({profile.ratings.length})
							</Text>
						</Flex>
					)}
				</Flex>
				<RangeInput
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

				<Button
					mb={6}
					width='100%'
					height='45px'
					colorScheme='red'
					type='submit'
					onClick={handleSubmit}
				>
					{t('booking')}
				</Button>
				<Divider mb={4} />
				<Flex width='100%' align='center' justify='space-between'>
					<Text fontSize='17px' fontWeight={600}>
						Total
					</Text>
					<Text fontSize='17px' fontWeight={600}>
						{!state['service']
							? profile.atHomeDay * selectedDays.length
							: profile[state['service']] * selectedDays.length}
						{`€`}
					</Text>
				</Flex>
			</Box>
		</Flex>
	)
}
