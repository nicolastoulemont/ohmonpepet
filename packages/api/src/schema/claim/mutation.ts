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
			'UserClaim',
			'OperatorClaim',
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
		t.nonNull.saveAs('saveAs')
	}
})

export const createBookingClaim = mutationField('createBookingClaim', {
	type: 'CreateBookingClaimResult',
	args: { input: nonNull(arg({ type: CreateBookingClaimInput })) },
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['reason', 'bookingId', 'saveAs:saveAs']),
	async resolve(_, { input: { bookingId, reason, saveAs } }, { user: { userId, operatorId } }) {
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

			const claim = await prisma.bookingClaim.create({
				data: {
					bookingId,
					reason,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'user' && { userId })
				}
			})

			await prisma.booking.update({
				where: { id: bookingId },
				data: { underReview: true }
			})
			return { claim }
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
				where: { id, AND: [{ OR: [{ userId }, { operatorId }] }] }
			})

			if (!claim) return NotFoundError

			await prisma.bookingClaim.delete({ where: { id: claim.id } })

			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
