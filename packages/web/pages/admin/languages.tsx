import { Layout } from 'components'
import React from 'react'
import { Heading, Flex, Grid } from '@chakra-ui/react'
import languageJSON from 'statics/admin/language.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { LanguageList } from 'layouts/admin/language/LanguageList'
import { AddLanguage } from 'layouts/admin/language/AddLanguage'

export default function AdminLanguages() {
	const { t } = useI18n(languageJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<LanguageList />
				<AddLanguage />
			</Grid>
		</Layout>
	)
}
