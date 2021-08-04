import { objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'

export const Partner = objectType({
	name: 'Partner',
	isTypeOf: (data) => Boolean((data as any).websiteUrl),
	definition(t) {
		t.implements('Node')
		t.nonNull.string('name')
		t.nonNull.string('description')
		t.nonNull.string('websiteUrl')
		t.field('creator', {
			type: 'Staff',
			resolve: async (p) => await prisma.partner.findUnique({ where: { id: p.id } }).creator()
		})
		t.list.field('donations', {
			type: 'Donation',
			resolve: async (p) =>
				await prisma.partner.findUnique({ where: { id: p.id } }).donations()
		})
		t.list.field('receipts', {
			type: 'DonationReceipt',
			resolve: async (p) =>
				await prisma.partner.findUnique({ where: { id: p.id } }).donationsReceipts()
		})
		t.list.field('medias', {
			type: 'Media',
			description: 'Contains the partner logo',
			resolve: async (p) => await prisma.partner.findUnique({ where: { id: p.id } }).medias()
		})
	}
})
