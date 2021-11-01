import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const reviewByIdResult = unionType({
	name: 'ReviewByIdResult',
	description: 'The result of the reviewById query',
	definition(t) {
		t.members(
			'UserReview',
			'OperatorReview',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const reviewById = queryField('reviewById', {
	type: 'ReviewByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.review.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const reviewsList = objectType({
	name: 'ReviewsList',
	isTypeOf: (data) => Boolean((data as any).reviews),
	description: 'List of reviews',
	definition(t) {
		t.list.field('reviews', { type: 'Review' })
	}
})

export const reviewsResult = unionType({
	name: 'ReviewsResult',
	description: 'The result of the reviews query',
	definition(t) {
		t.members(
			'ReviewsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const reviews = queryField('reviews', {
	type: 'ReviewsResult',
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const reviews = await prisma.review.findMany()
			return { reviews }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
