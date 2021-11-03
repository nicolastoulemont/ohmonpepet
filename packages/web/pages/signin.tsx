import { Layout } from 'components'
import React from 'react'
import { SignInForm } from 'layouts/shared/SignInForm'
import { Flex } from '@chakra-ui/react'

export default function SignIn() {
	return (
		<Layout>
			<Flex width='100%' height='100%' align='center' justify='center'>
				<SignInForm />
			</Flex>
		</Layout>
	)
}
