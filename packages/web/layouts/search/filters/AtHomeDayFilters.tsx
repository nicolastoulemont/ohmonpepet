import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { Checkbox, Flex } from '@chakra-ui/react'

interface AtHomeDayFilterProps {
	state: {
		[key: string]: any
	}
	handleCheckBoxes: (name: string, checked: boolean) => void
}

export function AtHomeDayFilters({ state, handleCheckBoxes }: AtHomeDayFilterProps) {
	const { t } = useI18n(searchJSON)

	return (
		<Flex flexDir='column' align='flex-start' justify='flex-start' width='100%'>
			<Checkbox
				mb={2}
				isChecked={state['atHomeExclusivity']}
				onChange={(e) => handleCheckBoxes('atHomeExclusivity', e.target.checked)}
			>
				{t('atHomeExclusivity')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['atHomeContinuously']}
				onChange={(e) => handleCheckBoxes('atHomeContinuously', e.target.checked)}
			>
				{t('atHomeContinuously')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['atHomeOnlyBringPet']}
				onChange={(e) => handleCheckBoxes('atHomeOnlyBringPet', e.target.checked)}
			>
				{t('atHomeOnlyBringPet')}
			</Checkbox>
			<Checkbox
				mb={2}
				value={state['atHomeComeGetPet']}
				onChange={(e) => handleCheckBoxes('atHomeComeGetPet', e.target.checked)}
			>
				{t('atHomeComeGetPet')}
			</Checkbox>
		</Flex>
	)
}
