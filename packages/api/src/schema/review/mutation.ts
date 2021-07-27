import { inputObjectType, arg, mutationField, idArg, nonNull, unionType, stringArg } from 'nexus'
import prisma from '../../lib/prisma'
import {
	checkArgs,
	authorize,
	NotFoundError,
	UnableToProcessError,
	PartialInvalidArgumentsError
} from '../../utils'

export const createReviewInput = inputObjectType({
	name: 'CreateReviewInput',
	definition(t) {
		t.nonNull.string('bookingId')
		t.nonNull.string('title')
		t.string('body')
		t.nonNull.positiveFloat('score')
		t.nonNull.string('saveAs')
	}
})

export const createReviewResult = unionType({
	name: 'CreateReviewResult',
	definition(t) {
		t.members(
			'UserReview',
			'OperatorReview',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createReview = mutationField('createReview', {
	type: 'CreateReviewResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateReviewInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['title', 'score', 'bookingId', 'saveAs:saveAs']),
	async resolve(
		_,
		{ input: { title, body, score, bookingId, saveAs } },
		{ user: { userId, operatorId } }
	) {
		try {
			if (saveAs === 'operator' && !operatorId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot save as operator, please create an operator profile'
						}
					]
				}
			}

			const review = await prisma.review.create({
				data: {
					title,
					body,
					score,
					bookingId,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'user' && { userId })
				}
			})

			return review
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateReviewInput = inputObjectType({
	name: 'UpdateReviewInput',
	definition(t) {
		t.nonNull.string('title')
		t.string('body')
		t.nonNull.positiveFloat('score')
	}
})

export const updateReviewResult = unionType({
	name: 'UpdateReviewResult',
	definition(t) {
		t.members(
			'UserReview',
			'OperatorReview',
			'NotFoundError',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const updateReview = mutationField('updateReview', {
	type: 'UpdateReviewResult',
	args: {
		id: nonNull(idArg()),
		saveAs: nonNull(stringArg()),
		input: nonNull(
			arg({
				type: 'UpdateReviewInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'saveAs', 'title', 'score']),
	async resolve(_, { id, saveAs, input }, { user: { userId, operatorId } }) {
		try {
			if (saveAs === 'operator' && !operatorId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot update as operator, please create an operator profile'
						}
					]
				}
			}

			const review = await prisma.review.update({
				where: {
					id,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'user' && { userId })
				},
				data: { ...input }
			})
			return review
		} catch (err) {
			return NotFoundError
		}
	}
})

export const deleteReviewResult = unionType({
	name: 'DeleteReviewResult',
	description: 'The result of the deleteReview mutation',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const deleteReview = mutationField('deleteReview', {
	type: 'DeleteReviewResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId, operatorId } }) {
		try {
			const [review] = await prisma.review.findMany({
				where: { id, AND: [{ OR: [{ userId }, { operatorId }] }] }
			})

			if (!review) return NotFoundError

			await prisma.review.delete({ where: { id: review.id } })

			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
