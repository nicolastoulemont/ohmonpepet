import { Layout } from 'components'
import React, { useState } from 'react'
import { panelBgColor, color, shadow, borderRadius } from 'theme/colors'
import formsJson from 'statics/forms.json'
import { useI18n } from 'utils/hooks/useI18n'
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
import { useLostPasswordMutation } from 'generated/graphql'

export default function LostPassword() {
	const [state, setState] = useState<{ [key: string]: any }>({ success: false })
	const [errors, setErrors] = useState<{ [key: string]: any }>({})
	const { colorMode } = useColorMode()
	const { t, lang } = useI18n(formsJson)

	const [getPasswordEmail] = useLostPasswordMutation()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, success: false, [name]: value })
	}

	async function resetPassword() {
		const { data } = await getPasswordEmail({
			variables: { email: state['email'] || '', lang }
		})
		if (!data?.lostPassword.success) {
			setErrors({ email: true })
		} else if (data?.lostPassword.success) {
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
						{!errors['email'] && <FormHelperText>{t('emailHelper')}</FormHelperText>}
						{errors['email'] && <FormHelperText>{t('invalidEmail')}</FormHelperText>}
					</FormControl>
					{state['success'] && (
						<Alert status='success' borderRadius='0.25rem' display='block' mb={6}>
							<Flex align='center' justify='flex-start'>
								<AlertIcon />
								<AlertTitle mr={2} fontSize='12px'>
									{t('lostPasswordTitle')}
								</AlertTitle>
							</Flex>
							<AlertDescription fontSize='12px'>
								{t('lostPasswordDescription')}
							</AlertDescription>
						</Alert>
					)}
					<Flex width='100%' align='center' justify='space-between'>
						<Button onClick={resetPassword}>{t('getPassword')}</Button>
					</Flex>
				</Flex>
			</Flex>
		</Layout>
	)
}
