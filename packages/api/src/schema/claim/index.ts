import { interfaceType, objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'

export const claim = interfaceType({
	name: 'Claim',
	definition(t) {
		t.implements('Node')
		t.nonNull.string('reason')
		t.nonNull.id('bookingId')
	}
})

export const userClaim = objectType({
	name: 'UserClaim',
	isTypeOf: (data) => Boolean((data as any).userId && !(data as any).operatorId),
	definition(t) {
		t.implements('Claim')
		t.id('userId')
		// Add booking resolver
		t.field('user', {
			type: 'User',
			resolve: async (m) =>
				await prisma.bookingClaim.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const operatorClaim = objectType({
	name: 'OperatorClaim',
	isTypeOf: (data) => Boolean((data as any).operatorId && !(data as any).userId),
	definition(t) {
		t.implements('Claim')
		t.id('operatorId')
		// Add booking resolver
		t.field('operator', {
			type: 'Operator',
			resolve: async (m) =>
				await prisma.bookingClaim.findUnique({ where: { id: m.id } }).operator()
		})
	}
})
