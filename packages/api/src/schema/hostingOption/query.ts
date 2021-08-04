import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const hostingOptionByIdResult = unionType({
	name: 'HostingOptionByIdResult',
	description: 'The result of the hostingOptionById query',
	definition(t) {
		t.members('Account', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const hostingOptionById = queryField('hostingOptionById', {
	type: 'HostingOptionByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.hostingOption.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const hostingOptionsList = objectType({
	name: 'HostingOptionsList',
	isTypeOf: (data) => Boolean((data as any).hostingOptions),
	description: 'List of HostingOptions',
	definition(t) {
		t.list.field('hostingOptions', { type: 'HostingOption' })
	}
})

export const hostingOptionsResult = unionType({
	name: 'HostingOptionsResult',
	description: 'The result of the hostingsOptions query',
	definition(t) {
		t.members('HostingOptionsList', 'UnableToProcessError')
	}
})

export const hostingOptions = queryField('hostingsOptions', {
	type: 'HostingOptionsResult',
	async resolve() {
		try {
			const hostingOptions = await prisma.hostingOption.findMany()
			return { hostingOptions }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
