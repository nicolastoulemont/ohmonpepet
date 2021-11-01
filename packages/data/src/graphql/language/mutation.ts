import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'

export const CREATE_LANGUAGE = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation CreateLanguageOption($input: CreateLanguageOptionInput!) {
		createLanguageOption(input: $input) {
			... on LanguageOption {
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

export const UPDATE_LANGUAGE = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {
		updateLanguageOption(id: $id, input: $input) {
			... on LanguageOption {
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

export const DELETE_LANGUAGE = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteLanguageOption($id: ID!) {
		deleteLanguageOption(id: $id) {
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
