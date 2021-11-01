import { inputObjectType, mutationField, nonNull, unionType, arg, idArg } from 'nexus'
import prisma from '../../lib/prisma'
import {
	checkArgs,
	authorize,
	UnableToProcessError,
	PartialInvalidArgumentsError,
	NotFoundError
} from '../../utils'

export const createBookingClaimResult = unionType({
	name: 'CreateBookingClaimResult',
	definition(t) {
		t.members(
			'Claim',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UnableToProcessError'
		)
	}
})

export const CreateBookingClaimInput = inputObjectType({
	name: 'CreateBookingClaimInput',
	definition(t) {
		t.nonNull.string('bookingId')
		t.nonNull.string('reason')
		t.nonNull.id('userId')
		t.nonNull.id('operatorId')
	}
})

export const createBookingClaim = mutationField('createBookingClaim', {
	type: 'CreateBookingClaimResult',
	args: { input: nonNull(arg({ type: 'CreateBookingClaimInput' })) },
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['reason', 'bookingId', 'userId', 'operatorId']),
	async resolve(_, { input: { bookingId, reason, userId, operatorId } }) {
		try {
			const user = await prisma.user.findUnique({ where: { id: userId } })
			if (!user) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'userId', message: 'Invalid userId' }]
				}
			}
			const operator = await prisma.operator.findUnique({ where: { id: operatorId } })
			if (!operator) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'operator', message: 'Invalid operatorId' }]
				}
			}

			const claim = await prisma.bookingClaim.create({
				data: {
					bookingId,
					reason,
					operatorId,
					userId
				}
			})

			await prisma.booking.update({
				where: { id: bookingId },
				data: { underReview: true }
			})
			return claim
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const deleteClaimResult = unionType({
	name: 'DeleteClaimResult',
	description: 'The result of the deleteClaim mutation',
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

export const deleteClaim = mutationField('deleteClaim', {
	type: 'DeleteClaimResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId, operatorId } }) {
		try {
			const [claim] = await prisma.bookingClaim.findMany({
				where: { id, OR: [{ userId }, { operatorId }] }
			})

			if (!claim) return NotFoundError

			await prisma.bookingClaim.delete({ where: { id: claim.id } })

			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
