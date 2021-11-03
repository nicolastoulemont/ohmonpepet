import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import genderJSON from 'statics/admin/gender.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { GenderList } from 'layouts/admin/gender/GenderList'
import { AddGender } from 'layouts/admin/gender/AddGender'

export default function AdminGenders() {
	const { t } = useI18n(genderJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<GenderList />
				<AddGender />
			</Grid>
		</Layout>
	)
}
