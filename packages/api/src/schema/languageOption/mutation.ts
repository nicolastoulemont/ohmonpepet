import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createLanguageOptionInput = inputObjectType({
	name: 'CreateLanguageOptionInput',
	definition(t) {
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
		t.nonNull.string('mediaId')
	}
})

export const createLanguageOptionResult = unionType({
	name: 'CreateLanguageOptionResult',
	definition(t) {
		t.members(
			'LanguageOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const createLanguageOption = mutationField('createLanguageOption', {
	type: 'CreateLanguageOptionResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateLanguageOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn', 'mediaId']),
	async resolve(_, { input }, { user: { userId } }) {
		try {
			const LanguageOption = await prisma.languageOption.create({
				data: {
					...input,
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return LanguageOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateLanguageOptionInput = inputObjectType({
	name: 'UpdateLanguageOptionInput',
	definition(t) {
		t.string('nameFr')
		t.string('nameEn')
		t.id('mediaId')
	}
})

export const updateLanguageOptionResult = unionType({
	name: 'UpdateLanguageOptionResult',
	definition(t) {
		t.members(
			'LanguageOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const updateLanguageOption = mutationField('updateLanguageOption', {
	type: 'UpdateLanguageOptionResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateLanguageOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { id, input: { nameEn, nameFr, mediaId } }, { user: { userId } }) {
		try {
			const LanguageOption = await prisma.languageOption.update({
				where: {
					id
				},
				data: {
					...(nameEn && { nameEn }),
					...(nameFr && { nameFr }),
					...(mediaId && { mediaId }),
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return LanguageOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteLanguageOptionResult = unionType({
	name: 'DeleteLanguageOptionResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError'
		)
	}
})

export const deleteLanguageOption = mutationField('deleteLanguageOption', {
	type: 'DeleteLanguageOptionResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			await prisma.languageOption.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return NotFoundError
		}
	}
})
