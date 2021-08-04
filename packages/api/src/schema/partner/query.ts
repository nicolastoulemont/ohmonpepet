import { queryField, idArg, arg, nonNull, unionType, objectType, inputObjectType } from 'nexus'
import prisma from '../../lib/prisma'
import { checkArgs, NotFoundError, UnableToProcessError } from '../../utils'

export const PartnerByIdResult = unionType({
	name: 'PartnerByIdResult',
	definition(t) {
		t.members('Partner', 'NotFoundError')
	}
})

export const partnerById = queryField('partnerById', {
	type: 'PartnerByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.partner.findUnique({ where: { id }, rejectOnNotFound: true })
		} catch {
			return NotFoundError
		}
	}
})

export const PartnersList = objectType({
	name: 'PartnersList',
	isTypeOf: (data) => Boolean((data as any).partners),
	description: 'List of partners',
	definition(t) {
		t.list.field('partners', { type: 'Partner' })
	}
})

export const PartnersResult = unionType({
	name: 'PartnersResult',
	description: 'The result of the partners query',
	definition(t) {
		t.members('PartnersList', 'UnableToProcessError')
	}
})

export const Partners = queryField('Partners', {
	type: 'PartnersResult',
	async resolve() {
		try {
			const partners = await prisma.partner.findMany()
			return { partners }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const SearchPartnersInput = inputObjectType({
	name: 'SearchPartnersInput',
	definition(t) {
		t.nonNull.string('query')
	}
})

export const SearchPartnersResult = unionType({
	name: 'SearchPartnersResult',
	definition(t) {
		t.members('PartnersList', 'UnableToProcessError')
	}
})

export const searchPartners = queryField('searchPartners', {
	type: 'SearchPartnersResult',
	args: { input: nonNull(arg({ type: 'SearchPartnersInput' })) },
	async resolve(_, { input: { query } }) {
		try {
			const partners = await prisma.partner.findMany({
				where: {
					OR: [{ name: { contains: query } }, { description: { contains: query } }]
				}
			})
			return { partners }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
