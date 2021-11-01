import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'

export const CREATE_SERVICE_OPTION = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateServiceOption($input: CreateServiceOptionInput!) {
		createServiceOption(input: $input) {
			... on ServiceOption {
				id
				nameFr
				nameEn
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const UPDATE_SERVICE_OPTION = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateServiceOption($id: ID!, $input: UpdateServiceOptionInput!) {
		updateServiceOption(id: $id, input: $input) {
			... on ServiceOption {
				id
				nameFr
				nameEn
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const DELETE_SERVICE_OPTION = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteServiceOption($id: ID!) {
		deleteServiceOption(id: $id) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`
