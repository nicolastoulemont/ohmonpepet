import prisma from '../../lib/prisma'
import { idArg, nonNull, queryField, unionType, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'

export const userByIdResult = unionType({
	name: 'UserByIdResult',
	description: 'The result of the userById query',
	definition(t) {
		t.members(
			'User',
			'NotFoundError',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError'
		)
	}
})

export const userById = queryField('userById', {
	type: 'UserByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.user.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (error) {
			return NotFoundError
		}
	}
})

export const usersList = objectType({
	name: 'UsersList',
	isTypeOf: (data) => Boolean((data as any).users),
	description: 'List of users',
	definition(t) {
		t.list.field('users', { type: 'User' })
	}
})

export const allUsersResults = unionType({
	name: 'AllUsersResult',
	description: 'The result of the allUsers query',
	definition(t) {
		t.members(
			'UsersList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const allUsers = queryField('allUsers', {
	type: 'AllUsersResult',
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const users = await prisma.user.findMany()
			return { users }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
