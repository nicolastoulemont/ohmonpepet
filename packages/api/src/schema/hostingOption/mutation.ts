import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createHostingOptionInput = inputObjectType({
	name: 'CreateHostingOptionInput',
	definition(t) {
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
	}
})

export const createHostingOptionResult = unionType({
	name: 'CreateHostingOptionResult',
	definition(t) {
		t.members(
			'HostingOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const createHostingOption = mutationField('createHostingOption', {
	type: 'CreateHostingOptionResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateHostingOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const HostingOption = await prisma.hostingOption.create({
				data: {
					nameEn,
					nameFr,
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return HostingOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const updateHostingOptionInput = inputObjectType({
	name: 'UpdateHostingOptionInput',
	definition(t) {
		t.string('nameFr')
		t.string('nameEn')
	}
})

export const updateHostingOptionResult = unionType({
	name: 'UpdateHostingOptionResult',
	definition(t) {
		t.members(
			'HostingOption',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const updateHostingOption = mutationField('updateHostingOption', {
	type: 'UpdateHostingOptionResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateHostingOptionInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['nameFr', 'nameEn']),
	async resolve(_, { id, input: { nameEn, nameFr } }, { user: { userId } }) {
		try {
			const HostingOption = await prisma.hostingOption.update({
				where: {
					id
				},
				data: {
					...(nameEn && { nameEn }),
					...(nameFr && { nameFr }),
					staffId: userId // Change to the staffId when staff are done
				}
			})
			return HostingOption
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteHostingOptionResult = unionType({
	name: 'DeleteHostingOptionResult',
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

export const deleteHostingOption = mutationField('deleteHostingOption', {
	type: 'DeleteHostingOptionResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			await prisma.hostingOption.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return NotFoundError
		}
	}
})
