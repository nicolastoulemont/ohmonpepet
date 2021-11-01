import React, { useState } from 'react'
import serviceJSON from 'statics/admin/service.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useCreateServiceMutation } from 'generated/graphql'
import { GET_SERVICES } from 'graphql/service/query'

const initialValues = { fr: '', en: '' }

export function AddService() {
	const [name, setName] = useState(initialValues)
	const [alternateName, setAlternateName] = useState(initialValues)
	const [queryKey, setQueryKey] = useState('')
	const { t } = useI18n(serviceJSON)

	const [createService, { loading }] = useCreateServiceMutation({
		variables: { input: { name, alternateName, queryKey } },
		refetchQueries: [{ query: GET_SERVICES }]
	})

	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		const { data } = await createService()
		if (data?.createService?.service) {
			setName(initialValues)
			setQueryKey('')
		}
	}
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='auto'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
			as='form'
			onSubmit={handleSubmit}
		>
			<Heading as='h2' size='md' mb={2}>
				{t('addServiceTitle')}
			</Heading>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addServiceLabelFr')}</FormLabel>
				<Input
					type='text'
					name='name.fr'
					value={name.fr || ''}
					onChange={(e) => setName((name) => ({ ...name, fr: e.target.value }))}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addServiceLabelEn')}</FormLabel>
				<Input
					type='text'
					name='name.en'
					value={name.en || ''}
					onChange={(e) => setName((name) => ({ ...name, en: e.target.value }))}
				/>
			</FormControl>
			<FormControl my={3}>
				<FormLabel>{t('addServiceLabelAlternateFr')}</FormLabel>
				<Input
					type='text'
					name='alternateName.fr'
					value={alternateName.fr || ''}
					onChange={(e) =>
						setAlternateName((alternateName) => ({
							...alternateName,
							fr: e.target.value
						}))
					}
				/>
			</FormControl>
			<FormControl my={3}>
				<FormLabel>{t('addServiceLabelAlternateEn')}</FormLabel>
				<Input
					type='text'
					name='alternateName.en'
					value={alternateName.en || ''}
					onChange={(e) =>
						setAlternateName((alternateName) => ({
							...alternateName,
							en: e.target.value
						}))
					}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addServiceQueryKey')}</FormLabel>
				<Input
					type='text'
					name='queryKey'
					value={queryKey}
					onChange={(e) => setQueryKey(e.target.value)}
				/>
			</FormControl>
			<Button mt={3} onClick={handleSubmit} isLoading={loading}>
				{t('addServiceBtn')}
			</Button>
		</Flex>
	)
}
