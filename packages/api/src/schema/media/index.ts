import { enumType, interfaceType, objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './query'
export * from './mutation'

export const mediaType = enumType({
	name: 'MediaType',
	members: ['IMAGE', 'VIDEO'],
	description: 'Type of media accepted'
})

export const media = interfaceType({
	name: 'Media',
	description: 'The minimum required fields for media types',
	definition(t) {
		t.implements('Node')
		t.nonNull.url('storeUrl')
		t.field('mediaType', { type: 'MediaType' })
	}
})

export const userMedia = objectType({
	name: 'UserMedia',
	isTypeOf: (data) => Boolean((data as any).userId && !(data as any).operatorId),
	definition(t) {
		t.implements('Media')
		t.id('userId')
		t.field('user', {
			type: 'User',
			resolve: async (m) => await prisma.media.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const operatorMedia = objectType({
	name: 'OperatorMedia',
	isTypeOf: (data) => Boolean((data as any).operatorId && !(data as any).userId),
	definition(t) {
		t.implements('Media')
		t.id('operatorId')
		t.field('operator', {
			type: 'Operator',
			resolve: async (m) => await prisma.media.findUnique({ where: { id: m.id } }).operator()
		})
	}
})

export const sharedMedia = objectType({
	name: 'SharedMedia',
	isTypeOf: (data) => Boolean((data as any).operatorId && (data as any).userId),
	definition(t) {
		t.implements('Media')
		t.id('operatorId')
		t.id('userId')
		t.field('operator', {
			type: 'Operator',
			resolve: async (m) => await prisma.media.findUnique({ where: { id: m.id } }).operator()
		})
		t.field('user', {
			type: 'User',
			resolve: async (m) => await prisma.media.findUnique({ where: { id: m.id } }).user()
		})
	}
})

export const messageMedia = objectType({
	name: 'MessageMedia',
	isTypeOf: (data) => Boolean((data as any).bookingMessageId),
	definition(t) {
		t.implements('Media')
		t.id('bookingMessageId')
		t.field('message', {
			type: 'BookingMessage',
			resolve: async (m) =>
				await prisma.media.findUnique({ where: { id: m.id } }).bookingMessage()
		})
	}
})

export const donationReceiptMedia = objectType({
	name: 'DonationReceiptMedia',
	isTypeOf: (data) => Boolean((data as any).donationReceiptId),
	definition(t) {
		t.implements('Media')
		t.id('donationReceiptId')
		t.field('donationReceipt', {
			type: 'DonationReceipt',
			resolve: async (m) =>
				await prisma.media.findUnique({ where: { id: m.id } }).donationReceipt()
		})
	}
})

export const LanguageOptionMedia = objectType({
	name: 'LanguageOptionMedia',
	isTypeOf: (data) => Boolean((data as any).languageOptionId),
	definition(t) {
		t.implements('Media')
		t.id('languageOptionId')
		t.field('language', {
			type: 'LanguageOption',
			resolve: async (m) =>
				await prisma.media.findUnique({ where: { id: m.id } }).languageOption()
		})
	}
})

export const PartnerMedia = objectType({
	name: 'PartnerMedia',
	isTypeOf: (data) => Boolean((data as any).partnerId),
	definition(t) {
		t.implements('Media')
		t.id('partnerId')
		t.field('partner', {
			type: 'Partner',
			resolve: async (m) => await prisma.media.findUnique({ where: { id: m.id } }).partner()
		})
	}
})
