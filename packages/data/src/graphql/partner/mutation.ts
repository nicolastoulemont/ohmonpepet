import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'
export const CREATE_PARTNER = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation CreatePartner($input: CreatePartnerInput!) {
		createPartner(input: $input) {
			... on Partner {
				id
				name
				description
				websiteUrl
				medias {
					id
					storeUrl
				}
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
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

export const UPDATE_PARTNER = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation UpdatePartner($id: ID!, $input: UpdatePartnerInput!) {
		updatePartner(id: $id, input: $input) {
			... on Partner {
				id
				name
				description
				websiteUrl
				medias {
					id
					storeUrl
				}
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
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

export const DELETE_PARTNER = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation DeletePartner($id: ID!) {
		deletePartner(id: $id) {
			... on BooleanResult {
				success
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
		}
	}
`
