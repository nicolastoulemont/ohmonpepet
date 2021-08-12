import { inputObjectType, mutationField, nonNull, unionType, arg, idArg, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../../utils'
import prisma from '../../../lib/prisma'

export const IndividualOperatorCoreService = objectType({
	name: 'IndividualOperatorCoreService',
	isTypeOf: (data) => Boolean((data as any).price && (data as any).operatorId),
	definition(t) {
		t.implements('Node')
		t.nonNull.int('price')
		t.nonNull.id('serviceOptionId')
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (c) =>
				await prisma.coreOperatorService.findUnique({ where: { id: c.id } }).operator()
		})
		t.field('service', {
			type: 'ServiceOption',
			resolve: async (c) =>
				await prisma.coreOperatorService.findUnique({ where: { id: c.id } }).service()
		})
	}
})

export const createInvidualOperatorCoreServicesInput = inputObjectType({
	name: 'CreateInvidualOperatorCoreServicesInput',
	definition(t) {
		t.nonNull.int('price')
		t.nonNull.id('serviceOptionId')
	}
})

export const createInvidualOperatorCoreServicesResult = unionType({
	name: 'CreateInvidualOperatorCoreServicesResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createInvidualOperatorCoreServices = mutationField(
	'createInvidualOperatorCoreServices',
	{
		type: 'CreateInvidualOperatorCoreServicesResult',
		args: {
			input: nonNull(arg({ type: 'CreateInvidualOperatorCoreServicesInput' }))
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		validation: (args) => checkArgs(args, ['price', 'serviceOptionId']),
		async resolve(_, { input: { price, serviceOptionId } }, { user: { operatorId } }) {
			try {
				await prisma.coreOperatorService.create({
					data: {
						operatorId: operatorId as string,
						price,
						serviceOptionId
					}
				})
				return { success: true }
			} catch (error) {
				console.error(error)
				return UnableToProcessError
			}
		}
	}
)

export const UpdateInvidualOperatorCoreServicesInput = inputObjectType({
	name: 'UpdateInvidualOperatorCoreServicesInput',
	definition(t) {
		t.nonNull.int('price')
		t.nonNull.id('serviceOptionId')
		t.nonNull.id('coreOperatorServiceId')
	}
})

export const UpdateInvidualOperatorCoreServicesResult = unionType({
	name: 'UpdateInvidualOperatorCoreServicesResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const UpdateInvidualOperatorCoreServices = mutationField(
	'updateInvidualOperatorCoreServices',
	{
		type: 'UpdateInvidualOperatorCoreServicesResult',
		args: {
			input: nonNull(arg({ type: 'UpdateInvidualOperatorCoreServicesInput' }))
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		validation: (args) =>
			checkArgs(args, ['price', 'serviceOptionId', 'coreOperatorServiceId']),
		async resolve(
			_,
			{ input: { price, serviceOptionId, coreOperatorServiceId } },
			{ user: { operatorId } }
		) {
			try {
				await prisma.coreOperatorService.update({
					where: { id: coreOperatorServiceId },
					data: {
						operatorId: operatorId as string,
						price,
						serviceOptionId
					}
				})
				return { success: true }
			} catch (error) {
				console.error(error)
				return UnableToProcessError
			}
		}
	}
)

export const DeleteInvidualOperatorCoreServicesResult = unionType({
	name: 'DeleteInvidualOperatorCoreServicesResult',
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

export const DeleteCoreIndividualOperatorService = mutationField(
	'deleteCoreIndividualOperatorService',
	{
		type: 'DeleteInvidualOperatorCoreServicesResult',
		args: {
			id: nonNull(idArg())
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		validation: (args) => checkArgs(args, ['id']),
		async resolve(_, { id }, { user: { operatorId } }) {
			try {
				const deleted = await prisma.coreOperatorService.deleteMany({
					where: { id, AND: [{ operatorId }] }
				})

				if (deleted.count === 0) return NotFoundError

				return { success: true }
			} catch (error) {
				console.error(error)
				return UnableToProcessError
			}
		}
	}
)
