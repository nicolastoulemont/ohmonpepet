import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createSpecieOptionInput = inputObjectType({
	name: 'CreateSpecieOptionInput',
	definition(t) {
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
	}
})

export const createSpecieOptionResult = unionType({
	name: 'CreateSpecieOptionResult',
	definition(t) {
		t.members(
			'SpecieOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const createSpecieOption = mutationField('createSpecieOption', {
	type: 'CreateSpecieOptionResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateSpecieOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const specieOption = await prisma.specieOption.create({
				data: {
					nameEn,
					nameFr,
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return specieOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateSpecieOptionInput = inputObjectType({
	name: 'UpdateSpecieOptionInput',
	definition(t) {
		t.string('nameFr')
		t.string('nameEn')
	}
})

export const updateSpecieOptionResult = unionType({
	name: 'UpdateSpecieOptionResult',
	definition(t) {
		t.members(
			'SpecieOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const updateSpecieOption = mutationField('updateSpecieOption', {
	type: 'UpdateSpecieOptionResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateSpecieOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { id, input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const specieOption = await prisma.specieOption.update({
				where: {
					id
				},
				data: {
					...(nameEn && { nameEn }),
					...(nameFr && { nameFr }),
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return specieOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteSpecieOptionResult = unionType({
	name: 'DeleteSpecieOptionResult',
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

export const deleteSpecieOption = mutationField('deleteSpecieOption', {
	type: 'DeleteSpecieOptionResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			await prisma.specieOption.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return NotFoundError
		}
	}
})
