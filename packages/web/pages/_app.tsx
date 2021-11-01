import { ApplicationWideQueryAndSubscriptions } from 'components/ApplicationWideSubscriptions'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { useWebApollo, ApolloProvider } from '@ohmonpepet/data'
import { generateNextSeoProps } from 'next-seo.config'
import { useGtag } from 'lib'

function MyApp({ Component, pageProps }) {
	const apolloClient = useWebApollo(pageProps.initialApolloState)
	const { locale } = useRouter()
	const SEO = generateNextSeoProps(locale as 'fr' | 'en')
	useGtag()

	return (
		<>
			<Head>
				<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff'></meta>
			</Head>
			<DefaultSeo {...SEO} />
			<ChakraProvider resetCSS={true}>
				<ApolloProvider client={apolloClient}>
					<ApplicationWideQueryAndSubscriptions>
						<Component {...pageProps} />
					</ApplicationWideQueryAndSubscriptions>
				</ApolloProvider>
			</ChakraProvider>
		</>
	)
}

export default MyApp
