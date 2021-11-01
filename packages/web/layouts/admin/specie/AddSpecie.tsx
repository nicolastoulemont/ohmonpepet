import React, { useState } from 'react'
import specieJSON from 'statics/admin/specie.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useCreateSpeciesMutation } from 'generated/graphql'
import { GET_SPECIES } from 'graphql/species/query'

const initialValues = { fr: '', en: '' }

export function AddSpecie() {
	const [name, setName] = useState(initialValues)
	const { t } = useI18n(specieJSON)

	const [createSpecie, { loading }] = useCreateSpeciesMutation({
		variables: { input: { name } },
		refetchQueries: [{ query: GET_SPECIES }]
	})

	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		const { data } = await createSpecie()
		if (data?.createSpecies?.specie) {
			setName(initialValues)
		}
	}
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='30vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
			as='form'
			onSubmit={handleSubmit}
		>
			<Heading as='h2' size='md' mb={2}>
				{t('addSpecieTitle')}
			</Heading>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addSpecieLabelFr')}</FormLabel>
				<Input
					type='text'
					name='name.fr'
					value={name.fr || ''}
					onChange={(e) => setName((name) => ({ ...name, fr: e.target.value }))}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addSpecieLabelEn')}</FormLabel>
				<Input
					type='text'
					name='name.en'
					value={name.en || ''}
					onChange={(e) => setName((name) => ({ ...name, en: e.target.value }))}
				/>
			</FormControl>
			<Button mt={3} onClick={handleSubmit} isLoading={loading}>
				{t('addSpecieBtn')}
			</Button>
		</Flex>
	)
}
