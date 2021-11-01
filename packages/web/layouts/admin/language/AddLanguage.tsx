import React, { useState } from 'react'
import languageJSON from 'statics/admin/language.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useCreateLanguageMutation } from 'generated/graphql'
import { GET_LANGUAGES } from 'graphql/language/query'

const initialValues = { fr: '', en: '' }

export function AddLanguage() {
	const [name, setName] = useState(initialValues)
	const { t } = useI18n(languageJSON)

	const [createLanguage, { loading }] = useCreateLanguageMutation({
		variables: { input: { name } },
		refetchQueries: [{ query: GET_LANGUAGES }]
	})

	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		const { data } = await createLanguage()
		if (data?.createLanguage?.language) {
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
				{t('addLanguageTitle')}
			</Heading>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addLanguageLabelFr')}</FormLabel>
				<Input
					type='text'
					name='name.fr'
					value={name.fr || ''}
					onChange={(e) => setName((name) => ({ ...name, fr: e.target.value }))}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addLanguageLabelEn')}</FormLabel>
				<Input
					type='text'
					name='name.en'
					value={name.en || ''}
					onChange={(e) => setName((name) => ({ ...name, en: e.target.value }))}
				/>
			</FormControl>
			<Button mt={3} onClick={handleSubmit} isLoading={loading}>
				{t('addLanguageBtn')}
			</Button>
		</Flex>
	)
}
