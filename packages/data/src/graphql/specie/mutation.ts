import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'

export const CREATE_SPECIE_OPTION = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateSpecieOption($input: CreateSpecieOptionInput!) {
		createSpecieOption(input: $input) {
			... on SpecieOption {
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

export const UPDATE_SPECIE_OPTION = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateSpecieOption($id: ID!, $input: UpdateSpecieOptionInput!) {
		updateSpecieOption(id: $id, input: $input) {
			... on SpecieOption {
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

export const DELETE_SPECIE_OPTION = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteSpecieOption($id: ID!) {
		deleteSpecieOption(id: $id) {
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
