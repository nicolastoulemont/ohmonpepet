import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const languageOptionByIdResult = unionType({
	name: 'LanguageOptionByIdResult',
	description: 'The result of the languageOptionById query',
	definition(t) {
		t.members('LanguageOption', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const languageOptionById = queryField('languageOptionById', {
	type: 'LanguageOptionByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.languageOption.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const languageOptionsList = objectType({
	name: 'LanguageOptionsList',
	isTypeOf: (data) => Boolean((data as any).languageOptions),
	description: 'List of languageOptions',
	definition(t) {
		t.list.field('languageOptions', { type: 'LanguageOption' })
	}
})

export const languageOptionsResult = unionType({
	name: 'LanguageOptionsResult',
	description: 'The result of the languagesOptions query',
	definition(t) {
		t.members('LanguageOptionsList', 'UnableToProcessError')
	}
})

export const languageOptions = queryField('languagesOptions', {
	type: 'LanguageOptionsResult',
	async resolve() {
		try {
			const languageOptions = await prisma.languageOption.findMany()
			return { languageOptions }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
