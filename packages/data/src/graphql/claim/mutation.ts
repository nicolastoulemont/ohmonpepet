import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS, USER_AUTH_FIELDS } from '../errors'

export const CREATE_BOOKING_CLAIM = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CreateBookingClaim($input: CreateBookingClaimInput!) {
		createBookingClaim(input: $input) {
			... on Claim {
				id
				reason
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
		}
	}
`
