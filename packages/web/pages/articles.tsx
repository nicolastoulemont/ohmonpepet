import { Layout } from 'components'
import React from 'react'
import { Flex, Heading, Image, Text, Link, Box, Grid, LinkBox, LinkOverlay } from '@chakra-ui/react'
import articlesJSON from 'statics/articles.json'
import { useI18n } from 'utils/hooks/useI18n'
import { format, formatISO } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import { generateArticleList } from 'scripts/generate-article-list'
import { BlogMetaDataWithSlug } from 'blog/utils'
import { shadowSm } from 'theme/colors'
import ArticleLink from 'layouts/shared/ArticleLink'

export async function getStaticProps() {
	const articleList = generateArticleList()
	return {
		props: {
			articleList
		}
	}
}

type ArticlePageProps = {
	articleList: Array<BlogMetaDataWithSlug>
}

export default function ArticlesPage({ articleList }: ArticlePageProps) {
	const { t, lang } = useI18n(articlesJSON)

	const [first, ...rest] = articleList
	return (
		<Layout>
			<NextSeo title='Ohmonpepet | News' />
			<Heading as='h1'>{t('title')}</Heading>
			{first ? (
				<LinkBox
					as='article'
					width='100%'
					display='flex'
					alignItems='flex-start'
					justifyContent='space-between'
					my={6}
					flexDir={{ base: 'column', md: 'row' }}
					borderRadius='10px'
					transition='box-shadow 0.3s ease-in-out'
					p={6}
					_hover={{ boxShadow: shadowSm }}
				>
					<Image
						src={first.thumbnail.url}
						fallbackSrc={first.thumbnail.url}
						alt={first.thumbnail.alt}
						width={{ base: '100%', md: '50%' }}
						height='auto'
						maxHeight='350px'
						objectFit='cover'
						borderRadius='10px'
						mb={{ base: 3, md: 0 }}
					/>
					<Flex width={{ base: '100%', md: '45%' }} align='stretch' flexDir='column'>
						<Text
							as='time'
							dateTime={formatISO(new Date(first.publicationDate))}
							fontSize='lg'
							color='gray.600'
						>
							{format(new Date(first.publicationDate), 'dd MMMM yyyy', {
								locale: lang === 'fr' ? fr : enUS
							})}
						</Text>
						<Heading as='h2' my={2}>
							<NextLink href={first.slug} passHref>
								<LinkOverlay>{first.title}</LinkOverlay>
							</NextLink>
						</Heading>
						<Text color='gray.600'>{first.snippet}</Text>
					</Flex>
				</LinkBox>
			) : null}

			<Heading as='h2'>{t('subTitle')}</Heading>
			<Grid
				as='section'
				templateColumns={{
					base: 'repeat(1,1fr)',
					sm: 'repeat(2,1fr)',
					md: 'repeat(3,1fr)'
				}}
				gap={6}
				my={6}
			>
				{rest &&
					rest.length > 0 &&
					rest.map((post) => <ArticleLink key={post.slug} post={post} />)}
			</Grid>
		</Layout>
	)
}
