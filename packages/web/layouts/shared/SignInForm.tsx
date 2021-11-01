import React, { useState, useEffect } from 'react'
import { useReSendVerificationEmailMutation, useSignInMutation } from 'generated/graphql'
import { useToast } from '@chakra-ui/react'
import { handleArgErrors } from 'utils/errors'
import { useRouter } from 'next/router'
import { panelBgColor, color, shadow, borderRadius } from 'theme/colors'
import formsJson from 'statics/forms.json'
import { CURRENT_USER } from 'graphql/user/query'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { GET_USER_BOOKING_IDS } from 'graphql/booking/query'
import { useI18n } from 'utils/hooks/useI18n'
import { PasswordInput } from 'components/PasswordInput'
import { parseUrl } from 'utils'
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

export function SignInForm() {
	const [state, setState] = useState<{ [key: string]: any }>({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [url, setUrl] = useState<{ src?: string; verified?: string; panel?: string }>({})
	const { query, push, back } = useRouter()
	const { colorMode } = useColorMode()
	const { t } = useI18n(formsJson)
	useEffect(() => {
		setUrl({ ...url, ...parseUrl(query) })
	}, [query])

	const [signIn] = useSignInMutation()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, verified: undefined, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const { data } = await signIn({
			variables: { user: { email: state['email'] || '', password: state['password'] || '' } },
			refetchQueries: [
				{ query: CURRENT_USER },
				{ query: CURRENT_USER_PROFILE },
				{ query: GET_USER_BOOKING_IDS }
			]
		})
		if (data?.signIn.__typename === 'User') {
			// If src, then redirect to it afterwards
			if (
				query.validToken &&
				typeof query.destinationUrl === 'string' &&
				query.destionationUrl !== ''
			) {
				push(query.destinationUrl)
			} else if (url.src) {
				const { src, verified, ...rest } = url
				if (src === 'home') {
					push('/')
				} else if (src === 'onboarding') {
					push('/onboarding')
				} else {
					if (rest['location']) {
						// @ts-ignore
						const { location, ...other } = rest
						push({
							pathname: `/${url.src}`,
							query: {
								...other,
								lat: location.coordinates[1],
								lng: location.coordinates[0]
							}
						})
					} else {
						push({ pathname: `/${url.src}`, query: { ...rest } })
					}
				}
			} else if (query.verified === 'true') {
				push('/')
			} else {
				back()
			}
		} else if (data?.signIn.__typename === 'InvalidArgumentsError') {
			// @ts-expect-error
			handleArgErrors(data.signIn.args, setErrors)
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
			{errors['verified'] && <UnVerifiedAlert email={state['email']} />}

			<Flex width='100%' align='center' justify='space-between'>
				<Button onClick={handleSubmit} type='submit'>
					{t('signIn')}
				</Button>
			</Flex>
		</Flex>
	)
}

function UnVerifiedAlert({ email }) {
	const [hasReSend, setHasReSend] = useState(false)
	const toast = useToast()
	const { t, lang } = useI18n(formsJson)

	const [reSend, { loading }] = useReSendVerificationEmailMutation()

	async function handleReSend() {
		if (!loading && !hasReSend) {
			setHasReSend(true)
			const { data: reSendData } = await reSend({
				variables: { email: email, lang }
			})
			if (reSendData.reSendVerificationEmail.success) {
				toast({
					position: 'top',
					title: t('notVerifiedToastSuccessTitle'),
					description: t('notVerifiedToastSuccessDescription'),
					status: 'success',
					duration: 9000,
					isClosable: true
				})
			} else {
				toast({
					position: 'top',
					title: t('notVerifiedToastErrorTitle'),
					description: t('notVerifiedToastErrorDescription'),
					status: 'error',
					duration: 9000,
					isClosable: true
				})
			}
		}
	}

	return (
		<Alert status='error' borderRadius='0.25rem' display='block' mb={6}>
			<Flex align='center' justify='flex-start'>
				<AlertIcon />
				<AlertTitle mr={2}>{t('notVerifiedError')}</AlertTitle>
			</Flex>

			<AlertDescription
				as='button'
				onClick={handleReSend}
				fontSize='14px'
				textDecoration='underline'
			>
				{t('notVerifiedAction')}
			</AlertDescription>
		</Alert>
	)
}
