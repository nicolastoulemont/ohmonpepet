import { inputObjectType, mutationField, nonNull, unionType, arg, idArg, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../../utils'
import prisma from '../../../lib/prisma'

export const OperatorAvailability = objectType({
	name: 'OperatorAvailability',
	isTypeOf: (data) => Boolean((data as any).date && (data as any).operatorId),
	definition(t) {
		t.implements('Node')
		t.date('date')
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (o) =>
				await prisma.operatorAvailability.findUnique({ where: { id: o.id } }).operator()
		})
	}
})

export const createOperatorAvailabilityInput = inputObjectType({
	name: 'CreateOperatorAvailabilityInput',
	definition(t) {
		t.nonNull.date('date')
	}
})

export const createOperatorAvailabilityResult = unionType({
	name: 'CreateOperatorAvailabilityResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createOperatorAvailability = mutationField('createOperatorAvailability', {
	type: 'CreateOperatorAvailabilityResult',
	args: {
		input: nonNull(arg({ type: 'CreateOperatorAvailabilityInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	validation: (args) => checkArgs(args, ['date']),
	async resolve(_, { input: { date } }, { user: { operatorId } }) {
		try {
			await prisma.operatorAvailability.create({
				data: {
					operatorId: operatorId as string,
					date
				}
			})
			return { success: true }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})

export const DeleteOperatorAvailabilityResult = unionType({
	name: 'DeleteOperatorAvailabilityResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError',
			'NotFoundError'
		)
	}
})

export const DeleteOperatorAvailability = mutationField('deleteOperatorAvailability', {
	type: 'DeleteOperatorAvailabilityResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { operatorId } }) {
		try {
			const deleted = await prisma.operatorAvailability.deleteMany({
				where: { id, operatorId }
			})

			if (deleted.count === 0) return NotFoundError

			return { success: true }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})
