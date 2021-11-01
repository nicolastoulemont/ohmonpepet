import { objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './query'

export const donation = objectType({
	name: 'Donation',
	isTypeOf: (data) => Boolean((data as any).amountToDonate),
	definition(t) {
		t.implements('Node')
		t.positiveFloat('amountToDonate')
		t.datetime('donationDate')
		t.nonNull.id('partnerId')
		t.field('booking', {
			type: 'Booking',
			resolve: async (d) =>
				await prisma.donation.findUnique({ where: { id: d.id } }).booking()
		})
		t.field('partner', {
			type: 'Partner',
			resolve: async (d) =>
				await prisma.donation.findUnique({ where: { id: d.id } }).partner()
		})
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (d) =>
				await prisma.donation.findUnique({ where: { id: d.id } }).operator()
		})
	}
})
