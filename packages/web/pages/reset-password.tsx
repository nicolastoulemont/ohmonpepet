import { Layout } from 'components'
import React, { useState } from 'react'
import { panelBgColor, color, shadow, borderRadius } from 'theme/colors'
import formsJson from 'statics/forms.json'
import { useI18n } from 'utils/hooks/useI18n'
import { handleErrors } from 'utils/errors'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { PasswordInput } from 'components/PasswordInput'
import { useResetPasswordMutation } from 'generated/graphql'

import {
	Flex,
	useColorMode,
	Button,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Link
} from '@chakra-ui/react'

export default function ResetPassword() {
	const [state, setState] = useState<{ [key: string]: any }>({ success: false })
	const [errors, setErrors] = useState<{ [key: string]: any }>({})
	const { colorMode } = useColorMode()
	const { t } = useI18n(formsJson)
	const { query } = useRouter()

	const [resetPassword] = useResetPasswordMutation()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, success: false, [name]: value })
	}

	async function sendPassword() {
		if (!query.token) {
			setErrors({ token: true })
			return
		}
		const { data } = await resetPassword({
			variables: {
				newPassword: state['newPassword'] || '',
				token: (query.token as string) || ''
			}
		})
		if (data?.resetPassword.errors) {
			// @ts-expect-error
			handleErrors(data?.resetPassword.errors, setErrors)
		}
		if (!data?.resetPassword.success) {
			setErrors({ email: true })
		} else if (data?.resetPassword.success) {
			setState({ ...state, success: true })
		}
	}
	return (
		<Layout>
			<Flex width='100%' height='100%' align='center' justify='center'>
				<Flex
					width={['100%', '75%', '50%']}
					height='auto'
					maxWidth='500px'
					justify='center'
					direction='column'
					p={[6, 6, 8]}
					backgroundColor={panelBgColor[colorMode]}
					color={color[colorMode]}
					boxShadow={shadow[colorMode]}
					borderRadius={borderRadius}
				>
					<Heading as='h1' size='lg' mb='6'>
						{t('lostPassword')}
					</Heading>

					<PasswordInput
						errors={errors}
						handleChange={handleChange}
						name='newPassword'
						label={t('newPasswordLabel')}
					/>

					{state['success'] && (
						<Alert status='success' borderRadius='0.25rem' display='block' mb={6}>
							<Flex align='center' justify='flex-start'>
								<AlertIcon />
								<AlertTitle mr={2} fontSize='12px'>
									{t('resetPasswordTitle')}
								</AlertTitle>
							</Flex>
							<AlertDescription fontSize='12px'>
								<NextLink href='/signin?src=home' passHref>
									<Link>{t('resetPasswordDescription')}</Link>
								</NextLink>
							</AlertDescription>
						</Alert>
					)}
					{errors['token'] && (
						<Alert status='error' borderRadius='0.25rem' display='block' mb={6}>
							<Flex align='center' justify='flex-start'>
								<AlertIcon />
								<AlertTitle mr={2} fontSize='12px'>
									{t('resetPasswordTokenErrorTitle')}
								</AlertTitle>
							</Flex>
							<AlertDescription fontSize='12px'>
								<NextLink href='/lost_password' passHref>
									<Link>{t('resetPasswordTokenErrorDescription')}</Link>
								</NextLink>
							</AlertDescription>
						</Alert>
					)}
					<Flex width='100%' align='center' justify='space-between'>
						<Button onClick={sendPassword}>{t('resetPasswordBtn')}</Button>
					</Flex>
				</Flex>
			</Flex>
		</Layout>
	)
}
