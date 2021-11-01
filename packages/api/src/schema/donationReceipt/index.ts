import prisma from '../../lib/prisma'
import { objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const donationReceipt = objectType({
	name: 'DonationReceipt',
	isTypeOf: (data) => Boolean((data as any).amountDonated),
	definition(t) {
		t.implements('Node')
		t.positiveFloat('amountDonated')
		t.field('partner', {
			type: 'Partner',
			resolve: async (d) =>
				await prisma.donationsReceipt.findUnique({ where: { id: d.id } }).partner()
		})
		t.list.field('donations', {
			type: 'Donation',
			resolve: async (d) =>
				await prisma.donationsReceipt.findUnique({ where: { id: d.id } }).donations()
		})
		t.list.field('files', {
			type: 'Media',
			resolve: async (d) =>
				await prisma.donationsReceipt.findUnique({ where: { id: d.id } }).files()
		})
	}
})
