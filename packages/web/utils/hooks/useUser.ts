import { useRouter } from 'next/router'
import { useCurrentUserQuery } from 'generated/graphql'
import { useApolloClient } from '@apollo/client'
export function useUserOrRedirect() {
	const { push } = useRouter()
	const client = useApolloClient()

	const { data } = useCurrentUserQuery({
		onCompleted: (data) => {
			if (data?.currentUser.__typename === 'UserAuthenticationError') {
				push('/signin')
				client.cache.reset()
			}
		}
	})

	return { user: { ...data } }
}
