import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { Checkbox, Flex } from '@chakra-ui/react'

interface GenericFiltersProps {
	state: {
		[key: string]: any
	}
	handleCheckBoxes: (name: string, checked: boolean) => void
}

export function GenericFilters({ state, handleCheckBoxes }: GenericFiltersProps) {
	const { t } = useI18n(searchJSON)

	return (
		<Flex flexDir='column' align='flex-start' justify='flex-start' width='100%'>
			<Checkbox
				mb={2}
				isChecked={state['flexibleCancelation']}
				onChange={(e) => handleCheckBoxes('flexibleCancelation', e.target.checked)}
			>
				{t('flexibleCancelation')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['abilityToProvideMedicalCare']}
				onChange={(e) => handleCheckBoxes('abilityToProvideMedicalCare', e.target.checked)}
			>
				{t('abilityToProvideMedicalCare')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['acceptShortNotice']}
				onChange={(e) => handleCheckBoxes('acceptShortNotice', e.target.checked)}
			>
				{t('acceptShortNotice')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['professionalPetSitter']}
				onChange={(e) => handleCheckBoxes('professionalPetSitter', e.target.checked)}
			>
				{t('professionalPetSitter')}
			</Checkbox>
		</Flex>
	)
}
