import React, { useState } from 'react'
import { MultiSelect } from 'components'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { GenericFilters } from './GenericFilters'
import { AtOwnerHomeDayFilters } from './AtOwnerHomeDayFilters'
import { AtHomeDayFilters } from './AtHomeDayFilters'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'
import {
	Flex,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Button,
	DrawerFooter,
	FormControl,
	FormLabel,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Select
} from '@chakra-ui/react'

const DRAWER_HEADER_HEIGHT = 56
const DRAWER_FOOTER_HEIGHT = 65

export function ExtraFiltersMobileContainer({
	hostingsOptions,
	languagesOptions,
	state,
	setState,
	errors,
	handleCheckBoxes,
	isDrawerOpen,
	onDrawerClose,
	handleChange,
	servicesOptions,
	handleSliderChange,
	serviceOrDefault
}) {
	const { t, lang } = useI18n(searchJSON)

	const STEPS = {
		SELECTS: {
			panel: 'SELECTS',
			next: 'CHECKBOXES',
			label: t('hostingAndLang')
		},
		CHECKBOXES: {
			panel: 'CHECKBOXES',
			previous: 'SELECTS',
			label: t('perks')
		}
	}

	const [step, setStep] = useState<any>(STEPS.SELECTS)

	function handleNext() {
		step.next && setStep(STEPS[step.next])
	}

	function handlePrevious() {
		step.previous && setStep(STEPS[step.previous])
	}

	return (
		<>
			<Drawer isOpen={isDrawerOpen} placement='bottom' onClose={onDrawerClose}>
				<DrawerOverlay>
					<DrawerContent
						width='100%'
						height={MOBILE_DRAWER_CONTAINER_HEIGHT}
						borderTopRadius='25px'
					>
						<FormControl height={MOBILE_DRAWER_CONTAINER_HEIGHT}>
							<DrawerHeader
								display='flex'
								alignItems='center'
								justifyContent='space-between'
								px={4}
								py={3}
								height={`${DRAWER_HEADER_HEIGHT}px`}
							>
								<FormLabel m={0}>{step.label}</FormLabel>
								<DrawerCloseButton />
							</DrawerHeader>
							<DrawerBody
								px={3}
								height={`calc(100vh - ${
									DRAWER_FOOTER_HEIGHT +
									DRAWER_HEADER_HEIGHT +
									MOBILE_DRAWER_HEADER_HEIGHT
								}px)`}
								overflowY='auto'
							>
								{step.panel === 'SELECTS' ? (
									<>
										<FormControl mb={6}>
											<FormLabel htmlFor='service'>
												{t('serviceType')}
											</FormLabel>
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
										<FormControl my={6}>
											<FormLabel>
												{
													// @ts-ignore
													t(serviceOrDefault, {
														max: lang === 'fr' ? 'maximum' : 'Maximum'
													})
												}{' '}
												{state['serviceMaxPrice'] &&
													`- ${state['serviceMaxPrice']} €`}
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
										<MultiSelect
											name='hostingId'
											placeholder={t('hostingLabel')}
											options={hostingsOptions}
											state={state['hostingId']}
											setState={setState}
											errors={errors}
											type='text'
											label={t('hostingPlaceholder')}
											containerWidth='100%'
											styles={{
												my: 6
											}}
										/>
										<MultiSelect
											name='languagesIds'
											placeholder={t('languagesLabel')}
											options={languagesOptions}
											state={state['languagesIds']}
											setState={setState}
											errors={errors}
											type='text'
											label={t('languagesLabel')}
											containerWidth='100%'
											styles={{
												mb: 6
											}}
											withIcon
										/>
									</>
								) : null}
								{step.panel === 'CHECKBOXES' ? (
									<>
										<Flex
											width='100%'
											align='center'
											justify='space-between'
											mt={6}
										>
											<GenericFilters
												state={state}
												handleCheckBoxes={handleCheckBoxes}
											/>
										</Flex>
										{state['service'] && state['service'].includes('Owner') && (
											<Flex
												width='100%'
												align='center'
												justify='space-between'
												mb={2}
											>
												<AtOwnerHomeDayFilters
													state={state}
													handleCheckBoxes={handleCheckBoxes}
												/>
											</Flex>
										)}
										{state['service'] && !state['service'].includes('Owner') && (
											<Flex
												width='100%'
												align='center'
												justify='space-between'
												mb={2}
											>
												<AtHomeDayFilters
													state={state}
													handleCheckBoxes={handleCheckBoxes}
												/>
											</Flex>
										)}
									</>
								) : null}
							</DrawerBody>
							<DrawerFooter
								p={3}
								height={`${DRAWER_FOOTER_HEIGHT}px`}
								display='flex'
								alignItems='center'
								justifyContent={
									step.panel === 'CHECKBOXES' ? 'space-between' : 'flex-end'
								}
							>
								{step.previous ? (
									<Button onClick={handlePrevious}>{t('hostingAndLang')}</Button>
								) : null}
								{step.next ? (
									<Button onClick={handleNext}>{t('perks')}</Button>
								) : null}
							</DrawerFooter>
						</FormControl>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}
