import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import dashboardJSON from 'statics/admin/dashboard.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { PartnerList } from 'layouts/admin/partner/PartnerList'
import { AddPartner } from 'layouts/admin/partner/AddPartner'

export default function AdminGenders() {
	const { t } = useI18n(dashboardJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('dashboardTitle')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<PartnerList />
				<AddPartner />
			</Grid>
		</Layout>
	)
}
