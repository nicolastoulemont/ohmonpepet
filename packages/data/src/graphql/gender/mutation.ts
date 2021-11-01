import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'
export const CREATE_GENDER = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateGenderOption($input: CreateGenderOptionInput!) {
		createGenderOption(input: $input) {
			... on GenderOption {
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

export const UPDATE_GENDER = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateGenderOption($id: ID!, $input: UpdateGenderOptionInput!) {
		updateGenderOption(id: $id, input: $input) {
			... on GenderOption {
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

export const DELETE_GENDER = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteGenderOption($id: ID!) {
		deleteGenderOption(id: $id) {
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
