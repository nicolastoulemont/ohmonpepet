import { Layout } from 'components'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CURRENT_ADMIN_USER } from 'graphql/admin/query'
import { useI18n } from 'utils/hooks/useI18n'
import formsJSON from 'statics/forms.json'
import { useSignInAdminMutation } from 'generated/graphql'
import { borderRadius, color, panelBgColor, shadow } from 'theme/colors'
import { PasswordInput } from 'components/PasswordInput'
import { handleErrors } from 'utils/errors'
import {
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	useColorMode
} from '@chakra-ui/react'

export default function AdminSignIn() {
	const [state, setState] = useState<{ [key: string]: any }>({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [showToDashboardBtn, setShowToDashboardBtn] = useState(false)
	const { push } = useRouter()
	const { colorMode } = useColorMode()
	const { t } = useI18n(formsJSON)

	const [signIn] = useSignInAdminMutation()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, verified: undefined, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await signIn({
			variables: { user: { email: state['email'] || '', password: state['password'] || '' } },
			refetchQueries: [{ query: CURRENT_ADMIN_USER }]
		})
		if (data?.signInAdmin.admin) {
			setShowToDashboardBtn(true)
		} else if (data?.signInAdmin.errors) {
			// @ts-expect-error
			handleErrors(data.signInAdmin.errors, setErrors)
		}
	}
	return (
		<Layout>
			<Flex width='100%' height='100%' align='center' justify='center'>
				<Flex
					as='form'
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
					onSubmit={handleSubmit}
				>
					<Heading as='h1' size='lg' mb='6'>
						{t('signIn')}
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
						/>
						{errors['email'] && <FormHelperText>{errors['email']}</FormHelperText>}
					</FormControl>
					<PasswordInput errors={errors} handleChange={handleChange} />

					<Flex width='100%' align='center' justify='space-between'>
						<Button onClick={handleSubmit} type='submit'>
							{t('signIn')}
						</Button>
						{showToDashboardBtn && (
							<Button onClick={() => push('/admin')}>{t('toDashboard')}</Button>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Layout>
	)
}
