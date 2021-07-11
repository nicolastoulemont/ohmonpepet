import { interfaceType, objectType } from 'nexus'
import prisma from '../../lib/prisma'
// export * from './query'
export * from './mutation'

export const bookingMessage = interfaceType({
	name: 'BookingMessage',
	description: 'The minimum required fields for message types',
	definition(t) {
		t.implements('Node')
		t.nonNull.string('content')
		t.datetime('readAt')
		// Add booking related fields
		t.list.field('medias', {
			type: 'Media',
			resolve: async (m) =>
				await prisma.bookingMessage.findUnique({ where: { id: m.id } }).medias()
		})
	}
})

export const userBookingMessage = objectType({
	name: 'UserBookingMessage',
	isTypeOf: (data) => Boolean((data as any).userId && !(data as any).operatorId),
	definition(t) {
		t.implements('BookingMessage')
		t.id('userId')
		t.field('user', {
			type: 'User',
			resolve: async (m) =>
				await prisma.bookingMessage.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const operatorBookingMessage = objectType({
	name: 'OperatorBookingMessage',
	isTypeOf: (data) => Boolean((data as any).operatorId && !(data as any).userId),
	definition(t) {
		t.implements('BookingMessage')
		t.id('operatorId')
		t.field('operator', {
			type: 'Operator',
			resolve: async (m) =>
				await prisma.bookingMessage.findUnique({ where: { id: m.id } }).operator()
		})
	}
})
