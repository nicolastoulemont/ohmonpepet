import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS } from '../errors'
export const GET_SPECIES_OPTIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetSpeciesOptions {
		speciesOptions {
			... on SpecieOptionsList {
				specieOptions {
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
