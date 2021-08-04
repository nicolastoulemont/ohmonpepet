import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const genderOptionByIdResult = unionType({
	name: 'GenderOptionByIdResult',
	description: 'The result of the genderOptionById query',
	definition(t) {
		t.members('GenderOption', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const genderOptionById = queryField('genderOptionById', {
	type: 'GenderOptionByIdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.genderOption.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const genderOptionsList = objectType({
	name: 'GenderOptionsList',
	isTypeOf: (data) => Boolean((data as any).genderOptions),
	description: 'List of genderOptions',
	definition(t) {
		t.list.field('genderOptions', { type: 'GenderOption' })
	}
})

export const genderOptionsResult = unionType({
	name: 'GenderOptionsResult',
	description: 'The result of the gendersOptions query',
	definition(t) {
		t.members('GenderOptionsList', 'UnableToProcessError')
	}
})

export const genderOptions = queryField('gendersOptions', {
	type: 'GenderOptionsResult',
	async resolve() {
		try {
			const genderOptions = await prisma.genderOption.findMany()
			return { genderOptions }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
