import { Layout } from 'components'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingCompleteJSON from 'statics/onboarding/complete.json'
import { useConnectUserToProcessorMutation, useCurrentUserQuery } from 'generated/graphql'

export default function OnBoardingComplete() {
	const { t } = useI18n(onBoardingCompleteJSON)
	const { data } = useCurrentUserQuery()
	const { push } = useRouter()

	const [connect] = useConnectUserToProcessorMutation()

	useEffect(() => {
		if (data?.currentUser.__typename === 'UserAuthenticationError') {
			push({
				pathname: '/onboarding',
				query: { panel: 'signin', src: 'onboarding' }
			})
		}
	}, [data])

	async function toStripe() {
		const { data } = await connect()
		if (data.connectUserToProcessor.redirectUrl && window) {
			window.location.replace(data.connectUserToProcessor.redirectUrl)
		}
	}

	return (
		<Layout>
			<Flex
				flexDirection='column'
				align='center'
				justify='flex-start'
				width={['100%', '100%', '75%']}
				margin='0 auto'
				height='auto'
				textAlign='center'
				boxSizing='border-box'
			>
				<Image
					src='/img/progress.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt='congratulations !'
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
				<Text my={4} fontSize='2xl' fontWeight={600}>
					{t('subTitle')}
				</Text>
				<Text mt={2} fontSize='xl'>
					{t('messageOne')}
				</Text>
				<Text mb={6} fontSize='xl'>
					{t('messageTwo')}
				</Text>

				<Button colorScheme='red' onClick={toStripe} size='md' fontSize={['sm', 'md']}>
					{t('completeBtn')}
				</Button>
			</Flex>
		</Layout>
	)
}
