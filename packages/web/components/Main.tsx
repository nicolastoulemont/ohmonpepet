import React, { useEffect, useState } from 'react'
import { useColorMode, Box } from '@chakra-ui/react'
import { color, panelBgColor } from 'theme/colors'
import { Header } from './Header'
import { Footer } from './Footer'
import { AcceptCookies } from 'layouts/shared/AcceptCookies'
import { getPreferencesCookie } from 'utils/cookies'

export const Main = ({ children, maxWidth, headerFocusComponent }) => {
	const [showAcceptCookies, setShowAcceptCookies] = useState(false)
	const { colorMode } = useColorMode()
	const consentCookie = getPreferencesCookie()

	useEffect(() => {
		if (!consentCookie && !showAcceptCookies) {
			setShowAcceptCookies(true)
		} else if (consentCookie && showAcceptCookies) {
			setShowAcceptCookies(false)
		}

		if (consentCookie) {
			const { consent } = consentCookie
			if (consent === 'no-consent') {
				window[`ga-disable-${process.env.NEXT_PUBLIC_GTAG_ID}`] = true
			}
		}
	}, [consentCookie])

	return (
		<>
			<Header maxWidth={maxWidth}>{headerFocusComponent}</Header>
			<Box
				as='main'
				color={color[colorMode]}
				backgroundColor={panelBgColor[colorMode]}
				width='100%'
				minH='calc(100vh - 60px)'
				height='auto'
			>
				<Box
					width='100%'
					minHeight='calc(100% - 60px)'
					height='auto'
					maxWidth={maxWidth}
					margin='0 auto'
					p={{ base: 3, sm: 6 }}
					boxSizing='border-box'
				>
					{children}
				</Box>
				<AcceptCookies
					showAcceptCookies={showAcceptCookies}
					setShowAcceptCookies={setShowAcceptCookies}
				/>
			</Box>
			<Footer maxWidth={maxWidth} />
		</>
	)
}
