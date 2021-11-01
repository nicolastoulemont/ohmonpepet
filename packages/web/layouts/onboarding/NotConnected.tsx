import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingStartJSON from 'statics/onboarding/start.json'
import { Button, Box, Heading, Flex, useColorMode } from '@chakra-ui/react'
import { borderRadius, shadow } from 'theme/colors'
import { useRouter } from 'next/router'

export function NotConnected() {
	const { colorMode } = useColorMode()
	const { push } = useRouter()

	const { t } = useI18n(onBoardingStartJSON)

	return (
		<Box width='100%' textAlign='center' mt={10}>
			<Heading as='h2' size='lg' mb={6}>
				{t('notConnectedTitle')}
			</Heading>
			<Flex
				width='100%'
				flexDirection={['column', 'column', 'row']}
				align='center'
				justify='space-evenly'
			>
				<Box
					width={['100%', '100%', '33%']}
					textAlign='center'
					boxShadow={shadow[colorMode]}
					borderRadius={borderRadius}
					p={6}
					mb={[6, 6, 0]}
				>
					<Heading as='h3' size='md' fontWeight={600}>
						{t('notConnectedSignup')}
					</Heading>
					<Button
						colorScheme='red'
						mt={6}
						onClick={() =>
							push({ pathname: '/onboarding', query: { panel: 'signup' } })
						}
					>
						{t('notConnectedSignupBtn')}
					</Button>
				</Box>
				<Box
					width={['100%', '100%', '33%']}
					textAlign='center'
					boxShadow={shadow[colorMode]}
					borderRadius={borderRadius}
					p={6}
				>
					<Heading as='h3' size='md' fontWeight={600}>
						{t('notConnectedSignin')}
					</Heading>
					<Button
						colorScheme='red'
						mt={6}
						onClick={() =>
							push({
								pathname: '/onboarding',
								query: { panel: 'signin', src: 'onboarding' }
							})
						}
					>
						{t('notConnectedSigninBtn')}
					</Button>
				</Box>
			</Flex>
		</Box>
	)
}
