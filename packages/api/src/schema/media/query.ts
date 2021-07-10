import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const currentUserMediaResult = unionType({
	name: 'CurrentUserMediaResult',
	description: 'The result of the currentUserMedia query',
	definition(t) {
		t.members(
			'UserMedia',
			'SharedMedia',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError'
		)
	}
})

export const currentUserMedia = queryField('currentUserMedia', {
	type: 'CurrentUserMediaResult',
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, __, { user }) {
		try {
			return await prisma.media.findMany({
				where: { userId: user.userId }
			})
		} catch (error) {
			return NotFoundError
		}
	}
})

export const currentOperatorMediaResult = unionType({
	name: 'CurrentOperatorMediaResult',
	description: 'The result of the currentOperatorMedia query',
	definition(t) {
		t.members(
			'OperatorMedia',
			'SharedMedia',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError'
		)
	}
})

export const currentOperatorMedia = queryField('currentOperatorMedia', {
	type: 'CurrentOperatorMediaResult',
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, __, { user }) {
		try {
			return await prisma.media.findMany({
				where: { operatorId: user.operatorId }
			})
		} catch (error) {
			return NotFoundError
		}
	}
})

export const mediaByIdResult = unionType({
	name: 'MediaByIdResult',
	description: 'The result of the mediaById query',
	definition(t) {
		t.members(
			'UserMedia',
			'OperatorMedia',
			'SharedMedia',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const mediaById = queryField('mediaById', {
	type: 'MediaByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.media.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const mediasList = objectType({
	name: 'MediasList',
	isTypeOf: (data) => Boolean((data as any).medias),
	description: 'List of medias',
	definition(t) {
		t.list.field('medias', { type: 'Media' })
	}
})

export const mediasResult = unionType({
	name: 'MediasResult',
	description: 'The result of the accounts query',
	definition(t) {
		t.members(
			'MediasList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const medias = queryField('medias', {
	type: 'MediasResult',
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'admin'),
	async resolve() {
		try {
			const medias = await prisma.media.findMany()
			return { medias }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
