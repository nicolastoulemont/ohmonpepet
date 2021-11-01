import React, { useMemo, useState } from 'react'
import { MultiSelectMobile, RangeInputMobile, LocationInputMobile } from 'components'
import { SearchIcon } from '@chakra-ui/icons'
import { useI18n } from 'utils/hooks/useI18n'
import rootJSON from 'statics/root.json'
import { useSearchAndPush } from 'utils/hooks/useSearchAndPush'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'
import {
	FormControl,
	FormLabel,
	Flex,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Button,
	DrawerFooter
} from '@chakra-ui/react'

interface SearchState {
	address: string
	location: {
		type: string
		coordinates: Array<number>
	}
	startDate: number
	endDate: number
	acceptedAnimalsIds: Array<string>
}

const DRAWER_HEADER_HEIGHT = 56
const DRAWER_FOOTER_HEIGHT = 65

export function SearchMobile({ speciesOptions }) {
	const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
	const { t } = useI18n(rootJSON)
	const [errors] = useState<{ [key: string]: string }>({})
	const [firstAvailableResult, setFirstAvailableResult] = useState({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		}
	})
	const [state, setState] = useState<SearchState>({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		startDate: Date.now(),
		endDate: Date.now(),
		acceptedAnimalsIds: []
	})
	const { search } = useSearchAndPush(state, firstAvailableResult)
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
			search()
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
		<>
			<Flex width='100%' align='center' justify='center' mt='60px' mb='180px'>
				<Button
					size='lg'
					borderRadius='25px'
					width='80%'
					colorScheme='red'
					fontSize='xl'
					onClick={onDrawerOpen}
				>
					<SearchIcon color='white' fontWeight={700} fontSize='xl' mr={3} />
					{t('searchBtnMobile')}
				</Button>
			</Flex>
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
		</>
	)
}
