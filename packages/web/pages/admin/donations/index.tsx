import { Layout } from 'components'
import React from 'react'
import { Heading, Grid } from '@chakra-ui/react'
import donationsJSON from 'statics/admin/donations.json'
import { useI18n } from 'utils/hooks/useI18n'
import { useAdminOrRedirect } from 'utils/hooks/useAdmin'
import { AddDonationReceipt } from 'layouts/admin/donations/AddDonationReceipt'
import { DonationsList } from 'layouts/admin/donations/DonationsList'

import { GET_PARTNERS } from 'graphql/partners/query'
import { initializeApollo } from 'lib'
import { listAsOptions } from 'utils'
import { ReceiptsList } from 'layouts/admin/donations/ReceiptsList'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_PARTNERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const [{ partners }] = await Promise.all(queries)

	const partnersOptions = listAsOptions(partners?.partners, locale) || []

	return {
		props: {
			partnersOptions
		}
	}
}

export default function AdminDonations({ partnersOptions }) {
	const { t } = useI18n(donationsJSON)
	useAdminOrRedirect()

	return (
		<Layout maxWidth='none'>
			<Heading as='h1'>{t('title')}</Heading>
			<Grid
				templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(2,1fr)' }}
				gap={6}
				mt={3}
				boxSizing='border-box'
			>
				<AddDonationReceipt partnersOptions={partnersOptions} />
				<ReceiptsList partnersOptions={partnersOptions} />
				<DonationsList partnersOptions={partnersOptions} />
			</Grid>
		</Layout>
	)
}
