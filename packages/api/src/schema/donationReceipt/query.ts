import { queryField, idArg, nonNull, unionType, objectType, inputObjectType, arg } from 'nexus'
import { checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const DonationReceiptByIdResult = unionType({
	name: 'DonationReceiptByIdResult',
	definition(t) {
		t.members('DonationReceipt', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const receiptById = queryField('receiptById', {
	type: 'DonationReceiptByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.donationsReceipt.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch {
			return NotFoundError
		}
	}
})

export const DonationReceiptsList = objectType({
	name: 'DonationReceiptsList',
	isTypeOf: (data) => Boolean((data as any).donationReceipts),
	description: 'List of DonationReceipts',
	definition(t) {
		t.list.field('donationReceipts', { type: 'DonationReceipt' })
	}
})

export const DonationReceiptsResult = unionType({
	name: 'DonationReceiptsResult',
	description: 'The result of the gendersOptions query',
	definition(t) {
		t.members('DonationReceiptsList', 'UnableToProcessError')
	}
})

export const DonationReceipts = queryField('donationReceipts', {
	type: 'DonationReceiptsResult',
	async resolve() {
		try {
			const donationReceipts = await prisma.donationsReceipt.findMany()
			return { donationReceipts }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const SearchDonationReceiptssInput = inputObjectType({
	name: 'SearchDonationReceiptsInput',
	definition(t) {
		t.string('partnerId')
		t.date('startDate')
		t.date('endDate')
	}
})

export const SearchDonationReceiptsResult = unionType({
	name: 'SearchDonationReceiptsResult',
	definition(t) {
		t.members('DonationReceiptsList', 'UnableToProcessError', 'InvalidArgumentsError')
	}
})

export const searchDonations = queryField('searchDonationReceipts', {
	type: 'SearchDonationReceiptsResult',
	args: { input: nonNull(arg({ type: 'SearchDonationReceiptsInput' })) },
	async resolve(_, { input: { partnerId, startDate, endDate } }) {
		try {
			const donationReceipts = await prisma.donationsReceipt.findMany({
				where: {
					...(partnerId && { partnerId }),
					...(startDate && { gte: { startDate } }),
					...(endDate && { lte: { endDate } })
				}
			})
			return { donationReceipts }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
