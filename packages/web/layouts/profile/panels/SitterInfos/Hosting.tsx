import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import { Flex, FormControl, FormHelperText, FormLabel, Select } from '@chakra-ui/react'
import { MultiSelect } from 'components'

export default function Hosting({
	state,
	setState,
	errors,
	handleChange,
	hostingsOptions,
	speciesOptions
}) {
	const { t } = useI18n(profileJson)
	return (
		<Flex mb={[6, 6, 6, 12]} flexDir={['column', 'column', 'column', 'row']}>
			<FormControl flex='1' mb={[6, 6, 6, 0]}>
				<FormLabel htmlFor='hostingId'>{t('hostingLabel')}</FormLabel>
				<Select
					id='hostingId'
					name='hostingId'
					value={state['hostingId'] || ''}
					aria-describedby='hosting'
					variant='outline'
					onChange={handleChange}
					isInvalid={!!errors['hostingId']}
					placeholder={t('hostingPlaceholder')}
					isRequired
				>
					{hostingsOptions.map((hosting) => (
						<option key={hosting.key} value={hosting.value}>
							{hosting.text}
						</option>
					))}
				</Select>
				<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
			</FormControl>
			<MultiSelect
				name='acceptedAnimalsIds'
				placeholder={t('acceptedAnimalsLabel')}
				options={speciesOptions}
				state={state['acceptedAnimalsIds']}
				setState={setState}
				errors={errors}
				label={t('acceptedAnimalsLabel')}
				type='text'
				containerWidth='100%'
				styles={{ mb: [6, 6, 6, 0], ml: [0, 0, 0, 6] }}
				required
				helperText={t('mandatorySitterField')}
			/>
			<MultiSelect
				name='ownAnimalsIds'
				placeholder={t('ownanimalsLabel')}
				options={speciesOptions}
				state={state['ownAnimalsIds']}
				setState={setState}
				errors={errors}
				label={t('ownanimalsLabel')}
				type='text'
				containerWidth='100%'
				styles={{ ml: [0, 0, 0, 6] }}
			/>
		</Flex>
	)
}
