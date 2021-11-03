import dynamic from 'next/dynamic'
import { Layout } from 'components'
import React from 'react'
import { initializeWebApollo, GET_SPECIES_OPTIONS, GET_PARTNERS_WITH_RECEIPTS } from '@ohmonpepet/data'
import { Box } from '@chakra-ui/react'
import { listAsOptions } from 'utils'
import { isMobile } from 'react-device-detect'
import { generateArticleList } from 'scripts/generate-article-list'
import {
	CTA,
	Arguments,
	Search,
	SearchMobile,
	HowItWorks,
	Partners,
	BlogShortList
} from 'layouts/root'

const IntroductionDesktop = dynamic(
	() => import('layouts/root/IntroductionDesktop').then((mod) => mod.IntroductionDesktop),
	{ ssr: false }
)
const IntroductionMobile = dynamic(
	() => import('layouts/root/IntroductionMobile').then((mod) => mod.IntroductionMobile),
	{ ssr: false }
)

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeWebApollo()

	const queries = [GET_SPECIES_OPTIONS, GET_PARTNERS_WITH_RECEIPTS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})

	const result = await Promise.all(queries)

	const [{ species }, { partners }] = result

	const speciesOptions = listAsOptions(species?.species, locale) || []

	const articleList = generateArticleList()

	return {
		props: {
			speciesOptions,
			partnersList: partners.partners,
			articleList: articleList.slice(0, 2)
		}
	}
}

export default function IndexPage({ speciesOptions, partnersList, articleList }) {
	return (
		<Layout>
			<CTA />
			{isMobile ? (
				<SearchMobile speciesOptions={speciesOptions} />
			) : (
				<Search speciesOptions={speciesOptions} />
			)}

			<Box as='article' width='100%'>
				<Arguments />
				<Partners partnersList={partnersList} />
				<BlogShortList articles={articleList} />
				<HowItWorks />
				{isMobile ? <IntroductionMobile /> : <IntroductionDesktop />}
			</Box>
		</Layout>
	)
}
