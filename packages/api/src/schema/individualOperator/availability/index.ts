import {
	inputObjectType,
	mutationField,
	nonNull,
	unionType,
	arg,
	idArg,
	objectType,
	list
} from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../../utils'
import prisma from '../../../lib/prisma'
import { subDays } from 'date-fns'

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
		t.nonNull.list.nonNull.date('dates')
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
	validation: (args) => checkArgs(args, ['dates']),
	async resolve(_, { input: { dates } }, { user: { operatorId } }) {
		try {
			const existingOperatorUpComingAvailabilities =
				await prisma.operatorAvailability.findMany({
					where: {
						date: { gte: subDays(new Date(), 1) },
						operatorId
					},
					select: {
						date: true
					}
				})

			const existingOperatorUpComingDates = existingOperatorUpComingAvailabilities.map(
				(a) => a.date
			)
			const guarantedNewDates = dates
				.filter((date) => !existingOperatorUpComingDates.includes(date))
				.map((date) => ({ date, operatorId: operatorId as string }))

			await prisma.operatorAvailability.createMany({
				data: guarantedNewDates
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
		ids: nonNull(list(nonNull(idArg())))
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	validation: (args) => checkArgs(args, ['ids']),
	async resolve(_, { ids }, { user: { operatorId } }) {
		try {
			const deleted = await prisma.operatorAvailability.deleteMany({
				where: { id: { in: ids }, operatorId }
			})

			if (deleted.count === 0) return NotFoundError

			return { success: true }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})
