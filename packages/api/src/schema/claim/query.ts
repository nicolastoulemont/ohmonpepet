import { queryField, idArg, nonNull, unionType, objectType } from 'nexus'
import { checkArgs, authorize, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const ClaimByIdResult = unionType({
	name: 'ClaimByIdResult',
	definition(t) {
		t.members(
			'UserClaim',
			'OperatorClaim',
			'NotFoundError',
			'UserAuthenticationError',
			'UserForbiddenError'
		)
	}
})

export const claimById = queryField('claimById', {
	type: 'ClaimByIdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.bookingClaim.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch {
			return NotFoundError
		}
	}
})

export const ClaimsList = objectType({
	name: 'ClaimsList',
	isTypeOf: (data) => Boolean((data as any).claims),
	description: 'List of booking messages',
	definition(t) {
		t.list.field('claims', { type: 'Claim' })
	}
})

export const ClaimsResult = unionType({
	name: 'ClaimsResult',
	description: 'The result of the bookingMessages query',
	definition(t) {
		t.members(
			'ClaimsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const Claims = queryField('claims', {
	type: 'ClaimsResult',
	description: 'Access restricted to admin users',
	// authorization: (ctx) => authorize(ctx, 'admin'),
	async resolve() {
		try {
			const claims = await prisma.bookingClaim.findMany()
			return { claims }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
