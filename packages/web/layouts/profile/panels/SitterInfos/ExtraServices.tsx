import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import { Heading, Flex, Checkbox } from '@chakra-ui/react'

export default function ExtraServices({ state, handleCheckBoxes }) {
	const { t } = useI18n(profileJson)
	return (
		<>
			<Heading mb={6} size='md'>
				{t('extraServices')}
			</Heading>
			<Flex mb={[6, 6, 6, 12]} width='100%' flexDir='column'>
				<Checkbox
					my={1}
					isChecked={state['flexibleCancelation'] || false}
					onChange={(e) => handleCheckBoxes('flexibleCancelation', e.target.checked)}
				>
					{t('flexibleCancelation')}
				</Checkbox>
				<Checkbox
					my={1}
					isChecked={state['abilityToProvideMedicalCare'] || false}
					onChange={(e) =>
						handleCheckBoxes('abilityToProvideMedicalCare', e.target.checked)
					}
				>
					{t('abilityToProvideMedicalCare')}
				</Checkbox>
				<Checkbox
					my={1}
					isChecked={state['acceptShortNotice'] || false}
					onChange={(e) => handleCheckBoxes('acceptShortNotice', e.target.checked)}
				>
					{t('acceptShortNotice')}
				</Checkbox>
				<Checkbox
					my={1}
					isChecked={state['professionalPetSitter'] || false}
					onChange={(e) => handleCheckBoxes('professionalPetSitter', e.target.checked)}
				>
					{t('professionalPetSitter')}
				</Checkbox>
			</Flex>
		</>
	)
}
