import gql from 'graphql-tag'
import {
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS,
	INVALID_ARGUMENTS_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'

export const CREATE_MEDIA = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateMedia($input: CreateMediaInput!) {
		createMedia(input: $input) {
			... on StorageInfos {
				signedRequest
				url
				mediaId
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
		}
	}
`

export const SET_MEDIA_AS_AVATAR_PICTURE = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation SetMediaAsAvatar($id: ID!) {
		setMediaAsAvatar(id: $id) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const DELETE_MEDIA = gql`
	mutation DeleteMedia($id: ID!) {
		deleteMedia(id: $id) {
			... on BooleanResult {
				success
			}
			... on IsActiveOperatorWithNoReplacementMediaError {
				activeOperatorWithNoReplacementMediaError
			}
			... on IsActiveOperatorMainMediaError {
				activeOperatorMainMediaError
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
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
