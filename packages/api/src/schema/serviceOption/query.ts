import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const serviceOptionByIdResult = unionType({
	name: 'ServiceOptionByIdResult',
	description: 'The result of the serviceOptionById query',
	definition(t) {
		t.members(
			'ServiceOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const serviceOptionById = queryField('serviceOptionById', {
	type: 'ServiceOptionByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.serviceOption.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const serviceOptionsList = objectType({
	name: 'ServiceOptionsList',
	isTypeOf: (data) => Boolean((data as any).serviceOptions),
	description: 'List of serviceOptions',
	definition(t) {
		t.list.field('serviceOptions', { type: 'ServiceOption' })
	}
})

export const serviceOptionsResult = unionType({
	name: 'ServiceOptionsResult',
	description: 'The result of the servicesOptions query',
	definition(t) {
		t.members(
			'ServiceOptionsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const serviceOptions = queryField('servicesOptions', {
	type: 'ServiceOptionsResult',
	async resolve() {
		try {
			const serviceOptions = await prisma.serviceOption.findMany()
			return { serviceOptions }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
