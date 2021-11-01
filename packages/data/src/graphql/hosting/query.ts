import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS } from '../errors'

export const GET_HOSTING_OPTIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetHostingsOptions {
		hostingsOptions {
			... on HostingOptionsList {
				hostingOptions {
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
