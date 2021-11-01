import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS, UNABLE_TO_PROCESS_FIELDS } from '../errors'
export const CREATE_BOOKING_AD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation CreateBookingAd($input: CreateBookingAdInput!) {
		createBookingAd(input: $input) {
			... on BookingAd {
				id
				createdAt
				updatedAt
				animalsSpeciesIds
				startDate
				endDate
				serviceOptionId
				description
				location {
					latitude
					longitude
				}
			}
			... on PreExistingUserAdError {
				preExistingUserAdError
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
export const UPDATE_BOOKING_AD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation UpdateBookingAd($id: ID!, $input: UpdateBookingAdInput!) {
		updateBookingAd(id: $id, input: $input) {
			... on BookingAd {
				id
				createdAt
				updatedAt
				animalsSpeciesIds
				startDate
				endDate
				serviceOptionId
				description
				location {
					latitude
					longitude
				}
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const DELETE_BOOKING_AD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation DeleteBookingAd($id: ID!) {
		deleteBookingAd(id: $id) {
			... on BooleanResult {
				success
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const BID_FOR_BOOKING_AD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation BidForBookingAd($id: ID!) {
		bidForBookingAd(id: $id) {
			... on BooleanResult {
				success
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
export const REMOVE_BOOKING_AD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation RemoveBidForBookingAd($id: ID!) {
		removeBidForBookingAd(id: $id) {
			... on BooleanResult {
				success
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
