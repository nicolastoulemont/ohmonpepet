import { Flex, Text, theme, IconButton } from '@chakra-ui/react'
import { SvgBox, SvgBoxProps } from 'components'
import { useGetCronStatusQuery, useStartCronMutation, useStopCronMutation } from 'generated/graphql'
import { GET_CRON_STATUS } from 'graphql/admin/query'
import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import dashboardJSON from 'statics/admin/dashboard.json'

export const RoundStatusIcon: React.FC<SvgBoxProps> = ({ color, ...props }) => {
	return (
		<SvgBox as='svg' viewBox='0 0 24 24' width={4} height={4} fill={color} {...props}>
			<circle cx='12' cy='12' r='10' />
		</SvgBox>
	)
}

export function CronsControl() {
	const { t } = useI18n(dashboardJSON)

	const { data: paymentIntentsCron } = useGetCronStatusQuery({
		variables: { cronName: 'HOURLY_PENDING_PAYMENT_INTENTS' }
	})
	const { data: setupIntentCron } = useGetCronStatusQuery({
		variables: { cronName: 'HOURLY_CONFIRMED_SETUP_INTENT' }
	})
	const { data: emailCreationCron } = useGetCronStatusQuery({
		variables: { cronName: 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL' }
	})
	const [
		startPaymentIntentsCron,
		{ loading: startPaymentIntentsCronLoading }
	] = useStartCronMutation({
		variables: { cronName: 'HOURLY_PENDING_PAYMENT_INTENTS' },
		refetchQueries: [
			{
				query: GET_CRON_STATUS,
				variables: { cronName: 'HOURLY_PENDING_PAYMENT_INTENTS' }
			}
		]
	})
	const [
		stopPaymentIntentsCron,
		{ loading: stopPaymentIntentsCronLoading }
	] = useStopCronMutation({
		variables: { cronName: 'HOURLY_PENDING_PAYMENT_INTENTS' },
		refetchQueries: [
			{
				query: GET_CRON_STATUS,
				variables: { cronName: 'HOURLY_PENDING_PAYMENT_INTENTS' }
			}
		]
	})
	const [startSetupIntentsCron, { loading: startSetupIntentsCronLoading }] = useStartCronMutation(
		{
			variables: { cronName: 'HOURLY_CONFIRMED_SETUP_INTENT' },
			refetchQueries: [
				{
					query: GET_CRON_STATUS,
					variables: { cronName: 'HOURLY_CONFIRMED_SETUP_INTENT' }
				}
			]
		}
	)
	const [stopSetupIntentsCron, { loading: stopSetupIntentsCronLoading }] = useStopCronMutation({
		variables: { cronName: 'HOURLY_CONFIRMED_SETUP_INTENT' },
		refetchQueries: [
			{
				query: GET_CRON_STATUS,
				variables: { cronName: 'HOURLY_CONFIRMED_SETUP_INTENT' }
			}
		]
	})

	const [
		startEmailCreationCron,
		{ loading: startEmailCreationCronLoading }
	] = useStartCronMutation({
		variables: { cronName: 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL' },
		refetchQueries: [
			{
				query: GET_CRON_STATUS,
				variables: { cronName: 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL' }
			}
		]
	})
	const [stopEmailCreationCron, { loading: stopEmailCreationCronLoading }] = useStopCronMutation({
		variables: { cronName: 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL' },
		refetchQueries: [
			{
				query: GET_CRON_STATUS,
				variables: { cronName: 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL' }
			}
		]
	})

	return (
		<>
			<Flex
				align='center'
				justify='center'
				px={3}
				mx={3}
				boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
				borderRadius='10px'
			>
				<Text fontSize='14px'>{t('paymentIntentBot')}</Text>
				{(paymentIntentsCron?.getCronStatus.status === 'NOT_SCHEDULED' ||
					paymentIntentsCron?.getCronStatus.status === 'STOPED') && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.red['50'] }}
						icon={<RoundStatusIcon color={theme.colors.red['500']} />}
						isRound
						aria-label='button'
						isLoading={startPaymentIntentsCronLoading}
						onClick={() => startPaymentIntentsCron()}
						mb={{ base: 1.5, md: 0 }}
						ml={{ base: 0, md: 1.5 }}
					/>
				)}
				{paymentIntentsCron?.getCronStatus.status === 'SCHEDULED' && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.green['50'] }}
						icon={<RoundStatusIcon color={theme.colors.green['500']} />}
						isRound
						aria-label='button'
						isLoading={stopPaymentIntentsCronLoading}
						onClick={() => stopPaymentIntentsCron()}
						mb={{ base: 1.5, md: 0 }}
						ml={{ base: 0, md: 1.5 }}
					/>
				)}
			</Flex>
			<Flex
				align='center'
				justify='center'
				px={3}
				mx={3}
				boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
				borderRadius='10px'
			>
				<Text fontSize='14px'>{t('setupIntentBot')}</Text>
				{(setupIntentCron?.getCronStatus.status === 'NOT_SCHEDULED' ||
					setupIntentCron?.getCronStatus.status === 'STOPED') && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.red['50'] }}
						icon={<RoundStatusIcon color={theme.colors.red['500']} />}
						isRound
						aria-label='button'
						isLoading={startSetupIntentsCronLoading}
						onClick={() => startSetupIntentsCron()}
						ml={1.5}
					/>
				)}
				{setupIntentCron?.getCronStatus.status === 'SCHEDULED' && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.green['50'] }}
						icon={<RoundStatusIcon color={theme.colors.green['500']} />}
						isRound
						aria-label='button'
						isLoading={stopSetupIntentsCronLoading}
						onClick={() => stopSetupIntentsCron()}
						ml={1.5}
					/>
				)}
			</Flex>
			<Flex
				align='center'
				justify='center'
				px={3}
				mx={3}
				boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
				borderRadius='10px'
			>
				<Text fontSize='14px'>{t('emailBot')}</Text>
				{(emailCreationCron?.getCronStatus.status === 'NOT_SCHEDULED' ||
					emailCreationCron?.getCronStatus.status === 'STOPED') && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.red['50'] }}
						icon={<RoundStatusIcon color={theme.colors.red['500']} />}
						isRound
						aria-label='button'
						isLoading={startEmailCreationCronLoading}
						onClick={() => startEmailCreationCron()}
						ml={1.5}
					/>
				)}
				{emailCreationCron?.getCronStatus.status === 'SCHEDULED' && (
					<IconButton
						bgColor='white'
						_hover={{ bgColor: theme.colors.green['50'] }}
						icon={<RoundStatusIcon color={theme.colors.green['500']} />}
						isRound
						aria-label='button'
						isLoading={stopEmailCreationCronLoading}
						onClick={() => stopEmailCreationCron()}
						ml={1.5}
					/>
				)}
			</Flex>
		</>
	)
}
