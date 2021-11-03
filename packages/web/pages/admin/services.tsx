import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import serviceJSON from 'statics/admin/service.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { ServiceList } from 'layouts/admin/service/ServiceList'
import { AddService } from 'layouts/admin/service/AddService'

export default function AdminServices() {
	const { t } = useI18n(serviceJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<ServiceList />
				<AddService />
			</Grid>
		</Layout>
	)
}
