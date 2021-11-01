import gql from 'graphql-tag'

export const INVALID_ARGUMENTS_FIELDS = gql`
	fragment InvalidArgumentsFields on InvalidArgumentsError {
		invalidArguments {
			key
			message
		}
	}
`

export const NOT_FOUND_FIELDS = gql`
	fragment NotFoundFields on NotFoundError {
		code
		message
	}
`

export const UNABLE_TO_PROCESS_FIELDS = gql`
	fragment UnableToProcessFields on UnableToProcessError {
		code
		message
	}
`
export const USER_AUTH_FIELDS = gql`
	fragment UserAuthFields on UserAuthenticationError {
		code
		message
	}
`
export const USER_FORBIDDEN_FIELDS = gql`
	fragment UserForbiddenFields on UserForbiddenError {
		code
		message
	}
`
