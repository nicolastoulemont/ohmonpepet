import { Layout } from 'components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import { handleErrors } from 'utils/errors'
import accountJSON from 'statics/account.json'
import { PasswordInput } from 'components/PasswordInput'
import { CURRENT_ADMIN_USER } from 'graphql/admin/query'
import {
	useCurrentAdminQuery,
	useModifyAdminEmailMutation,
	useModifyAdminPasswordMutation
} from 'generated/graphql'
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	FormHelperText,
	Button,
	useToast
} from '@chakra-ui/react'

export default function AdminAccount() {
	const toast = useToast()

	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		email: '',
		password: '',
		newPassword: ''
	})
	const { push } = useRouter()
	const { data } = useCurrentAdminQuery()

	const [modifyPassword, { loading }] = useModifyAdminPasswordMutation({
		variables: { password: state.password, newPassword: state.newPassword }
	})

	const [modifyEmail, { loading: emailLoading }] = useModifyAdminEmailMutation({
		variables: { email: state.email },
		refetchQueries: [{ query: CURRENT_ADMIN_USER }]
	})

	const { t } = useI18n(accountJSON)

	useEffect(() => {
		if (data?.currentAdmin.errors) push('/signin')
		if (data?.currentAdmin.admin?.email && data.currentAdmin.admin.email !== state.email)
			setState({ ...state, email: data?.currentAdmin.admin.email })
	}, [data])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function changePassword(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await modifyPassword()
		if (data?.modifyAdminPassword.errors) {
			// @ts-expect-error
			handleErrors(data?.modifyAdminPassword.errors, setErrors)
		} else {
			toast({
				position: 'top',
				title: t('changedPasswordSuccessTitle'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		}
	}

	async function changeEmail(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await modifyEmail()
		if (data?.modifyAdminEmail.errors) {
			if (data?.modifyAdminEmail.errors[0].key === 'user') {
				toast({
					position: 'top',
					title: t('changedEmailErrorTitle'),
					status: 'error',
					duration: 9000,
					isClosable: true
				})
			} else {
				// @ts-expect-error
				handleErrors(data?.modifyEmail.errors, setErrors)
			}
		} else {
			toast({
				position: 'top',
				title: t('changedEmailSuccessTitle'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		}
	}

	return (
		<Layout>
			<Box width='100%' height={['auto', 'auto', 'calc(100vh - 98px)']}>
				<Heading my={[6, 6, 12]}>{t('title')}</Heading>
				<Flex
					align={['center', 'center', 'flex-start']}
					justify={['center', 'center', 'space-between']}
					width='100%'
					flexDir={['column', 'column', 'row']}
					mb={6}
				>
					<Box
						width={['100%', '100%', '45%']}
						mb={[3, 3, 0]}
						textAlign='left'
						as='form'
						onSubmit={changeEmail}
					>
						<Heading size='md' mb={3}>
							{t('changeEmailBtn')}
						</Heading>
						<FormControl isRequired width='100%' mb='6'>
							<FormLabel htmlFor='email'>{t('emailLabel')}</FormLabel>
							<Input
								type='email'
								id='email'
								name='email'
								aria-describedby='email'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['email']}
								value={state['email'] || ''}
							/>
							{errors['email'] && <FormHelperText>{errors['email']}</FormHelperText>}
						</FormControl>
						{data?.currentAdmin.admin?.email &&
							data?.currentAdmin.admin.email !== state.email && (
								<Button onClick={changeEmail} isLoading={emailLoading}>
									{t('changeEmailBtn')}
								</Button>
							)}
					</Box>
					<Box
						width={['100%', '100%', '45%']}
						textAlign='left'
						as='form'
						onSubmit={changePassword}
					>
						<Heading size='md' mb={3}>
							{t('changePwdBtn')}
						</Heading>
						<PasswordInput
							errors={errors}
							handleChange={handleChange}
							isRequired={false}
						/>
						<PasswordInput
							errors={errors}
							handleChange={handleChange}
							name='newPassword'
							isRequired={false}
							label={t('newPasswordLabel')}
						/>
						{state.password !== '' && state.newPassword !== '' && (
							<Button onClick={changePassword} isLoading={loading}>
								{t('changePwdBtn')}
							</Button>
						)}
					</Box>
				</Flex>
			</Box>
		</Layout>
	)
}
