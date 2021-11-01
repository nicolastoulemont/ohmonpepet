import React, { useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import acceptCookiesJSON from 'statics/components/acceptCookies.json'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { setPreferencesCookie } from 'utils/cookies'
import { RemoveScroll } from 'react-remove-scroll'
import {
	Flex,
	Text,
	Button,
	Link,
	chakra,
	Heading,
	Box,
	Divider,
	Switch,
	FormControl,
	FormLabel
} from '@chakra-ui/react'
const MotionFlex = chakra(motion.div)

export function AcceptCookies({ showAcceptCookies, setShowAcceptCookies }) {
	const [showGoogleAnalytics, setShowGoogleAnalytics] = useState(false)
	const [acceptGoogleAnalytics, setAcceptGoogleAnalytics] = useState(false)
	const { t } = useI18n(acceptCookiesJSON)

	function handleCookiesAcceptance() {
		if (showGoogleAnalytics && !acceptGoogleAnalytics) {
			setPreferencesCookie({ consent: 'no-consent', date: Date.now() })
			if (process.env.NODE_ENV === 'production') {
				window[`ga-disable-${process.env.NEXT_PUBLIC_GTAG_ID}`] = true
			}
		} else {
			setPreferencesCookie({ consent: 'consent', date: Date.now() })
		}
		setShowAcceptCookies(false)
	}

	return (
		<AnimatePresence>
			{showAcceptCookies && (
				<RemoveScroll>
					<MotionFlex
						zIndex={100}
						position='fixed'
						initial={{ bottom: '-20px', opacity: 0 }}
						animate={{ bottom: '20px', opacity: 1 }}
						exit={{ bottom: '-20px', opacity: 0 }}
						left='50%'
						transform='translateX(-50%)'
						width='90%'
						maxWidth='945px'
						backgroundColor='white'
						boxShadow='rgba(0, 0, 0, 0.3) 0px 8px 20px'
						borderRadius='10px'
						p={{ base: 3, md: 6 }}
					>
						<Heading as='h2' size='lg' textAlign='left' mb={3}>
							{t('yourCookies')}
						</Heading>
						<Divider my={3} />
						<Box
							overflowY='auto'
							maxH={{ base: '400px', md: 'none' }}
							pb={{ base: '55px', md: '0' }}
						>
							<Box>
								<Heading as='h3' size='md' textAlign='left' mb={3}>
									{t('mandatoryTitle')}
								</Heading>
								<Text>{t('mandatory')}</Text>
							</Box>
							<Divider my={3} />
							<Box>
								<Heading as='h3' size='md' textAlign='left' mb={3}>
									{t('optionalTitle')}
								</Heading>
								<Text>
									{t('optional')}
									<NextLink href='/confidentiality-policy' passHref>
										<Link
											ml={2}
											color='blue.600'
											fontSize='14px'
											fontWeight={600}
										>
											{t('learnMore')}
										</Link>
									</NextLink>
								</Text>
							</Box>
							{showGoogleAnalytics && (
								<FormControl
									display='flex'
									alignItems='center'
									justifyContent='space-between'
									width='100%'
									my={3}
								>
									<FormLabel htmlFor='ga' mb='0'>
										{t('googleAnalytics')}

										<Link
											ml={2}
											color='blue.600'
											fontWeight={600}
											href='https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage'
											isExternal
											fontSize='14px'
										>
											{t('learnMore')}
										</Link>
									</FormLabel>
									<Switch
										id='ga'
										size='lg'
										mr={1}
										isChecked={acceptGoogleAnalytics}
										onChange={(evt) =>
											setAcceptGoogleAnalytics(evt.target.checked)
										}
									/>
								</FormControl>
							)}
							<Divider my={3} />
						</Box>

						<Flex
							width={{ base: '100%' }}
							align='center'
							justify='flex-end'
							pos={{ base: 'absolute', md: 'static' }}
							bottom='0'
							left='0'
							borderRadius='10px'
							bgColor='white'
							p={3}
						>
							{!showGoogleAnalytics && (
								<Button
									mr={2}
									size='sm'
									variant='ghost'
									onClick={() => setShowGoogleAnalytics(true)}
								>
									{t('btnChoice')}
								</Button>
							)}

							<Button colorScheme='blue' onClick={handleCookiesAcceptance}>
								{showGoogleAnalytics ? t('btnValidate') : t('btnAccept')}
							</Button>
						</Flex>
					</MotionFlex>
				</RemoveScroll>
			)}
		</AnimatePresence>
	)
}
