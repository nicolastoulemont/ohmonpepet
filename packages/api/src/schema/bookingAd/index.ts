import { objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'

export const BookingAd = objectType({
	name: 'BookingAd',
	isTypeOf: (data) => Boolean((data as any).userId && (data as any).serviceOptionId),
	definition(t) {
		t.implements('Node')
		t.nonNull.list.nonNull.string('animalsSpeciesIds')
		t.date('startDate')
		t.date('endDate')
		t.string('description')
		t.float('serviceMaxPrice')
		t.nonNull.string('serviceOptionId')
		t.field('service', {
			type: 'ServiceOption',
			resolve: async ({ id }) =>
				await prisma.bookingAd.findUnique({ where: { id } }).service()
		})
		t.list.field('animals', {
			type: 'SpecieOption',
			resolve: async ({ animalsSpeciesIds }) =>
				await prisma.specieOption.findMany({ where: { id: { in: animalsSpeciesIds } } })
		})
		t.field('user', {
			type: 'User',
			resolve: async ({ id }) => await prisma.bookingAd.findUnique({ where: { id } }).user()
		})
		t.list.field('bids', {
			type: 'Operator',
			resolve: async ({ id }) => await prisma.bookingAd.findUnique({ where: { id } }).bids()
		})
	}
})

export const BookingAdBid = objectType({
	name: 'BookingAdBid',
	isTypeOf: (data) => Boolean((data as any).operatorId && (data as any).bookingAdId),
	definition(t) {
		t.implements('Node')
		t.field('bookingAd', {
			type: 'BookingAd',
			resolve: async ({ id }) =>
				await prisma.bookingAdBid.findUnique({ where: { id } }).bookingAd()
		})
		t.field('operator', {
			type: 'Operator',
			resolve: async ({ id }) =>
				await prisma.bookingAdBid.findUnique({ where: { id } }).operator()
		})
	}
})
