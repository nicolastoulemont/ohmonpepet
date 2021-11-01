import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS
} from '../errors'

export const CREATE_ACCOUNT = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation CreateAccount($input: CreateAccountInput!) {
		createAccount(input: $input) {
			... on Account {
				id
				email
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

export const SIGN_IN = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation SignIn($input: EmailAndPasswordInput!) {
		signIn(input: $input) {
			... on Account {
				id
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

export const SIGN_OUT = gql`
	${USER_AUTH_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation SignOut {
		signOut {
			... on BooleanResult {
				success
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

export const SEND_VERIFICATION_EMAIL = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation SendVerificationEmail($email: String!) {
		sendVerificationEmail(email: $email) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const VERIFY_USER = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation VerifyUser($input: VerifyUserInput!) {
		verifyUser(input: $input) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

// TO_DO

// export const CONNECT_USER_TO_PROCESSOR = gql`
// 	mutation ConnectUserToProcessor {
// 		connectUserToProcessor {
// 			redirectUrl
// 			errors {
// 				key
// 				message
// 			}
// 		}
// 	}
// `

// export const VERIFY_USER_PROCESSOR_CONNECTION_COMPLETION = gql`
// 	mutation VerifyUserProcessorConnectionCompletion {
// 		verifyUserProcessorConnectionCompletion {
// 			success
// 			errors {
// 				key
// 				message
// 			}
// 		}
// 	}
// `

export const DELETE_ACCOUNT = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation DeleteAccount($confirmPassword: String!) {
		deleteAccount(confirmPassword: $confirmPassword) {
			... on BooleanResult {
				success
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const LOST_PASSWORD = gql`
	${NOT_FOUND_FIELDS}
	mutation LostPassword($email: String!) {
		lostPassword(email: $email) {
			... on BooleanResult {
				success
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const RESET_PASSWORD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation ResetPassword($input: ResetPasswordInput!) {
		resetPassword(input: $input) {
			... on BooleanResult {
				success
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

export const MODIFY_PASSWORD = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	mutation ModifyPassword($password: String!, $newPassword: String!) {
		modifyPassword(password: $password, newPassword: $newPassword) {
			... on Account {
				id
			}
			... on NotFoundError {
				...NotFoundFields
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

export const MODIFY_EMAIL = gql`
	mutation ModifyEmail($email: String!) {
		modifyEmail(email: $email) {
			... on Account {
				id
			}
			... on NotFoundError {
				...NotFoundFields
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
