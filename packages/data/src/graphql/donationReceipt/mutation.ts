import gql from 'graphql-tag'
import {
	UNABLE_TO_PROCESS_FIELDS,
	INVALID_ARGUMENTS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS
} from '../errors'

export const CREATE__DONATION_RECEIPT = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {
		createDonationReceipt(input: $input) {
			... on DonationReceipt {
				id
				amountDonated
				createdAt
				updatedAt
				donations {
					id
				}
				files {
					storeUrl
				}
				partner {
					name
					medias {
						storeUrl
					}
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
