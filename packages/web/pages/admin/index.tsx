import { Layout } from 'components'
import React from 'react'
import { Heading, Flex, Grid } from '@chakra-ui/react'
import dashboardJSON from 'statics/admin/dashboard.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { Users, Bookings, PetSitters, CronsControl } from 'layouts/admin/dashboard'

export default function Admin() {
	const { t } = useI18n(dashboardJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Flex
				width='100%'
				align='center'
				justify='flex-start'
				flexDir={{ base: 'column', md: 'row' }}
			>
				<Heading as='h1'>{t('dashboardTitle')}</Heading>
				<CronsControl />
			</Flex>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<Users />
				<Bookings />
				<PetSitters />
			</Grid>
		</Layout>
	)
}
