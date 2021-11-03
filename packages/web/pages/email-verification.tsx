import { Layout, Loader } from 'components'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Heading } from '@chakra-ui/react'
import { useVerifyUserMutation } from 'generated/graphql'
import { useI18n } from 'utils/hooks/useI18n'
import verifyEmailJSON from 'statics/verifyEmail.json'
import jwt_decode from 'jwt-decode'

export default function EmailVerificationPage() {
	const { t } = useI18n(verifyEmailJSON)
	const { query, push } = useRouter()
	const [verifyUser] = useVerifyUserMutation()

	useEffect(() => {
		async function verify() {
			try {
				const { data } = await verifyUser({ variables: { token: query.token as string } })
				if (data?.verifyUser.success) {
					const decoded = jwt_decode(query.token as string)
					// @ts-expect-error
					if (decoded.originUrl) {
						//@ts-expect-error
						push(`/signin?verified=true&${decoded.originUrl}`)
					} else {
						push({ pathname: '/signin', query: { verified: true } })
					}
				} else if (data.verifyUser.errors) {
					push({ pathname: '/signin', query: { verified: false } })
				}
			} catch (error) {
				push({ pathname: '/signin', query: { verified: false } })
			}
		}

		if (query.token && query.token !== '' && typeof query.token === 'string') {
			verify()
		}
	}, [query])

	return (
		<Layout>
			<Flex
				width='100%'
				height={'calc(100vh - 98px)'}
				align='center'
				justify='center'
				flexDirection='column'
			>
				<Heading size='lg'>{t('message')}</Heading>
				<Loader />
			</Flex>
		</Layout>
	)
}
