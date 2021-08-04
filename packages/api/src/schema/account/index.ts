import prisma from '../../lib/prisma'
import { objectType, unionType } from 'nexus'
export * from './query'
export * from './mutation'

export const Account = objectType({
	name: 'Account',
	isTypeOf: (data) => Boolean((data as any).email),
	definition(t) {
		t.implements('Node')
		t.email('email')
		t.datetime('verifiedAt')
		t.field('user', {
			type: 'User',
			resolve: async (a) =>
				await prisma.account
					.findUnique({
						where: { id: a.id }
					})
					.user()
		})
		t.field('staff', {
			type: 'Staff',
			resolve: async (a) =>
				await prisma.account
					.findUnique({
						where: { id: a.id }
					})
					.staff()
		})
	}
})

export const AccountResult = unionType({
	name: 'AccountResult',
	description: 'Return an account or account related errors',
	definition(t) {
		t.members(
			'Account',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})
