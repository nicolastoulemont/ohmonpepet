import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { Checkbox, Flex } from '@chakra-ui/react'

interface AtOwnerHomeDayFilterProps {
	state: {
		[key: string]: any
	}
	handleCheckBoxes: (name: string, checked: boolean) => void
}

export function AtOwnerHomeDayFilters({ state, handleCheckBoxes }: AtOwnerHomeDayFilterProps) {
	const { t } = useI18n(searchJSON)

	return (
		<Flex flexDir='column' align='flex-start' justify='flex-start' width='100%'>
			<Checkbox
				mb={2}
				isChecked={state['atOwnerHomePlantsCare']}
				onChange={(e) => handleCheckBoxes('atOwnerHomePlantsCare', e.target.checked)}
			>
				{t('atOwnerHomePlantsCare')}
			</Checkbox>

			<Checkbox
				mb={2}
				isChecked={state['atOwnerHomeMail']}
				onChange={(e) => handleCheckBoxes('atOwnerHomeMail', e.target.checked)}
			>
				{t('atOwnerHomeMail')}
			</Checkbox>
			<Checkbox
				mb={2}
				isChecked={state['atOwnerHomeCurtains']}
				onChange={(e) => handleCheckBoxes('atOwnerHomeCurtains', e.target.checked)}
			>
				{t('atOwnerHomeCurtains')}
			</Checkbox>
		</Flex>
	)
}
