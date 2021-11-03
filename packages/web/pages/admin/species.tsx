import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import specieJSON from 'statics/admin/specie.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { AddSpecie } from 'layouts/admin/specie/AddSpecie'
import { SpecieList } from 'layouts/admin/specie/SpecieList'

export default function AdminSpecies() {
	const { t } = useI18n(specieJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={6} mt={3}>
				<SpecieList />
				<AddSpecie />
			</Grid>
		</Layout>
	)
}
