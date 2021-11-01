import { objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'

export const claim = objectType({
	name: 'Claim',
	isTypeOf: (data) => Boolean((data as any).reason && (data as any).bookingId),
	definition(t) {
		t.implements('Node')
		t.nonNull.string('reason')
		t.nonNull.id('bookingId')
		t.field('booking', {
			type: 'Booking',
			resolve: async (m) =>
				await prisma.bookingClaim.findUnique({ where: { id: m.id } }).booking()
		})
		t.field('user', {
			type: 'User',
			resolve: async (m) =>
				await prisma.bookingClaim.findUnique({ where: { id: m.id } }).user()
		})
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (m) =>
				await prisma.bookingClaim.findUnique({ where: { id: m.id } }).operator()
		})
	}
})
