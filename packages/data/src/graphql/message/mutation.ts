import gql from 'graphql-tag'
import { MESSAGE_FIELDS } from './fragment'
import {
	INVALID_ARGUMENTS_FIELDS,
	USER_AUTH_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS
} from '../errors'

export const CREATE_MESSAGE = gql`
	${USER_AUTH_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${MESSAGE_FIELDS}
	mutation CreateMessage($input: CreateMessageInput!) {
		createMessage(input: $input) {
			... on UserBookingMessage {
				...MessageFields
			}
			... on OperatorBookingMessage {
				...MessageFields
			}
			... on StaffBookingMessage {
				...MessageFields
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

export const UPDATE_MESSAGE = gql`
	${USER_AUTH_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${MESSAGE_FIELDS}
	mutation UpdateMessage($id: ID!, $input: UpdateMessageInput!) {
		updateMessage(id: $id, input: $input) {
			... on UserBookingMessage {
				...MessageFields
			}
			... on OperatorBookingMessage {
				...MessageFields
			}
			... on StaffBookingMessage {
				...MessageFields
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
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const SET_MESSAGES_AS_READ = gql`
	${USER_AUTH_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	mutation SetAsRead($input: SetMessagesAsReadInput!) {
		setAsRead(input: $input) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
		}
	}
`
