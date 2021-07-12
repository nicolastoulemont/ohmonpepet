import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const specieOptionByIdResult = unionType({
	name: 'SpecieOptionByIdResult',
	description: 'The result of the accountById query',
	definition(t) {
		t.members(
			'Account',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const specieOptionById = queryField('specieOptionById', {
	type: 'SpecieOptionByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.specieOption.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const specieOptionsList = objectType({
	name: 'SpecieOptionsList',
	isTypeOf: (data) => Boolean((data as any).specieOptions),
	description: 'List of specieOptions',
	definition(t) {
		t.list.field('specieOptions', { type: 'SpecieOption' })
	}
})

export const specieOptionsResult = unionType({
	name: 'SpecieOptionsResult',
	description: 'The result of the accounts query',
	definition(t) {
		t.members(
			'SpecieOptionsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const specieOptions = queryField('allAccounts', {
	type: 'SpecieOptionsResult',
	description: 'Access restricted to admin users',
	// authorization: (ctx) => authorize(ctx, 'admin'),
	async resolve() {
		try {
			const specieOptions = await prisma.specieOption.findMany()
			return { specieOptions }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
