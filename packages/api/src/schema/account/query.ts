import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const currentAccountResult = unionType({
	name: 'CurrentAccountResult',
	description: 'The result of the currentAccount query',
	definition(t) {
		t.members('Account', 'UserAuthenticationError', 'NotFoundError')
	}
})

export const currentAccount = queryField('currentAccount', {
	type: 'CurrentAccountResult',
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, __, { user }) {
		try {
			return await prisma.account.findUnique({
				where: { id: user.accountId },
				rejectOnNotFound: true
			})
		} catch (error) {
			return NotFoundError
		}
	}
})

export const accountByIdResult = unionType({
	name: 'AccountByIdResult',
	description: 'The result of the accountById query',
	definition(t) {
		t.members(
			'Account',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const accountById = queryField('accountById', {
	type: 'AccountByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.account.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const accountsList = objectType({
	name: 'AccountsList',
	isTypeOf: (data) => Boolean((data as any).accounts),
	description: 'List of accounts',
	definition(t) {
		t.list.field('accounts', { type: 'Account' })
	}
})

export const allAccountsResult = unionType({
	name: 'AllAccountsResult',
	description: 'The result of the accounts query',
	definition(t) {
		t.members(
			'AccountsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const allAccounts = queryField('allAccounts', {
	type: 'AllAccountsResult',
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const accounts = await prisma.account.findMany()
			return { accounts }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
