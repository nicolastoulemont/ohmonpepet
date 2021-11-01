import React, { useState, useEffect } from 'react'
import { useSignUpMutation } from 'generated/graphql'
import { handleErrors } from 'utils/errors'
import { panelBgColor, color, shadow, borderRadius } from 'theme/colors'
import { PasswordInput } from 'components/PasswordInput'
import { useI18n } from 'utils/hooks/useI18n'
import formsJson from 'statics/forms.json'
import { useRouter } from 'next/router'
import {
	Flex,
	useColorMode,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription
} from '@chakra-ui/react'

interface SignUpFormProps {
	originUrl?: string | undefined
}

export function SignUpForm({ originUrl }: SignUpFormProps) {
	const [showSuccess, setShowSuccess] = useState(false)
	const [state, setState] = useState<{ [key: string]: any }>({
		email: '',
		password: '',
		firstName: ''
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const { colorMode } = useColorMode()
	const { asPath } = useRouter()
	const { t, lang } = useI18n(formsJson)

	const [signUp, { data, loading }] = useSignUpMutation({
		variables: {
			user: { email: state['email'], password: state['password'] },
			firstName: state['firstName'],
			lang,
			originUrl: originUrl
				? originUrl
				: asPath.includes('src')
				? asPath.split('?')[1]
				: undefined
		}
	})

	useEffect(() => {
		if (data?.signUp.user) {
			setShowSuccess(true)
		} else if (data?.signUp.errors) {
			// @ts-expect-error
			handleErrors(data.signUp.errors, setErrors)
		}
	}, [data])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!loading && !showSuccess) {
			signUp()
		}
	}

	return (
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
				{t('signUp')}
			</Heading>
			<FormControl isRequired width='100%' mb='6'>
				<FormLabel htmlFor='firstName'>{t('firstNameLabel')}</FormLabel>
				<Input
					type='firstName'
					id='firstName'
					name='firstName'
					aria-describedby='firstName'
					variant='outline'
					onChange={handleChange}
					isInvalid={!!errors['firstName']}
				/>
				{errors['firstName'] && <FormHelperText>{errors['firstName']}</FormHelperText>}
			</FormControl>
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
			{showSuccess && (
				<Alert status='success' borderRadius='0.25rem' display='block' mb={6}>
					<Flex align='center' justify='flex-start'>
						<AlertIcon />
						<AlertTitle mr={2} fontSize='14px'>
							{t('signUpSuccessTitle')}
						</AlertTitle>
					</Flex>
					<AlertDescription fontSize='14px'>
						{t('signUpSuccessDescription')}
					</AlertDescription>
				</Alert>
			)}

			<Flex width='100%' align='center' justify='space-between'>
				<Button onClick={handleSubmit} type='submit'>
					{t('signUp')}
				</Button>
			</Flex>
		</Flex>
	)
}
