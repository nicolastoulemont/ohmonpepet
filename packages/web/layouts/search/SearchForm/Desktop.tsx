import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { ExtraFiltersContainer } from 'layouts/search/filters'
import {
	Flex,
	Box,
	Heading,
	Text,
	FormControl,
	FormLabel,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Select,
	Button
} from '@chakra-ui/react'

export function SearchFormDesktop({
	handleChange,
	handleSliderChange,
	errors,
	servicesOptions,
	handleBtnClick,
	state,
	setState,
	handleCheckBoxes,
	languagesOptions,
	hostingsOptions,
	showExtraFilters,
	setShowExtraFilters,
	serviceOrDefault
}) {
	const { t, lang } = useI18n(searchJSON)

	return (
		<Box width='100%' py={{ base: 0, md: 3 }} pr={{ base: 0, md: 6 }} boxSizing='border-box'>
			<Heading size='lg' mb={{ base: 4, md: 6 }}>
				{t('searchHeader')}
				{state['address'].substring(0, 23).concat('...')}
			</Heading>
			<Flex
				width='100%'
				flexDir={['column', 'column', 'row']}
				align={['flex-start', 'flex-start', 'center']}
				justify={['center', 'center', 'flex-start']}
				mb={[4, 4, 6]}
			>
				<FormControl mr={[0, 0, 10]} mb={[4, 4, 0]}>
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
				<FormControl ml={[0, 0, 10]} mb={[4, 4, 0]}>
					<FormLabel>
						{
							// @ts-ignore
							t(serviceOrDefault, {
								max: lang === 'fr' ? 'maximum' : 'Maximum'
							})
						}{' '}
						{state['serviceMaxPrice'] && `- ${state['serviceMaxPrice']} €`}
					</FormLabel>
					<Flex boxSizing='border-box' width='100%'>
						<Text mr={4}>0</Text>
						<Slider
							defaultValue={state['serviceMaxPrice'] || 0}
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
			<Flex width='100%' align='flex-start' justify='flex-start' mb={4}>
				<Button variant='outline' onClick={handleBtnClick}>
					{t('moreFilters')}
				</Button>
				{showExtraFilters && (
					<ExtraFiltersContainer
						state={state}
						setState={setState}
						handleCheckBoxes={handleCheckBoxes}
						hostingsOptions={hostingsOptions}
						languagesOptions={languagesOptions}
						setShowExtraFilters={setShowExtraFilters}
						errors={errors}
					/>
				)}
			</Flex>
		</Box>
	)
}
