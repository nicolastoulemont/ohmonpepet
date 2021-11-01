import React, { useMemo, useState } from 'react'
import { MultiSelectMobile, RangeInputMobile, LocationInputMobile } from 'components'
import { useI18n } from 'utils/hooks/useI18n'
import rootJSON from 'statics/root.json'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'
import {
	FormControl,
	FormLabel,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Button,
	DrawerFooter
} from '@chakra-ui/react'

const DRAWER_HEADER_HEIGHT = 56
const DRAWER_FOOTER_HEIGHT = 65

export function MobileForm({
	handleSearch,
	state,
	setState,
	setFirstAvailableResult,
	errors,
	speciesOptions,
	isDrawerOpen,
	onDrawerClose
}) {
	const { t } = useI18n(rootJSON)

	const STEPS = {
		LOCATION: {
			panel: 'LOCATION',
			previous: null,
			next: 'DATES',
			label: t('addressFieldPlaceholder')
		},
		DATES: {
			panel: 'DATES',
			previous: 'LOCATION',
			next: 'SPECIES',
			label: t('datesFieldLabel')
		},
		SPECIES: {
			panel: 'SPECIES',
			next: 'SUBMIT',
			previous: 'DATES',
			label: t('animalsField')
		}
	}

	const [step, setStep] = useState<any>(STEPS.LOCATION)

	function handleNext() {
		if (step.next !== 'SUBMIT') {
			setStep(STEPS[step.next])
		} else {
			if (handleSearch) {
				handleSearch()
			} else {
				onDrawerClose()
				setStep(STEPS.LOCATION)
			}
		}
	}

	function handlePrevious() {
		step.previous && setStep(STEPS[step.previous])
	}

	const disableNextStep = useMemo(() => {
		if (step.panel === 'LOCATION') {
			return Boolean(state.address === '' && state.location.coordinates.length !== 2)
		} else if (step.panel === 'SPECIES') {
			return state.acceptedAnimalsIds.length === 0
		} else {
			return false
		}
	}, [step, state])

	return (
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
							p={3}
							height={`calc(100vh - ${
								DRAWER_FOOTER_HEIGHT +
								DRAWER_HEADER_HEIGHT +
								MOBILE_DRAWER_HEADER_HEIGHT
							}px)`}
							overflowY='auto'
						>
							{step.panel === 'LOCATION' ? (
								<LocationInputMobile
									address={state.address}
									location={state.location}
									parentState={state}
									setParentState={setState}
									setFirstAvailableResult={setFirstAvailableResult}
									callBackFn={() => setStep(STEPS['DATES'])}
								/>
							) : null}
							{step.panel === 'DATES' ? (
								<RangeInputMobile
									state={state}
									setState={setState}
									errors={errors}
									placeholder={t('datesFieldPlaceholder')}
								/>
							) : null}
							{step.panel === 'SPECIES' ? (
								<MultiSelectMobile
									name='acceptedAnimalsIds'
									placeholder={t('animalsFieldPlaceholder')}
									options={speciesOptions}
									state={state['acceptedAnimalsIds']}
									setState={setState}
									errors={errors}
									type='text'
								/>
							) : null}
						</DrawerBody>
						<DrawerFooter
							p={3}
							height={`${DRAWER_FOOTER_HEIGHT}px`}
							display='flex'
							alignItems='center'
							justifyContent={
								step.panel === 'DATES' || step.panel === 'SPECIES'
									? 'space-between'
									: 'flex-end'
							}
						>
							{step.previous ? (
								<Button onClick={handlePrevious}>
									{
										// @ts-ignore
										t(`previous${step.panel}`)
									}
								</Button>
							) : null}
							{step.next ? (
								<Button
									onClick={handleNext}
									colorScheme='red'
									disabled={disableNextStep}
								>
									{
										// @ts-ignore
										t(`next${step.panel}`)
									}
								</Button>
							) : null}
						</DrawerFooter>
					</FormControl>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	)
}
