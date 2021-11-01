import { Box, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { formatISO, format } from 'date-fns'
import React from 'react'
import { shadowSm } from 'theme/colors'
import { useI18n } from 'utils/hooks/useI18n'
import { fr, enUS } from 'date-fns/locale'
import NextLink from 'next/link'
import { BlogMetaDataWithSlug } from 'blog/utils'

export default function ArticleLink({ post }: { post: BlogMetaDataWithSlug }) {
	const { lang } = useI18n()
	return (
		<LinkBox
			as='article'
			display='flex'
			flexDir='column'
			alignItems='flex-start'
			justifyContent='flex-start'
			borderRadius='10px'
			transition='box-shadow 0.3s ease-in-out'
			p={6}
			_hover={{ boxShadow: shadowSm }}
		>
			<Image
				src={post.thumbnail.url}
				fallbackSrc={post.thumbnail.url}
				alt={post.thumbnail.alt}
				width='100%'
				height='auto'
				maxHeight='200px'
				objectFit='cover'
				borderRadius='10px'
				mb={2}
			/>
			<Box width='100%'>
				<Text
					as='time'
					dateTime={formatISO(new Date(post.publicationDate))}
					fontSize='md'
					color='gray.600'
				>
					{format(new Date(post.publicationDate), 'dd MMMM yyyy', {
						locale: lang === 'fr' ? fr : enUS
					})}
				</Text>
				<Heading as='h2' my={2} size='md'>
					<NextLink href={post.slug} passHref>
						<LinkOverlay>{post.title}</LinkOverlay>
					</NextLink>
				</Heading>
				<Text color='gray.600'>{post.snippet}</Text>
			</Box>
		</LinkBox>
	)
}
