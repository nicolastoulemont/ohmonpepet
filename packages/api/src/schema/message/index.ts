import { interfaceType, objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './query'
export * from './mutation'

export const Message = interfaceType({
	name: 'Message',
	description: 'The minimum required fields for message types',
	definition(t) {
		t.implements('Node')
		t.nonNull.string('content')
		t.datetime('readAt')
		t.list.field('medias', {
			type: 'Media',
			resolve: async (m) => await prisma.message.findUnique({ where: { id: m.id } }).medias()
		})
	}
})

export const BookingMessage = interfaceType({
	name: 'BookingMessage',
	definition(t) {
		t.implements('Message')
		t.nonNull.id('bookingId')
		t.field('booking', {
			type: 'Booking',
			resolve: async (m) => await prisma.message.findUnique({ where: { id: m.id } }).booking()
		})
	}
})

export const userBookingMessage = objectType({
	name: 'UserBookingMessage',
	isTypeOf: (data) => Boolean((data as any).userId && (data as any).bookingId),
	definition(t) {
		t.implements('BookingMessage')
		t.nonNull.id('userId')
		t.field('user', {
			type: 'User',
			resolve: async (m) => await prisma.message.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const operatorBookingMessage = objectType({
	name: 'OperatorBookingMessage',
	isTypeOf: (data) => Boolean((data as any).operatorId && (data as any).bookingId),
	definition(t) {
		t.implements('BookingMessage')
		t.nonNull.id('operatorId')
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (m) =>
				await prisma.message.findUnique({ where: { id: m.id } }).operator()
		})
	}
})

export const staffBookingMessage = objectType({
	name: 'StaffBookingMessage',
	isTypeOf: (data) => Boolean((data as any).staffId && (data as any).bookingId),
	definition(t) {
		t.implements('BookingMessage')
		t.nonNull.id('staffId')
		t.field('staff', {
			type: 'Staff',
			resolve: async (m) => await prisma.message.findUnique({ where: { id: m.id } }).staff()
		})
	}
})
