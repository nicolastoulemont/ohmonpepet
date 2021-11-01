import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS } from '../errors'
export const GET_GENDERS_OPTIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetGendersOptions {
		gendersOptions {
			... on GenderOptionsList {
				genderOptions {
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
