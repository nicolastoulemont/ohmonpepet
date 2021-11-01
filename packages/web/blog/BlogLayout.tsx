import React, { useMemo } from 'react'
import { NextSeo, BlogJsonLd } from 'next-seo'
import { chakra } from '@chakra-ui/react'
import { Header } from 'components/Header'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { formatISO } from 'date-fns'
import { MDXWithChakraProvider } from './MDXWithChakraProvider'
import { BlogMetaData } from './utils'
const MotionBox = chakra(motion.div)

interface BlogLayoutProps {
	children: React.ReactNode
	frontMatter: BlogMetaData
}

export default function BlogLayout({ children, frontMatter }: BlogLayoutProps) {
	const domain = process.env.NEXT_PUBLIC_DOMAIN_URL
	const { description, publicationDate, title, images, modificationDate } = frontMatter
	const { asPath } = useRouter()
	const canonical = asPath === '/' ? `${domain}` : `${domain}${asPath}`

	const JSON_LD_IMAGES_URLS = useMemo(
		() => (images?.length > 0 ? images.map((img) => img.url) : []),
		[images]
	)
	const ISO_PUBLICATION_DATE = formatISO(new Date(publicationDate))
	const ISO_MODIFICATION_DATE = modificationDate
		? formatISO(new Date(modificationDate))
		: undefined

	return (
		<>
			<NextSeo
				title={title}
				description={description}
				openGraph={{
					description: description,
					url: canonical,
					title: title,
					type: 'article',
					article: {
						publishedTime: ISO_PUBLICATION_DATE,
						modifiedTime: ISO_MODIFICATION_DATE
					},
					images
				}}
				canonical={canonical}
			/>
			<BlogJsonLd
				url={canonical}
				title={title}
				images={JSON_LD_IMAGES_URLS}
				datePublished={ISO_PUBLICATION_DATE}
				dateModified={ISO_MODIFICATION_DATE}
				authorName='Ohmonpepet'
				description={description}
			/>
			<style jsx global>
				{`
					* {
						box-sizing: border-box;
					}

					html,
					body,
					#__next {
						height: 100%;
						width: 100%;
					}
				`}
			</style>
			<Header maxWidth='1250px'>{undefined}</Header>
			<MotionBox
				as='main'
				width='100%'
				px={{ base: 4, sm: 6 }}
				minHeight='calc(100% - 60px)'
				height='auto'
				maxWidth='1250px'
				margin='0 auto'
				initial={{ opacity: 0.5 }}
				animate={{ opacity: 1 }}
			>
				<MDXWithChakraProvider>{children}</MDXWithChakraProvider>
			</MotionBox>
		</>
	)
}
