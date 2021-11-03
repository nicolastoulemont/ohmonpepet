import { Layout } from 'components'
import {
	useCurrentUserAccountInfosQuery,
	useDeleteUserMutation,
	useModifyEmailMutation,
	useModifyPasswordMutation
} from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import { handleErrors } from 'utils/errors'
import accountJSON from 'statics/account.json'
import { PasswordInput } from 'components/PasswordInput'
import { CURRENT_USER } from 'graphql/user/query'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { NextSeo } from 'next-seo'
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	FormHelperText,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalFooter,
	Text,
	useToast
} from '@chakra-ui/react'

export default function UserAccount() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()

	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [state, setState] = useState<{ [key: string]: any }>({
		email: '',
		password: '',
		newPassword: ''
	})
	const { push } = useRouter()
	const { data } = useCurrentUserAccountInfosQuery()

	const [modifyPassword, { loading }] = useModifyPasswordMutation({
		variables: { password: state.password, newPassword: state.newPassword }
	})

	const [modifyEmail, { loading: emailLoading }] = useModifyEmailMutation({
		variables: { email: state.email }
	})

	const { t, lang } = useI18n(accountJSON)

	useEffect(() => {
		if (data?.currentUser.__typename === 'UserAuthenticationError') push('/signin')
		if (data?.currentUser.__typename === 'User' && data.currentUser.email !== state.email)
			setState({ ...state, email: data?.currentUser.email })
	}, [data])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function changePassword(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await modifyPassword()
		if (data?.modifyPassword.errors) {
			// @ts-expect-error
			handleErrors(data?.modifyPassword.errors, setErrors)
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
		if (data?.modifyEmail.errors) {
			if (data?.modifyEmail.errors[0].key === 'user') {
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
			<NextSeo title={`Ohmonpepet | ${lang === 'fr' ? 'Compte' : 'Account'}`} />
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
						{data?.currentUser.__typename === 'User' &&
							data?.currentUser.email !== state.email && (
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
				<Flex width='100%' align='center' justify={['center', 'center', 'flex-start']}>
					<Button onClick={onOpen}>{t('deleteAccount')}</Button>
				</Flex>
			</Box>
			<DeleteAccountModal isOpen={isOpen} onClose={onClose} />
		</Layout>
	)
}

function DeleteAccountModal({ isOpen, onClose }) {
	const [state, setState] = useState({ confirmPassword: '' })
	const [errors, setErrors] = useState({})
	const { t } = useI18n(accountJSON)
	const toast = useToast()

	const [deleteUser] = useDeleteUserMutation({
		refetchQueries: [{ query: CURRENT_USER }, { query: CURRENT_USER_PROFILE }]
	})
	const { push } = useRouter()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function deleteAccount(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await deleteUser({
			variables: { confirmPassword: state.confirmPassword }
		})
		if (data?.deleteUser.errors) {
			if (data?.deleteUser.errors[0].key === 'upcomingBookingsOwner') {
				toast({
					position: 'top',
					title: t('deleteErrorBookingsOwnerTitle'),
					description: t('deleteErrorBookingsOwnerDescription'),
					status: 'error',
					duration: 9000,
					isClosable: true
				})
			} else if (data?.deleteUser.errors[0].key === 'upcomingBookingsSitter') {
				toast({
					position: 'top',
					title: t('deleteErrorBookingsSitterTitle'),
					description: t('deleteErrorBookingsSitterDescription'),
					status: 'error',
					duration: 9000,
					isClosable: true
				})
			} else {
				// @ts-expect-error
				handleErrors(data.deleteUser.errors, setErrors)
			}
		} else if (data?.deleteUser.success) {
			push({ pathname: '/', query: { deletedAccount: 'true' } })
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent as='form' onSubmit={deleteAccount}>
					<ModalHeader textAlign='center'>{t('deleteAccountModalTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Heading size='sm' textAlign='center' mb={3}>
							{t('deleteAccountModalSubTitle')}
						</Heading>
						<Text textAlign='center' mb={3}>
							{t('deleteAccountModalMessage')}
						</Text>
						<PasswordInput
							errors={errors}
							handleChange={handleChange}
							name='confirmPassword'
						/>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose} type='button'>
							{t('close')}
						</Button>
						<Button colorScheme='red' onClick={deleteAccount} type='submit'>
							{t('deleteAccount')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	)
}
