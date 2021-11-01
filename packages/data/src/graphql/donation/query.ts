import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'

export const GET_CURRENT_OPERATOR_DONATIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query CurrentOperatorDonations {
		currentOperatorDonations {
			... on DonationsList {
				donations {
					id
					amountToDonate
					donationDate
					partnerId
					booking {
						status
					}
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
		}
	}
`

export const SEARCH_DONATIONS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	query SearchDonations($input: SearchDonationsInput!) {
		searchDonations(input: $input) {
			... on DonationsList {
				donations {
					id
					amountToDonate
					donationDate
					partnerId
					createdAt
					updatedAt
					booking {
						status
					}
					partner {
						name
					}
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
