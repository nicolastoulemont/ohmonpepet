import { queryField, idArg, arg, nonNull, inputObjectType, unionType, objectType } from 'nexus'
import { checkArgs, NotFoundError, authorize, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const donationByIdResult = unionType({
	name: 'DonationByIdResult',
	definition(t) {
		t.members('Donation', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const donationById = queryField('donationById', {
	type: 'DonationByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.donation.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch {
			return NotFoundError
		}
	}
})

export const donationsList = objectType({
	name: 'DonationsList',
	isTypeOf: (data) => Boolean((data as any).donations),
	description: 'List of donations',
	definition(t) {
		t.list.field('donations', { type: 'Donation' })
	}
})

export const donationsResult = unionType({
	name: 'DonationsResult',
	description: 'The result of the donations query',
	definition(t) {
		t.members(
			'DonationsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const donations = queryField('donations', {
	type: 'DonationsResult',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const donations = await prisma.donation.findMany()
			return { donations }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const currentOperatorDonationsResult = unionType({
	name: 'CurrentOperatorDonationsResult',
	definition(t) {
		t.members(
			'DonationsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const currentOperatorDonations = queryField('currentOperatorDonations', {
	type: 'CurrentOperatorDonationsResult',
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, __, { user: { operatorId } }) {
		try {
			const donations = await prisma.donation.findMany({
				where: { operatorId }
			})
			return { donations }
		} catch {
			return UnableToProcessError
		}
	}
})

export const SearchDonationsInput = inputObjectType({
	name: 'SearchDonationsInput',
	definition(t) {
		t.boolean('donated')
		t.string('partnerId')
		t.date('startDate')
		t.date('endDate')
	}
})

export const SearchDonationsResult = unionType({
	name: 'SearchDonationsResult',
	definition(t) {
		t.members('DonationsList', 'UnableToProcessError', 'InvalidArgumentsError')
	}
})

export const searchDonations = queryField('searchDonations', {
	type: 'SearchDonationsResult',
	args: { input: nonNull(arg({ type: 'SearchDonationsInput' })) },
	async resolve(_, { input: { donated, partnerId, startDate, endDate } }) {
		try {
			const donations = await prisma.donation.findMany({
				where: {
					...(donated && { donated }),
					...(partnerId && { partnerId }),
					...(startDate && { gte: { startDate } }),
					...(endDate && { lte: { endDate } })
				}
			})
			return { donations }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
