import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import hostingJSON from 'statics/admin/hosting.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { AddHosting } from 'layouts/admin/hosting/AddHosting'
import { HostingList } from 'layouts/admin/hosting/HostingList'

export default function AdminHostings() {
	const { t } = useI18n(hostingJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<HostingList />
				<AddHosting />
			</Grid>
		</Layout>
	)
}
