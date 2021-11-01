import gql from 'graphql-tag'
import { MESSAGE_FIELDS } from './fragment'
import {
	INVALID_ARGUMENTS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'
export const GET_BOOKING_MESSAGES = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${MESSAGE_FIELDS}
	query MessagesByBookingId($id: ID!) {
		messagesByBookingId(id: $id) {
			... on MessagesList {
				messages {
					...MessageFields
					content
				}
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
