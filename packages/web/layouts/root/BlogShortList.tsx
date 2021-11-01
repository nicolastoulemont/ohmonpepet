import React from 'react'
import { Grid, Heading, Box, Link, Flex } from '@chakra-ui/react'
import { BlogMetaDataWithSlug } from 'blog/utils'
import rootJSON from 'statics/root.json'
import { useI18n } from 'utils/hooks/useI18n'
import ArticleLink from 'layouts/shared/ArticleLink'
import NextLink from 'next/link'

interface BlogShortListProps {
	articles: Array<BlogMetaDataWithSlug>
}

export function BlogShortList({ articles }: BlogShortListProps) {
	const { t } = useI18n(rootJSON)

	return (
		<Box width='100%' my={12} as='section'>
			<Heading as='h2' size='2xl' textAlign='center' mb={6}>
				{t('BlogShortListTitle')}
			</Heading>
			<Grid
				as='section'
				templateColumns={{
					base: 'repeat(1,1fr)',
					md: 'repeat(2,1fr)'
				}}
				gap={6}
				mb={6}
			>
				{articles.map((post) => (
					<ArticleLink key={post.slug} post={post} />
				))}
			</Grid>
			<Flex align='center' justify='center'>
				<NextLink href='/articles' passHref>
					<Link color='gray.500'>{t('BlogShortListAllArticlesLink')}</Link>
				</NextLink>
			</Flex>
		</Box>
	)
}
