import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import { Flex, FormControl, Heading, FormLabel, FormHelperText } from '@chakra-ui/react'
import { MultiRangesDayPicker } from 'components'
import { useDimensions } from 'utils/hooks'

export default function Availability({ state, setState }) {
	const { t } = useI18n(profileJson)
	const [width] = useDimensions()

	return (
		<>
			<Heading mb={6} size='md'>
				{t('availabilityTitle')}
			</Heading>
			<Flex mb={[6, 6, 6, 12]}>
				<FormControl flex='1' isRequired>
					<FormLabel htmlFor='availability'>{t('availabilityLabel')}</FormLabel>
					<FormHelperText id='vailability-helper-text'>
						{t('availabilityHelper')}
					</FormHelperText>
					<MultiRangesDayPicker
						parentState={state}
						setParentState={setState}
						name='availability'
						numberOfMonths={!width || width > 900 ? 4 : 2}
					/>
				</FormControl>
			</Flex>
		</>
	)
}
