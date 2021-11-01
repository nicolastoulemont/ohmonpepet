import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS
} from '../errors'

export const CREATE_BOOKING = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CreateBooking($input: CreateBookingInput!) {
		createBooking(input: $input) {
			... on Booking {
				id
				startDate
				endDate
				status
				ownerConfirmationDate
				operatorConfirmationDate
				selectedOptions
				animals {
					specieOptionId
				}
				messages {
					... on UserBookingMessage {
						id
					}
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on CannotBookHimSelfError {
				cannotBookHimSelfError
			}
			... on ExistingBookingError {
				existingBookingError
			}
			... on NotSupportedExtraServiceError {
				notSupportedExtraServiceError
			}
		}
	}
`

export const CONFIRM_BOOKING = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation ConfirmBooking($input: ConfirmBookingInput!) {
		confirmBooking(input: $input) {
			... on Booking {
				id
				ownerConfirmationDate
				operatorConfirmationDate
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
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

export const CANCEL_BOOKING = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CancelBooking($input: CancelBookingInput!) {
		cancelBooking(input: $input) {
			... on Booking {
				id
				ownerConfirmationDate
				operatorConfirmationDate
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
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
export const CANCEL_ON_GOING_BOOKING = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CancelOnGoingBooking($input: CancelOnGoingBookingInput!) {
		cancelOnGoingBooking(input: $input) {
			... on Booking {
				id
				ownerConfirmationDate
				operatorConfirmationDate
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
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

export const AUTHORIZE_PAYMENT = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation AuthorizePayment($id: ID!) {
		authorizePayment(id: $id) {
			... on AuthorizedPayment {
				clientSecret
				stripeTargetApi
				hadRef
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on InvalidOperatorError {
				invalidOperatorError
			}
			... on OperatorCannotProcessPaymentsError {
				operatorCannotProcessPaymentsError
			}
		}
	}
`

export const UPDATE_BOOKING_PAYMENT_STATUS = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	mutation UpdateBookingPaymentStatus($input: UpdateBookingPaymentStatusInput!) {
		updateBookingPaymentStatus(input: $input) {
			... on BooleanResult {
				success
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on PaymentProcessorError {
				paymentProcessorError
			}
		}
	}
`
