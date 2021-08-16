import { inputObjectType, mutationField, nonNull, unionType, arg, idArg, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../../utils'
import prisma from '../../../lib/prisma'

export const IndividualOperatorExtraService = objectType({
	name: 'IndividualOperatorExtraService',
	isTypeOf: (data) => Boolean((data as any).operatorId),
	definition(t) {
		t.implements('Node')
		t.boolean('atHomeExclusivity')
		t.int('atHomeExlusivityExtraPrice')
		t.boolean('atHomeContinuously')
		t.int('atHomeContinuouslyExtraPrice')
		t.boolean('atHomeOnlyBringPet')
		t.int('atHomeOnlyBringPetExtraPrice')
		t.boolean('atHomeComeGetPet')
		t.int('atHomeComeGetPetExtraPrice')
		t.boolean('atOwnerHomePlantsCare')
		t.int('atOwnerHomePlantsCareExtraPrice')
		t.boolean('atOwnerHomeMail')
		t.int('atOwnerHomeMailExtraPrice')
		t.boolean('atOwnerHomeCurtains')
		t.int('atOwnerHomeCurtainsExtraPrice')
		t.boolean('flexibleCancelation')
		t.boolean('abilityToProvideMedicalCare')
		t.boolean('acceptShortNotice')
		t.boolean('isProfessionalOperator')
		t.field('operator', {
			type: 'IndividualOperator',
			resolve: async (e) =>
				await prisma.extraOperatorService.findUnique({ where: { id: e.id } }).operator()
		})
	}
})

export const invidualOperatorExtraServicesInput = inputObjectType({
	name: 'InvidualOperatorExtraServicesInput',
	definition(t) {
		t.boolean('atHomeExclusivity')
		t.int('atHomeExlusivityExtraPrice')
		t.boolean('atHomeContinuously')
		t.int('atHomeContinuouslyExtraPrice')
		t.boolean('atHomeOnlyBringPet')
		t.int('atHomeOnlyBringPetExtraPrice')
		t.boolean('atHomeComeGetPet')
		t.int('atHomeComeGetPetExtraPrice')
		t.boolean('atOwnerHomePlantsCare')
		t.int('atOwnerHomePlantsCareExtraPrice')
		t.boolean('atOwnerHomeMail')
		t.int('atOwnerHomeMailExtraPrice')
		t.boolean('atOwnerHomeCurtains')
		t.int('atOwnerHomeCurtainsExtraPrice')
		t.boolean('flexibleCancelation')
		t.boolean('abilityToProvideMedicalCare')
		t.boolean('acceptShortNotice')
		t.boolean('isProfessionalOperator')
	}
})

export const createInvidualOperatorExtraServicesResult = unionType({
	name: 'CreateInvidualOperatorExtraServicesResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createInvidualOperatorExtraServices = mutationField(
	'createInvidualOperatorExtraServices',
	{
		type: 'CreateInvidualOperatorExtraServicesResult',
		args: {
			input: nonNull(arg({ type: 'InvidualOperatorExtraServicesInput' }))
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		async resolve(_, { input }, { user: { operatorId } }) {
			try {
				await prisma.extraOperatorService.create({
					data: {
						operatorId: operatorId as string,
						...input
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

export const UpdateInvidualOperatorExtraServicesResult = unionType({
	name: 'UpdateInvidualOperatorExtraServicesResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const UpdateInvidualOperatorExtraServices = mutationField(
	'updateInvidualOperatorExtraServices',
	{
		type: 'UpdateInvidualOperatorExtraServicesResult',
		args: {
			id: nonNull(idArg()),
			input: nonNull(arg({ type: 'InvidualOperatorExtraServicesInput' }))
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		async resolve(_, { id, input }, { user: { operatorId } }) {
			try {
				await prisma.extraOperatorService.update({
					where: { id },
					data: {
						operatorId: operatorId as string,
						...input
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

export const DeleteInvidualOperatorExtraServicesResult = unionType({
	name: 'DeleteInvidualOperatorExtraServicesResult',
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

export const DeleteExtraIndividualOperatorService = mutationField(
	'deleteExtraIndividualOperatorService',
	{
		type: 'DeleteInvidualOperatorExtraServicesResult',
		args: {
			id: nonNull(idArg())
		},
		authorization: (ctx) => authorize(ctx, 'operator'),
		validation: (args) => checkArgs(args, ['id']),
		async resolve(_, { id }, { user: { operatorId } }) {
			try {
				const deleted = await prisma.extraOperatorService.deleteMany({
					where: { id, operatorId }
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
