import gql from 'graphql-tag'
import { USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS } from '../errors'

export const SUBSCRIBE_TO_PENDING_PAYMENT_CRON = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	subscription SubscribeToPendingPaymentCron {
		pendingPaymentCronSub {
			... on BooleanResult {
				success
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

export const SUBSCRIBE_TO_SETUP_INTENT_CRON = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	subscription SubscribeToSetupIntentCron {
		setupIntentCronSub {
			... on BooleanResult {
				success
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
export const SUBSCRIBE_TO_ERRORS_EMAILS_CRON = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	subscription SubscribeToErrorsEmailCron {
		errorsEmailCronSub {
			... on BooleanResult {
				success
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
