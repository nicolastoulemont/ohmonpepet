import gql from 'graphql-tag'
import {
	USER_AUTH_FIELDS,
	NOT_FOUND_FIELDS,
	USER_FORBIDDEN_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'

export const CURRENT_ACCOUNT = gql`
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	query CurrentAccount {
		currentAccount {
			... on Account {
				id
				email
				verifiedAt
				user {
					firstName
				}
				operator {
					id
					isActive
				}
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const GET_ACCOUNTS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query AllAccounts {
		allAccounts {
			... on AccountsList {
				accounts {
					id
					verifiedAt
					updatedAt
				}
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
