import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS } from '../errors'
export const GET_LANGUAGE_OPTIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetLanguagesOptions {
		languagesOptions {
			... on LanguageOptionsList {
				languageOptions {
					id
					nameFr
					nameEn
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
