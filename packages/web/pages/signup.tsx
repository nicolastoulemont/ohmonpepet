import { Layout } from 'components'
import React from 'react'
import { SignUpForm } from 'layouts/shared/SignUpForm'

import { Flex } from '@chakra-ui/react'

export default function SignUp() {
	return (
		<Layout>
			<Flex width='100%' height='100%' align='center' justify='center'>
				<SignUpForm />
			</Flex>
		</Layout>
	)
}
