import { GraphQLError } from 'graphql'

export interface EnrichedGraphQLError extends GraphQLError {
	fields: { [key: string]: string }
	code: string
}

type TypeNameValueOf<T extends { __typename: string }> = T['__typename']

export function isType<
	Result extends { __typename: string },
	Typename extends TypeNameValueOf<Result>
>(result: Result, typename: Typename): result is Extract<Result, { __typename: Typename }> {
	return typeof result === 'undefined' ? false : result.__typename === typename
}
