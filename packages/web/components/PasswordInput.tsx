import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import passwordJSON from 'statics/forms.json'
import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	FormControl,
	FormLabel,
	FormHelperText
} from '@chakra-ui/react'

interface PasswordInputProps {
	errors: { [key: string]: string }
	handleChange(e: React.ChangeEvent<any>): void
	name?: string
	width?: string
	otherStylesProps?: any
	isRequired?: boolean
	label?: string
}

export function PasswordInput({
	errors,
	handleChange,
	name = 'password',
	width = '100%',
	otherStylesProps,
	isRequired = true,
	label
}: PasswordInputProps) {
	const [show, setShow] = React.useState(false)
	const { t } = useI18n(passwordJSON)

	return (
		<FormControl isRequired={isRequired} width={width} {...otherStylesProps} mb={6}>
			<FormLabel htmlFor={name}>{label ? label : t('passwordLabel')}</FormLabel>
			<InputGroup size='md'>
				<Input
					name={name}
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					isRequired={isRequired}
					variant='outline'
					onChange={handleChange}
					isInvalid={!!errors[name]}
				/>
				<InputRightElement width='4.5rem'>
					<Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
						{show ? t('passwordHide') : t('passwordShow')}
					</Button>
				</InputRightElement>
			</InputGroup>
			<FormHelperText textAlign='left'>
				{errors[name] ? errors[name] : t('passwordHelper')}
			</FormHelperText>
		</FormControl>
	)
}
