import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentAdminQuery } from 'generated/graphql'
import { useApolloClient } from '@apollo/client'

export function useAdminOrRedirect() {
	const { push } = useRouter()
	const { data } = useCurrentAdminQuery()
	const client = useApolloClient()

	useEffect(() => {
		if (data?.currentAdmin.errors) {
			push('/admin/signin')
			client.cache.reset()
		}
	}, [data])

	return { user: { ...data } }
}
