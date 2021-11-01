import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingListJSON from 'statics/profileBookingList.json'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'
import { RangeInputMobile } from 'components'
import { useOwnerStore } from 'lib/stores/search'
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import {
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
	Select,
	IconButton,
	theme,
	Text,
	Box,
	Flex
} from '@chakra-ui/react'

const DRAWER_HEADER_HEIGHT = 56
const DRAWER_FOOTER_HEIGHT = 65

export function MobilePetOwnerFilter({
	servicesOptions,
	sortByOptions,
	isDrawerOpen,
	onDrawerClose,
	handleChange,
	setRange
}) {
	const { includeFinished, sortKey, startDate, endDate, filterByService, fns } = useOwnerStore()
	const { t } = useI18n(profileBookingListJSON)

	const STEPS = {
		SELECTS: {
			panel: 'SELECTS',
			next: 'DATES',
			label: t('serviceType')
		},
		DATES: {
			panel: 'DATES',
			previous: 'SELECTS',
			label: t('datesFieldLabel')
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
								justifyContent='flex-end'
								px={4}
								py={3}
								height={`${DRAWER_HEADER_HEIGHT}px`}
							>
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
										<FormControl mb={6} width='100%'>
											<FormLabel>{t('serviceType')}</FormLabel>
											<Select
												id='filterByService'
												name='filterByService'
												value={filterByService || ''}
												aria-describedby='filterByService'
												variant='outline'
												onChange={handleChange}
												isInvalid={false}
												placeholder={t('servicePlaceholder')}
											>
												{servicesOptions.map((service) => (
													<option key={service.key} value={service.value}>
														{service.text}
													</option>
												))}
											</Select>
										</FormControl>
										<FormControl
											width='100%'
											display='flex'
											alignItems='flex-end'
											justifyContent='space-between'
											mb={6}
										>
											<Box flex='1'>
												<FormLabel>{t('sortKey')}</FormLabel>
												<Select
													id='sortKey'
													name='sortKey'
													value={sortKey || ''}
													aria-describedby='sortKey'
													variant='outline'
													onChange={handleChange}
													isInvalid={false}
													placeholder={t('sortKeyPlaceholder')}
												>
													{sortByOptions.map((option) => (
														<option
															key={option.key}
															value={option.value}
														>
															{option.text}
														</option>
													))}
												</Select>
											</Box>
											<Flex>
												<IconButton
													aria-label='Sort descending'
													icon={<FaSortAmountDown />}
													ml={{ base: 0, lg: 2 }}
													mr={1}
													bgColor={
														fns.showDescending()
															? theme.colors.green['600']
															: 'white'
													}
													color={
														fns.showDescending()
															? 'white'
															: theme.colors.gray['800']
													}
													_hover={{
														bgColor: fns.showDescending()
															? theme.colors.green['500']
															: theme.colors.green['100']
													}}
													onClick={() =>
														fns.changeSortValue('descending')
													}
												/>
												<IconButton
													aria-label='Sort ascending'
													icon={<FaSortAmountUp />}
													ml={1}
													mr={{ base: 1, lg: 2 }}
													bgColor={
														fns.showAscending()
															? theme.colors.green['600']
															: 'white'
													}
													color={
														fns.showAscending()
															? 'white'
															: theme.colors.gray['800']
													}
													_hover={{
														bgColor: fns.showAscending()
															? theme.colors.green['500']
															: theme.colors.green['100']
													}}
													onClick={() => fns.changeSortValue('ascending')}
												/>
											</Flex>
										</FormControl>

										<Button
											bgColor='white'
											_hover={{
												bgColor: !includeFinished
													? theme.colors.green['100']
													: theme.colors.red['100']
											}}
											onClick={() => fns.changeIncluded()}
										>
											<Text>
												{includeFinished
													? t('excludeFinished')
													: t('includeFinished')}
											</Text>
										</Button>
									</>
								) : null}
								{step.panel === 'DATES' ? (
									<>
										<RangeInputMobile
											state={{ startDate, endDate }}
											setState={setRange}
											errors={{}}
											showClearBtn={true}
											label={t('datesFieldLabel')}
											placeholder={t('datesFieldPlaceholder')}
											inputSize='md'
										/>
									</>
								) : null}
							</DrawerBody>
							<DrawerFooter
								p={3}
								height={`${DRAWER_FOOTER_HEIGHT}px`}
								display='flex'
								alignItems='center'
								justifyContent={step.panel === 'DATES' ? 'flex-start' : 'flex-end'}
							>
								{step.panel === 'DATES' ? (
									<Button onClick={handlePrevious}>{t('serviceType')}</Button>
								) : null}
								{step.panel === 'SELECTS' ? (
									<Button onClick={handleNext}>{t('datesFieldLabel')}</Button>
								) : null}
							</DrawerFooter>
						</FormControl>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}
