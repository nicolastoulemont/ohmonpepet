import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createGenderOptionInput = inputObjectType({
	name: 'CreateGenderOptionInput',
	definition(t) {
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
	}
})

export const createGenderOptionResult = unionType({
	name: 'CreateGenderOptionResult',
	definition(t) {
		t.members(
			'GenderOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const createGenderOption = mutationField('createGenderOption', {
	type: 'CreateGenderOptionResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateGenderOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const genderOption = await prisma.genderOption.create({
				data: {
					nameEn,
					nameFr,
					adminId: userId // Change to the adminId when admins are done
				}
			})
			return genderOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateGenderOptionInput = inputObjectType({
	name: 'UpdateGenderOptionInput',
	definition(t) {
		t.string('nameFr')
		t.string('nameEn')
	}
})

export const updateGenderOptionResult = unionType({
	name: 'UpdateGenderOptionResult',
	definition(t) {
		t.members(
			'GenderOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const updateGenderOption = mutationField('updateGenderOption', {
	type: 'UpdateGenderOptionResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateGenderOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { id, input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const genderOption = await prisma.genderOption.update({
				where: {
					id
				},
				data: {
					...(nameEn && { nameEn }),
					...(nameFr && { nameFr }),
					adminId: userId // Change to the adminId when admins are done
				}
			})
			return genderOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteGenderOptionResult = unionType({
	name: 'DeleteGenderOptionResult',
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

export const deleteGenderOption = mutationField('deleteGenderOption', {
	type: 'DeleteGenderOptionResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'admin'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			await prisma.genderOption.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return NotFoundError
		}
	}
})
