import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'

export const CREATE_HOSTING = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateHostingOption($input: CreateHostingOptionInput!) {
		createHostingOption(input: $input) {
			... on HostingOption {
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

export const UPDATE_HOSTING = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateHostingOption($id: ID!, $input: UpdateHostingOptionInput!) {
		updateHostingOption(id: $id, input: $input) {
			... on HostingOption {
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

export const DELETE_HOSTING = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteHostingOption($id: ID!) {
		deleteHostingOption(id: $id) {
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
