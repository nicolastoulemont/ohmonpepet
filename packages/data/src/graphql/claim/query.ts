import gql from 'graphql-tag'
import {
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS
} from '../errors'
export const GET_BOOKING_CLAIMS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query GetBookingClaims {
		claims {
			... on ClaimsList {
				claims {
					id
					reason
					user {
						firstName
						lastName
						account {
							email
						}
						avatar {
							storeUrl
						}
					}
					operator {
						averageScore
						location {
							address
							city
						}
						avatar {
							storeUrl
						}
						account {
							email
							user {
								firstName
								lastName
							}
						}
					}
					booking {
						id
						startDate
						endDate
						animalsIds
						priceWithOutApplicationFee
						applicationFeeAmount
						service {
							nameFr
							nameEn
						}
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

export const GET_BOOKING_CLAIM_BY_ID = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${NOT_FOUND_FIELDS}
	query GetBookingClaimById($id: ID!) {
		claimById(id: $id) {
			... on Claim {
				id
				reason
				user {
					firstName
					lastName
					account {
						email
					}
					avatar {
						storeUrl
					}
				}
				operator {
					averageScore
					location {
						address
						city
					}
					avatar {
						storeUrl
					}
					account {
						email
						user {
							firstName
							lastName
						}
					}
				}
				booking {
					id
					startDate
					endDate
					animalsIds
					priceWithOutApplicationFee
					applicationFeeAmount
					service {
						nameFr
						nameEn
					}
					messages {
						id
						content
						readAt
						... on UserBookingMessage {
							userId
						}
						... on OperatorBookingMessage {
							operatorId
						}
					}
				}
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`
