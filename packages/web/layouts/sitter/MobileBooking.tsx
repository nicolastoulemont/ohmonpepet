import React, { useMemo, useRef, useState } from 'react'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import { addMonths, format } from 'date-fns'
import { getIntervalDays } from 'utils'
import { DATE_SEARCH_FORMAT } from 'utils/constants'
import { useI18n } from 'utils/hooks/useI18n'
import profileByIdJSON from 'statics/profileById.json'
import { RangeInputMobile } from 'components'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Select,
	Button,
	Text,
	Image,
	chakra
} from '@chakra-ui/react'

const MotionBox = chakra(motion.div)

const INITIAL_HEIGHT = 130

export function MobileBooking({
	state,
	setState,
	selectedDays,
	profile,
	errors = {},
	handleChange,
	handleSubmit,
	servicesOptions
}) {
	const hasInteracted = useRef(false)
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

	function handleTransformY(y: number) {
		// Dragging Down
		if (INITIAL_HEIGHT - y < INITIAL_HEIGHT) {
			return `${INITIAL_HEIGHT}px`
			// Dragging Up
		} else {
			const MAX_HEIGHT = window ? window.innerHeight - 65 : undefined
			if (hasInteracted.current) {
				return `${MAX_HEIGHT}px`
			} else {
				return `${INITIAL_HEIGHT - y}px`
			}
		}
	}

	const y = useMotionValue(0)
	const height = useTransform(y, handleTransformY)
	const [startOffset, setStartOffset] = React.useState(0)

	const isOpen = height.get() !== `${INITIAL_HEIGHT}px`

	const STEPS = {
		DATES: {
			panel: 'DATES',
			next: 'SERVICES'
		},
		SERVICES: {
			panel: 'SERVICES',
			next: 'SUBMIT',
			previous: 'DATES'
		}
	}

	const [step, setStep] = useState<any>(STEPS.DATES)
	function handleNext() {
		if (step.next !== 'SUBMIT') {
			setStep(STEPS[step.next])
		} else {
			handleSubmit()
		}
	}

	function handlePrevious() {
		step.previous && setStep(STEPS[step.previous])
	}

	return (
		<MotionBox
			pos='fixed'
			display={{ base: 'flex', lg: 'none' }}
			flexDir='column'
			alignItems='center'
			justifyContent='flex-start'
			bottom='0'
			left='0'
			w='100%'
			bg='white'
			zIndex={99}
			boxShadow='rgba(0, 0, 0, 0.12) 0px -6px 16px'
			borderTopLeftRadius='10px'
			borderTopRightRadius='10px'
			tabIndex={0}
			role='button'
			_hover={{ cursor: 'drag' }}
			aria-describedby='booking container, drag to show additionals inputs'
			drag='y'
			onDrag={(e, info) => {
				if (!hasInteracted.current) {
					hasInteracted.current = true
				}
				y.set(startOffset + info.offset.y)
			}}
			onDragEnd={(e, info) => setStartOffset(startOffset + info.offset.y)}
			dragConstraints={{ bottom: 0, top: 0 }}
			dragElastic={false}
			dragMomentum={false}
			style={{ height, transition: 'height 0.2s ease-in-out' }}
		>
			<Flex
				width='100%'
				height='10px'
				pos='absolute'
				top='8px'
				align='center'
				justify='center'
				flexDir='column'
				_hover={{ cursor: 'drag' }}
			>
				<Box
					width='75px'
					height='4px'
					bgColor={isOpen ? 'green.300' : 'gray.500'}
					rounded='full'
				/>
			</Flex>
			<Flex
				width='100%'
				p={6}
				pt={isOpen ? 6 : 0}
				flex='1'
				flexDir='column'
				align='center'
				justify='space-between'
			>
				<AnimatePresence>
					{isOpen && (
						<MotionBox
							width='100%'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{step.panel === 'DATES' ? (
								<RangeInputMobile
									state={state}
									setState={setState}
									errors={{}}
									disabledDays={disabledDates}
									placeholder={t('datesFieldPlaceholder')}
									inputSize='md'
								/>
							) : null}
							{step.panel === 'SERVICES' ? (
								<FormControl mt={3}>
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
							) : null}
						</MotionBox>
					)}
				</AnimatePresence>

				<Box
					width='100%'
					bottom='0'
					left='0'
					w='100%'
					pos='absolute'
					px={6}
					py={3}
					zIndex={99}
					bgColor='white'
				>
					{isOpen ? (
						<Flex
							py={3}
							display='flex'
							alignItems='center'
							justifyContent={
								step.panel === 'SERVICES' ? 'space-between' : 'flex-end'
							}
						>
							{step.previous ? (
								<Button onClick={handlePrevious} size='sm'>
									Dates
								</Button>
							) : null}
							{step.next !== 'SUBMIT' ? (
								<Button onClick={handleNext} size='sm'>
									Services
								</Button>
							) : null}
						</Flex>
					) : null}
					<Flex width='100%' alignItems='center' justifyContent='space-between' mb={4}>
						<Flex align='center' justify='center'>
							<SitterServicePrices
								state={state}
								profile={profile}
								requiredDaysNumber={selectedDays?.length || 0}
								showTotal={false}
							/>
							<Flex align='center' justify='center' ml={2}>
								<Text fontSize='14px' fontWeight={600}>
									- Total
								</Text>
								<Text fontSize='14px' fontWeight={600} ml={2}>
									{!state['service']
										? profile.atHomeDay * selectedDays.length
										: profile[state['service']] * selectedDays.length}
									{`€`}
								</Text>
							</Flex>
						</Flex>
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
					<Button
						width='100%'
						height='45px'
						colorScheme='red'
						type='submit'
						onClick={handleSubmit}
						id='submit-btn'
					>
						{t('booking')}
					</Button>
				</Box>
			</Flex>
		</MotionBox>
	)
}
