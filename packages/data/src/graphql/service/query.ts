import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS } from '../errors'

export const GET_SERVICE_OPTIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetServiceOptions {
		servicesOptions {
			... on ServiceOptionsList {
				serviceOptions {
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
