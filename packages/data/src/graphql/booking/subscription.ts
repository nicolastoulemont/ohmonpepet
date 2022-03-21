import gql from 'graphql-tag'
import { USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS } from '../errors'

export const SUBSCRIBE_TO_BOOKING_MESSAGES = gql`
  ${USER_AUTH_FIELDS}
  ${USER_FORBIDDEN_FIELDS}
  subscription SubscribeToBookingMessages($bookingId: ID!) {
    bookingByIdChatSub(bookingId: $bookingId) {
      ... on UserBookingMessage {
        id
        userId
        readAt
        content
      }
      ... on OperatorBookingMessage {
        id
        operatorId
        readAt
        content
      }
      ... on UserForbiddenError {
        ...UserForbiddenFields
      }
      ... on UserAuthenticationError {
        ...UserAuthFields
      }
    }
  }
`

export const SUBSCRIBE_TO_USER_BOOKING_MESSAGES_CHANGES = gql`
  ${USER_AUTH_FIELDS}
  ${USER_FORBIDDEN_FIELDS}
  subscription SubscribeToUserBookingsMessagesChanges(
    $bookingsIds: [ID!]
    $authorId: ID
  ) {
    userBookingsMessagesChangesSub(
      bookingIds: $bookingsIds
      authorId: $authorId
    ) {
      ... on UserBookingMessage {
        id
        bookingId
        userId
        readAt
        content
        user {
          firstName
          avatar {
            storeUrl
          }
        }
      }
      ... on OperatorBookingMessage {
        id
        bookingId
        operatorId
        readAt
        content
        operator {
          avatar {
            storeUrl
          }
          account {
            user {
              firstName
              lastName
            }
          }
        }
      }
      ... on UserForbiddenError {
        ...UserForbiddenFields
      }
      ... on UserAuthenticationError {
        ...UserAuthFields
      }
    }
  }
`

export const SUBSCRIBE_TO_USER_BOOKING_STATUS_CHANGES = gql`
  ${USER_AUTH_FIELDS}
  ${USER_FORBIDDEN_FIELDS}
  subscription SubscribeToUserBookingsStatusChanges($bookingsIds: [ID!]) {
    userBookingsStatusChangesSub(bookingIds: $bookingsIds) {
      ... on Booking {
        id
        status
        startDate
        endDate
        lastUpdatedBy
        user {
          id
          firstName
          lastName
        }
        operator {
          id
          account {
            user {
              firstName
              lastName
            }
          }
          avatar {
            storeUrl
          }
        }
      }
      ... on UserForbiddenError {
        ...UserForbiddenFields
      }
      ... on UserAuthenticationError {
        ...UserAuthFields
      }
    }
  }
`

export const SUBSCRIBE_TO_NEWLY_CREATED_BOOKING_AS_SITTER = gql`
  ${USER_AUTH_FIELDS}
  ${USER_FORBIDDEN_FIELDS}
  subscription SubscribeToNewlyCreatedBookingsAsSitter($sitterId: ID) {
    newlyCreatedBookingsAsSitterSub(sitterId: $sitterId) {
      ... on Booking {
        id
        startDate
        endDate
        priceWithOutApplicationFee
      }
      ... on UserForbiddenError {
        ...UserForbiddenFields
      }
      ... on UserAuthenticationError {
        ...UserAuthFields
      }
    }
  }
`
