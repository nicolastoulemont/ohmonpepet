import React, { useState, useEffect } from 'react'
import { Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useI18n } from 'utils/hooks/useI18n'
import rangeInputJSON from 'statics/components/rangeInput.json'
import { RangeMobileDayPicker } from './DayPickers/RangeMobile'

interface RangeInputMobileProps {
	state: any
	setState: React.Dispatch<
		React.SetStateAction<{
			[key: string]: any
		}>
	>
	errors: { [key: string]: string }
	placeholder: string
	disabledDays?: Array<string>
	openTop?: boolean
	label?: string
	canChangeMonth?: boolean
	showErrorText?: boolean
	showClearBtn?: boolean
	inputSize?: 'lg' | 'md' | 'sm' | 'xs'
}

export function RangeInputMobile({
	state,
	setState,
	errors,
	placeholder,
	disabledDays,
	label,
	openTop = false,
	canChangeMonth = true,
	showClearBtn = false,
	inputSize = 'lg'
}: RangeInputMobileProps) {
	const [rangeDateInputValue, setRangeDateInputValue] = useState('')
	const { t, lang } = useI18n(rangeInputJSON)

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
	}

	return (
		<>
			{label ? (
				<>
					{showClearBtn ? (
						<Flex align='center' justify='space-between'>
							<FormLabel htmlFor='dates'>{label}</FormLabel>
							{state.startDate || state.endDate ? (
								<Button
									size='xs'
									colorScheme='purple'
									height='20px'
									onClick={handleClear}
								>
									{t('clear')}
								</Button>
							) : null}
						</Flex>
					) : (
						<FormLabel htmlFor='dates'>{label}</FormLabel>
					)}
				</>
			) : null}
			<Input
				type='text'
				size={inputSize}
				variant='outline'
				value={rangeDateInputValue}
				isReadOnly={!(errors['startDate'] || errors['endDate'])}
				placeholder={placeholder}
				_hover={{ cursor: 'pointer' }}
				fontWeight={600}
				isInvalid={!!(errors['startDate'] || errors['endDate'])}
			/>

			<RangeMobileDayPicker
				state={state}
				setState={setState}
				closeFn={() => {}}
				disabledDays={disabledDays}
				openTop={openTop}
				canChangeMonth={canChangeMonth}
			/>
		</>
	)
}
