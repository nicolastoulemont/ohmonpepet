import prisma from '../../lib/prisma'
import { interfaceType, objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const Review = interfaceType({
	name: 'Review',
	definition(t) {
		t.implements('Node')
		t.id('bookingId')
		t.nonNull.float('score')
		t.nonNull.string('title')
		t.string('body')
		t.field('booking', {
			type: 'Booking',
			resolve: async (r) => await prisma.review.findUnique({ where: { id: r.id } }).booking()
		})
	}
})

export const userReview = objectType({
	name: 'UserReview',
	isTypeOf: (data) => Boolean((data as any).userId && !(data as any).operatorId),
	definition(t) {
		t.implements('Review')
		t.id('userId')
		t.field('user', {
			type: 'User',
			resolve: async (m) =>
				await prisma.bookingMessage.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const operatorReview = objectType({
	name: 'OperatorReview',
	isTypeOf: (data) => Boolean((data as any).operatorId && !(data as any).userId),
	definition(t) {
		t.implements('Review')
		t.id('operatorId')
		t.field('operator', {
			type: 'Operator',
			resolve: async (m) =>
				await prisma.bookingMessage.findUnique({ where: { id: m.id } }).operator()
		})
	}
})
