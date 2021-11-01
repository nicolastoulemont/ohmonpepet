import gql from 'graphql-tag'
import { USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS } from '../errors'

export const START_CRON = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation StartCron($cronName: String!) {
		startCron(cronName: $cronName) {
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
export const STOP_CRON = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	mutation StopCron($cronName: String!) {
		stopCron(cronName: $cronName) {
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
