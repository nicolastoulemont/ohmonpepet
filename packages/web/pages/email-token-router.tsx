import { Layout, Loader } from 'components'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import jwt_decode from 'jwt-decode'

interface DecodedToken {
	destinationUrl?: string
}

export default function EmailTokenRouterPage() {
	const { query, push } = useRouter()

	useEffect(() => {
		if (query.token && query.token !== '' && typeof query.token === 'string') {
			try {
				const decoded = jwt_decode(query.token as string) as DecodedToken
				if (decoded.destinationUrl) {
					push({
						pathname: '/signin',
						query: {
							validToken: true,
							destinationUrl: decoded.destinationUrl as string
						}
					})
				} else {
					push({ pathname: '/signin', query: { validToken: true } })
				}
			} catch (error) {
				push({ pathname: '/signin', query: { invalidToken: true } })
			}
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
				<Loader />
			</Flex>
		</Layout>
	)
}
