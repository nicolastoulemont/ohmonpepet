import { Layout, Loader } from 'components'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { Button, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingFinishedJSON from 'statics/onboarding/finished.json'
import { useVerifyUserProcessorConnectionCompletionMutation } from 'generated/graphql'

export default function OnBoardingComplete() {
	const [
		verifyUserProcessorConnectionCompletion,
		{ data, loading }
	] = useVerifyUserProcessorConnectionCompletionMutation()
	const { t } = useI18n(onBoardingFinishedJSON)

	useEffect(() => {
		verifyUserProcessorConnectionCompletion()
	}, [])

	if (loading) {
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
				>
					<Loader />
					<Heading as='h1' mb={6} mt={8}>
						{t('loading')}
					</Heading>
				</Flex>
			</Layout>
		)
	}

	if (data?.verifyUserProcessorConnectionCompletion.errors) {
		const [error] = data.verifyUserProcessorConnectionCompletion.errors
		if (error.key === 'Unauthenticated') {
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
					>
						<Image
							src='/img/attention.svg'
							width={['150px', '200px']}
							height={['150px', '200px']}
							mt={[2, 6]}
							alt='errors'
						/>
						<Heading as='h1' mb={6} mt={8}>
							{t('titleNotConnected')}
						</Heading>

						<NextLink href='/signin' passHref>
							<Link as={Button}>{t('toSigninBtn')}</Link>
						</NextLink>
					</Flex>
				</Layout>
			)
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
				>
					<Image
						src='/img/attention.svg'
						width={['150px', '200px']}
						height={['150px', '200px']}
						mt={[2, 6]}
						alt='errors'
					/>
					<Heading as='h1' mb={6} mt={8}>
						{t('titleError')}
					</Heading>

					{error.key === 'charges_not_enabled' && (
						<Text my={4} fontSize='2xl' fontWeight={600}>
							{t('subTitleErrorCharges')}
						</Text>
					)}
					{error.key === 'detail_not_submitted' && (
						<Text my={4} fontSize='2xl' fontWeight={600}>
							{t('subTitleErrorDetails')}
						</Text>
					)}
					<Link as={Button} href={error.message}>
						{t('completeProcessorBtn')}
					</Link>
				</Flex>
			</Layout>
		)
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
			>
				{data?.verifyUserProcessorConnectionCompletion?.success && (
					<>
						<Image
							src='/img/fireworks.svg'
							width={['150px', '200px']}
							height={['150px', '200px']}
							mt={[2, 6]}
							alt='congratulations !'
						/>
						<Heading as='h1' mb={6} mt={8}>
							{t('titleSuccess')}
						</Heading>
						<Text my={4} fontSize='2xl' fontWeight={600}>
							{t('subTitleSuccess')}
						</Text>
						<NextLink href='/profile' passHref>
							<Link as={Button} colorScheme='red'>
								{t('completeBtn')}
							</Link>
						</NextLink>
					</>
				)}
			</Flex>
		</Layout>
	)
}
