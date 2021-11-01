import React, { useState, useEffect, useRef } from 'react'
import { FormControl, FormLabel, Input, FormHelperText, Button, Flex } from '@chakra-ui/react'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useI18n } from 'utils/hooks/useI18n'
import rangeInputJSON from 'statics/components/rangeInput.json'
import { RangeDayPicker } from './DayPickers/Range'
import { keyValidation } from 'utils/keyboard'
import { useClickAway } from 'react-use'
interface RangeInputProps {
	state: any
	setState: React.Dispatch<
		React.SetStateAction<{
			[key: string]: any
		}>
	>
	errors: { [key: string]: string }
	placeholder: string
	label: string
	styles?: any
	required?: boolean
	disabledDays?: Array<string>
	openTop?: boolean
	canChangeMonth?: boolean
	showErrorText?: boolean
	showClearBtn?: boolean
}

export function RangeInput({
	state,
	setState,
	errors,
	label,
	placeholder,
	styles,
	disabledDays,
	openTop = false,
	canChangeMonth = true,
	required = false,
	showErrorText = true,
	showClearBtn = false
}: RangeInputProps) {
	const [showDayPicker, setShowDayPicker] = useState(false)
	const [rangeDateInputValue, setRangeDateInputValue] = useState('')
	const { t, lang } = useI18n(rangeInputJSON)
	const containerRef = useRef<HTMLDivElement>(null)

	useClickAway(containerRef, () => setShowDayPicker(false))

	useEffect(() => {
		if (state.startDate && !state.endDate) {
			setRangeDateInputValue(
				format(new Date(state.startDate), 'dd LLLL', { locale: lang === 'fr' ? fr : enUS })
			)
		} else if (state.startDate && state.endDate) {
			setRangeDateInputValue(
				`${format(new Date(state.startDate), 'dd LLLL', {
					locale: lang === 'fr' ? fr : enUS
				})} - ${format(new Date(state.endDate), 'dd LLLL', {
					locale: lang === 'fr' ? fr : enUS
				})}`
			)
		}
	}, [state, lang])

	function handleClear() {
		setRangeDateInputValue('')
		setState({ ...state, startDate: undefined, endDate: undefined })
		setShowDayPicker(false)
	}

	return (
		<FormControl
			position='relative'
			{...styles}
			boxSizing='border-box'
			isRequired={required}
			ref={containerRef}
		>
			{showClearBtn ? (
				<Flex align='center' justify='space-between'>
					<FormLabel htmlFor='dates'>{label}</FormLabel>
					{state.startDate || state.endDate ? (
						<Button size='xs' colorScheme='purple' height='20px' onClick={handleClear}>
							{t('clear')}
						</Button>
					) : null}
				</Flex>
			) : (
				<FormLabel htmlFor='dates'>{label}</FormLabel>
			)}

			<Input
				id='dates'
				type='text'
				variant='outline'
				value={rangeDateInputValue}
				isReadOnly={!(errors['startDate'] || errors['endDate'])}
				placeholder={placeholder}
				_hover={{ cursor: 'pointer' }}
				onClick={() => setShowDayPicker(true)}
				onKeyDown={(event) => keyValidation(event) && setShowDayPicker(true)}
				fontWeight={600}
				isInvalid={!!(errors['startDate'] || errors['endDate'])}
			/>
			{showErrorText && errors['startDate'] && !showDayPicker && (
				<FormHelperText>{errors['startDate']}</FormHelperText>
			)}
			{showErrorText && errors['endDate'] && !showDayPicker && (
				<FormHelperText>{errors['endDate']}</FormHelperText>
			)}

			{showDayPicker && (
				<>
					<RangeDayPicker
						state={state}
						setState={setState}
						closeFn={() => setShowDayPicker(false)}
						disabledDays={disabledDays}
						openTop={openTop}
						canChangeMonth={canChangeMonth}
					/>
				</>
			)}
		</FormControl>
	)
}
