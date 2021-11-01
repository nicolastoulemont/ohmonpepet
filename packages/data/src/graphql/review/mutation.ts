import gql from 'graphql-tag'
import { USER_AUTH_FIELDS, INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS } from '../errors'
export const CREATE_REVIEW = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CreateReview($input: CreateReviewInput!) {
		createReview(input: $input) {
			... on UserReview {
				id
			}
			... on OperatorReview {
				id
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}

			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
