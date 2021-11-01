import React, { useState } from 'react'
import hostingJSON from 'statics/admin/hosting.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useCreateHostingMutation } from 'generated/graphql'
import { GET_HOSTINGS } from 'graphql/hosting/query'

const initialValues = { fr: '', en: '' }

export function AddHosting() {
	const [name, setName] = useState(initialValues)
	const { t } = useI18n(hostingJSON)

	const [createHosting, { loading }] = useCreateHostingMutation({
		variables: { input: { name } },
		refetchQueries: [{ query: GET_HOSTINGS }]
	})

	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		const { data } = await createHosting()
		if (data?.createHosting?.hosting) {
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
				{t('addHostingTitle')}
			</Heading>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addHostingLabelFr')}</FormLabel>
				<Input
					type='text'
					name='name.fr'
					value={name.fr || ''}
					onChange={(e) => setName((name) => ({ ...name, fr: e.target.value }))}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addHostingLabelEn')}</FormLabel>
				<Input
					type='text'
					name='name.en'
					value={name.en || ''}
					onChange={(e) => setName((name) => ({ ...name, en: e.target.value }))}
				/>
			</FormControl>
			<Button mt={3} onClick={handleSubmit} isLoading={loading}>
				{t('addHostingBtn')}
			</Button>
		</Flex>
	)
}
