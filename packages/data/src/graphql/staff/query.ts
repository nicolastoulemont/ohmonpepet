import gql from 'graphql-tag'
import { NOT_FOUND_FIELDS, USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS } from '../errors'
export const CURRENT_STAFF_USER = gql`
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query CurrentStaff {
		currentStaff {
			... on Staff {
				id
				email
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

export const GET_CRON_STATUS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query GetCronStatus($cronName: String!) {
		getCronStatus(cronName: $cronName) {
			... on CronStatus {
				status
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
