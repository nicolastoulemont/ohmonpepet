import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'urql'
import { webClient, webSsrCache } from '@ohmonpepet/data'
function MyApp({ Component, pageProps }) {
	if (pageProps.urqlState) {
		webSsrCache.restoreData(pageProps.urqlState)
	}

	return (
		<Provider value={webClient}>
			<ChakraProvider resetCSS={true}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default MyApp
