import { from, HttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { isServer } from './utils'

export function createLinks(platform: 'web' | 'mobile') {
	// HANDLE LINKS CREATION
	// src: https://www.apollographql.com/docs/react/data/subscriptions/
	const httpLink = new HttpLink({
		uri:
			process.env.NODE_ENV === 'development'
				? process.env.DEV_HTTP_URI
				: process.env.PROD_HTTP_URI, // Server URL (must be absolute)
		credentials: 'include' // Additional fetch() options like `credentials` or `headers`
	})

	const wsWebLink = !isServer
		? new WebSocketLink({
				uri:
					process.env.NODE_ENV === 'development'
						? process.env.DEV_WS_URI
						: process.env.PROD_WS_URI,
				options: {
					lazy: true,
					reconnect: true
				}
		  })
		: null

	const wsMobileLink = new WebSocketLink({
		uri:
			process.env.NODE_ENV === 'development'
				? process.env.DEV_WS_URI
				: process.env.PROD_WS_URI,
		options: {
			lazy: true,
			reconnect: true
		}
	})

	const webLink = !isServer
		? split(
				// split based on operation type
				({ query }) => {
					const definition = getMainDefinition(query)
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					)
				},
				// @ts-expect-error
				wsWebLink,
				httpLink
		  )
		: httpLink

	const mobileLink = split(
		// split based on operation type
		({ query }) => {
			const definition = getMainDefinition(query)
			return (
				definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
			)
		},
		// @ts-expect-error
		wsMobileLink,
		httpLink
	)

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.map((error) => {
				console.log(error)
				return error
			})
		}

		if (networkError) {
			console.log(networkError)
		}
	})
	// @ts-expect-error
	return from([errorLink, platform === 'web' ? webLink : mobileLink])
}
