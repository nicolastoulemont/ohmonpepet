import { ApiContext, RequestWithSession } from '../../config'
import { NexusGenFieldTypes } from '../../schema/nexus-typegen'
import { UserAuthenticationError, UserForbiddenError } from '../errors'
import { UserSessionData } from './types'

export function getUserFromSession(req: RequestWithSession): UserSessionData | undefined {
	if (!req.session.user) return undefined
	return req.session.user
}

export type Access = 'staff' | 'user' | 'operator'

export function authorize(
	ctx: ApiContext,
	requiredAccess: Access
):
	| NexusGenFieldTypes['UserAuthenticationError']
	| NexusGenFieldTypes['UserForbiddenError']
	| undefined {
	const { user } = ctx
	if (user && validateAccess(user, requiredAccess)) {
		return undefined
	} else if (user) {
		return UserForbiddenError
	} else {
		return UserAuthenticationError
	}
}

export const validateAccess = (user: UserSessionData, requiredAccess: Access): boolean => {
	switch (requiredAccess) {
		case 'staff':
			if (user.staffId) {
				return true
			} else {
				return false
			}
		case 'operator':
			if (user.operatorId) {
				return true
			} else {
				return false
			}
		case 'user':
			if (user.userId) {
				return true
			} else {
				return false
			}
		default:
			return false
	}
}
