import React, { useState } from 'react'
import partnerJSON from 'statics/admin/partner.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/react'
import { useCreatePartnerMutation } from 'generated/graphql'
import { GET_PARTNERS } from 'graphql/partners/query'

const initialValues = {
	name: '',
	description: '',
	websiteUrl: '',
	logoUrl: ''
}

export function AddPartner() {
	const [fields, setFields] = useState(initialValues)

	const { t } = useI18n(partnerJSON)

	const [createLanguage, { loading }] = useCreatePartnerMutation({
		variables: { input: fields },
		refetchQueries: [{ query: GET_PARTNERS }]
	})

	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		const { data } = await createLanguage()
		if (data?.createPartner?.partner) {
			setFields(initialValues)
		}
	}
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='50vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
			as='form'
			onSubmit={handleSubmit}
		>
			<Heading as='h2' size='md' mb={2}>
				{t('addPartnerTitle')}
			</Heading>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addPartnerName')}</FormLabel>
				<Input
					type='text'
					name='name'
					value={fields.name || ''}
					onChange={(e) => setFields({ ...fields, name: e.target.value })}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addPartnerWebsite')}</FormLabel>
				<Input
					type='text'
					name='websiteUrl'
					value={fields.websiteUrl || ''}
					onChange={(e) => setFields({ ...fields, websiteUrl: e.target.value })}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addPartnerLogo')}</FormLabel>
				<Input
					type='text'
					name='logoUrl'
					value={fields.logoUrl || ''}
					onChange={(e) => setFields({ ...fields, logoUrl: e.target.value })}
				/>
			</FormControl>
			<FormControl isRequired my={3}>
				<FormLabel>{t('addPartnerDescription')}</FormLabel>
				<Textarea
					type='text'
					name='description'
					value={fields.description || ''}
					onChange={(e) => setFields({ ...fields, description: e.target.value })}
				/>
			</FormControl>
			<Button mt={3} onClick={handleSubmit} isLoading={loading}>
				{t('addPartnerBtn')}
			</Button>
		</Flex>
	)
}
