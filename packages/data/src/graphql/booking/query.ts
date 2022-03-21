import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS
} from '../errors'

export const GET_USER_AND_OPERATOR_BOOKINGS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetCurrentUserAndOperatorBookings {
		currentUserAndOperatorBookings {
			... on BookingsList {
				bookings {
					id
					userId
					operatorId
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const GET_BOOKING_BY_ID = gql`
	${NOT_FOUND_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	query BookingById($id: ID!) {
		bookingById(id: $id) {
			... on Booking {
				id
				updatedAt
				status
				startDate
				endDate
				service {
					nameFr
					nameEn
				}
				priceWithOutApplicationFee
				applicationFeeAmount
				selectedOptions
				ownerConfirmationDate
				operatorConfirmationDate
				canceled
				canceledBy
				underReview
				operator {
					id
					averageScore
					averageResponseTime
					partnerId
					partnerPercentage
					account {
						user {
							firstName
						}
					}
					avatar {
						storeUrl
					}
					location {
						city
					}
					coreServices {
						price
						serviceOptionId
					}
					extraServices {
						atHomeExclusivity
						atHomeExclusivityExtraPrice
						atHomeContinuously
						atHomeContinuouslyExtraPrice
						atHomeOnlyBringPet
						atHomeOnlyBringPetExtraPrice
						atHomeComeGetPet
						atHomeComeGetPetExtraPrice
						atOwnerHomePlantsCare
						atOwnerHomePlantsCareExtraPrice
						atOwnerHomeMail
						atOwnerHomeMailExtraPrice
						atOwnerHomeCurtains
						atOwnerHomeCurtainsExtraPrice
					}
				}
				user {
					id
					firstName
					avatar {
						storeUrl
					}
				}
				reviews {
					id
					score
					title
					body
				}
				animals {
					specie {
						nameFr
						nameEn
					}
				}
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
		}
	}
`

export const GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS = gql`
	${USER_AUTH_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query CurrentUserOwnerBookings($input: CurrentUserBookingFilterInput!) {
		currentUserOwnerBookings(input: $input) {
			... on BookingsList {
				bookings {
					id
					updatedAt
					status
					startDate
					endDate
					service {
						nameFr
						nameEn
					}
					priceWithOutApplicationFee
					applicationFeeAmount
					selectedOptions
					messages {
						... on UserBookingMessage {
							userId
							readAt
						}
						... on OperatorBookingMessage {
							operatorId
							readAt
						}
					}
					operator {
						id
						account {
							user {
								firstName
							}
						}
						partnerId
						partnerPercentage
						averageScore
						avatar {
							storeUrl
						}
						location {
							city
						}
						coreServices {
							serviceOptionId
							price
						}
						extraServices {
							atHomeExclusivity
							atHomeExclusivityExtraPrice
							atHomeContinuously
							atHomeContinuouslyExtraPrice
							atHomeOnlyBringPet
							atHomeOnlyBringPetExtraPrice
							atHomeComeGetPet
							atHomeComeGetPetExtraPrice
							atOwnerHomePlantsCare
							atOwnerHomePlantsCareExtraPrice
							atOwnerHomeMail
							atOwnerHomeMailExtraPrice
							atOwnerHomeCurtains
							atOwnerHomeCurtainsExtraPrice
						}
					}
					animals {
						specie {
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
		}
	}
`
export const GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query CurrentUserOperatorBookings($input: CurrentUserBookingFilterInput!) {
		currentUserOperatorBookings(input: $input) {
			... on BookingsList {
				bookings {
					id
					updatedAt
					status
					startDate
					endDate
					service {
						nameFr
						nameEn
					}
					priceWithOutApplicationFee
					applicationFeeAmount
					selectedOptions
					messages {
						... on UserBookingMessage {
							userId
							readAt
						}
						... on OperatorBookingMessage {
							operatorId
							readAt
						}
					}
					user {
						id
						firstName
						avatar {
							storeUrl
						}
					}
					operator {
						id
						partnerId
						partnerPercentage
						coreServices {
							price
							serviceOptionId
						}
						extraServices {
							atHomeExclusivity
							atHomeExclusivityExtraPrice
							atHomeContinuously
							atHomeContinuouslyExtraPrice
							atHomeOnlyBringPet
							atHomeOnlyBringPetExtraPrice
							atHomeComeGetPet
							atHomeComeGetPetExtraPrice
							atOwnerHomePlantsCare
							atOwnerHomePlantsCareExtraPrice
							atOwnerHomeMail
							atOwnerHomeMailExtraPrice
							atOwnerHomeCurtains
							atOwnerHomeCurtainsExtraPrice
						}
					}
					animals {
						specie {
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

export const GET_BOOKINGS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query Bookings {
		bookings {
			... on BookingsList {
				bookings {
					id
					updatedAt
					status
					priceWithOutApplicationFee
					applicationFeeAmount
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

export const GET_BOOKINGS_WITH_PAYMENT_STATUS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query BookingsWithPaymentStatus($input: BookingWithPaymentStatusInput!) {
		bookingsWithPaymentStatus(input: $input) {
			... on BookingsList {
				bookings {
					id
					updatedAt
					priceWithOutApplicationFee
					applicationFeeAmount
					underReview
					payment {
						status
						expectedPaymentIntentCaptureDate
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
