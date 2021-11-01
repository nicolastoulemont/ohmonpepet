import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS } from '../errors'
export const LOCATION_SEARCH = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	query LocationSearch($query: String!, $locale: String!) {
		locationSearch(query: $query, locale: $locale) {
			... on LocationsList {
				locations {
					id
					formattedLocationString
					locale_names
					postcode
					city
					country
					country_code
					latitude
					longitude
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
		}
	}
`
