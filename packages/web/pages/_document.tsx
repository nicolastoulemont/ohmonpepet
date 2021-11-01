import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GTAG_ID && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
							></script>
							<script
								dangerouslySetInnerHTML={{
									__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());

								gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');`
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<ColorModeScript initialColorMode='light' />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
