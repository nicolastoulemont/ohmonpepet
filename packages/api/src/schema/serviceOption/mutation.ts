import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createServiceOptionInput = inputObjectType({
	name: 'CreateServiceOptionInput',
	definition(t) {
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
	}
})

export const createServiceOptionResult = unionType({
	name: 'CreateServiceOptionResult',
	definition(t) {
		t.members(
			'ServiceOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const createServiceOption = mutationField('createServiceOption', {
	type: 'CreateServiceOptionResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateServiceOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { input: { nameEn, nameFr } }, { user: { staffId } }) {
		try {
			const ServiceOption = await prisma.serviceOption.create({
				data: {
					nameEn,
					nameFr,
					staffId: staffId as string
				}
			})
			return ServiceOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateServiceOptionInput = inputObjectType({
	name: 'UpdateServiceOptionInput',
	definition(t) {
		t.string('nameFr')
		t.string('nameEn')
	}
})

export const updateServiceOptionResult = unionType({
	name: 'UpdateServiceOptionResult',
	definition(t) {
		t.members(
			'ServiceOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError',
			'NotFoundError'
		)
	}
})

export const updateServiceOption = mutationField('updateServiceOption', {
	type: 'UpdateServiceOptionResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateServiceOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { id, input: { nameEn, nameFr } }, { user: { staffId } }) {
		try {
			const serviceOption = await prisma.serviceOption.update({
				where: {
					id
				},
				data: {
					...(nameEn && { nameEn }),
					...(nameFr && { nameFr }),
					staffId: staffId as string
				}
			})
			if (!serviceOption) return NotFoundError
			return serviceOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteServiceOptionResult = unionType({
	name: 'DeleteServiceOptionResult',
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

export const deleteServiceOption = mutationField('deleteServiceOption', {
	type: 'DeleteServiceOptionResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			await prisma.serviceOption.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return NotFoundError
		}
	}
})
