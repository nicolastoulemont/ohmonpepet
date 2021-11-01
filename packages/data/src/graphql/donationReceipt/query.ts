import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS } from '../errors'
export const SEARCH_RECEIPTS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	query SearchDonationReceipts($input: SearchDonationReceiptsInput!) {
		searchDonationReceipts(input: $input) {
			... on DonationReceiptsList {
				donationReceipts {
					id
					amountDonated
					createdAt
					updatedAt
					files {
						storeUrl
					}
					partner {
						name
						medias {
							storeUrl
						}
					}
					donations {
						id
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
