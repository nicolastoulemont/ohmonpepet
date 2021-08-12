import { queryField, idArg, arg, inputObjectType, nonNull, unionType, objectType } from 'nexus'
import {
	checkArgs,
	authorize,
	NotFoundError,
	getIntervalDaysAsDates,
	getIntervalDaysAsStrings,
	UnableToProcessError,
	defineGeometricQuerySquare
} from '../../utils'
import { subDays, format } from 'date-fns'
import prisma from '../../lib/prisma'

export const OperatorByIdResult = unionType({
	name: 'OperatorByIdResult',
	definition(t) {
		t.members('IndividualOperator', 'NotFoundError')
	}
})

export const operatorById = queryField('operatorById', {
	type: 'OperatorByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.operator.findUnique({ where: { id }, rejectOnNotFound: true })
		} catch (err) {
			console.error(err)
			return NotFoundError
		}
	}
})

export const CurrentOperatorResult = unionType({
	name: 'CurrentOperatorResult',
	definition(t) {
		t.members(
			'IndividualOperator',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError'
		)
	}
})

export const currentOperator = queryField('currentOperator', {
	type: 'CurrentOperatorResult',
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, __, { user: { operatorId } }) {
		try {
			return await prisma.operator.findUnique({
				where: { id: operatorId as string },
				rejectOnNotFound: true
			})
		} catch (err) {
			console.error(err)
			return NotFoundError
		}
	}
})

export const operators = objectType({
	name: 'Operators',
	isTypeOf: (data) => Boolean((data as any).operators),
	definition(t) {
		t.list.field('operators', { type: 'IndividualOperator' })
	}
})

export const SearchOperatorsInput = inputObjectType({
	name: 'SearchOperatorsInput',
	definition(t) {
		t.nonNull.latitude('latitude')
		t.nonNull.longitude('longitude')
		t.nonNull.date('startDate')
		t.nonNull.date('endDate')
		t.float('maxDistanceInKms', { default: 10 })
		t.list.nonNull.string('genderOptionId')
		t.list.nonNull.string('hostingOptionId')
		t.list.nonNull.id('languageOptionIds')
		t.list.nonNull.id('ownAnimalsSpecieOptionsIds')
		t.list.nonNull.id('acceptedSpecieOptionsIds')
		t.float('score')
		t.boolean('atHomeExclusivity')
		t.boolean('atHomeContinuously')
		t.boolean('atHomeOnlyBringPet')
		t.boolean('atHomeComeGetPet')
		t.boolean('atOwnerHomePlantsCare')
		t.boolean('atOwnerHomeMail')
		t.boolean('atOwnerHomeCurtains')
		t.boolean('flexibleCancelation')
		t.boolean('abilityToProvideMedicalCare')
		t.boolean('acceptShortNotice')
		t.boolean('isProfessionalOperator')
		t.string('serviceOptionId')
		t.float('serviceMaxPrice')
	}
})

export const SearchOperatorsResult = unionType({
	name: 'SearchOperatorsResult',
	definition(t) {
		t.members('Operators', 'UnableToProcessError')
	}
})

export const searchOperators = queryField('searchOperators', {
	type: 'SearchOperatorsResult',
	args: {
		input: nonNull(
			arg({
				type: 'SearchOperatorsInput'
			})
		)
	},
	async resolve(_, { input }) {
		try {
			const DEFAULT_MAX_DISTANCE = 10
			const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
				defineGeometricQuerySquare(input.maxDistanceInKms || DEFAULT_MAX_DISTANCE, {
					latitude: input.latitude,
					longitude: input.longitude
				})

			const hasExtraServiceRequirements =
				input.atHomeExclusivity ||
				input.atHomeContinuously ||
				input.atHomeOnlyBringPet ||
				input.atHomeComeGetPet ||
				input.atOwnerHomePlantsCare ||
				input.atOwnerHomeMail ||
				input.atOwnerHomeCurtains ||
				input.flexibleCancelation ||
				input.abilityToProvideMedicalCare ||
				input.acceptShortNotice ||
				input.isProfessionalOperator

			const allRequiredDates = getIntervalDaysAsDates(input.startDate, input.endDate)

			const operators = await prisma.operator.findMany({
				where: {
					location: {
						is: {
							latitude: { gte: minLatitude, lte: maxLatitude },
							longitude: { gte: minLongitude, lte: maxLongitude }
						}
					},
					isActive: true,
					...(input.acceptedSpecieOptionsIds && {
						acceptedSpecieOptionsIds: { hasEvery: input.acceptedSpecieOptionsIds }
					}),
					...(input.ownAnimalsSpecieOptionsIds && {
						ownAnimalsSpecieOptionsIds: { hasEvery: input.ownAnimalsSpecieOptionsIds }
					}),
					...(input.languageOptionIds && {
						languageOptionIds: { hasEvery: input.languageOptionIds }
					}),
					...(input.genderOptionId && {
						genderOptionId: { in: input.genderOptionId }
					}),
					...(input.hostingOptionId && {
						hostingOptionId: { in: input.hostingOptionId }
					}),
					...(input.serviceOptionId && {
						coreServices: {
							some: {
								serviceOptionId: { equals: input.serviceOptionId },
								...(input.serviceMaxPrice && {
									price: { lte: input.serviceMaxPrice }
								})
							}
						}
					}),
					// Availabilities input here is incomplete due to the lack of capacity in prisma to filter relations with hasEvery condition
					// We still include a SOME query to reduce the numbers of operators a bit
					availabilities: {
						some: {
							date: {
								gte: subDays(new Date(), 1), // Only dates after yesterday (to avoid false negatives on today)
								in: allRequiredDates
							}
						}
					},
					...(hasExtraServiceRequirements && {
						extraServices: {
							...(input.atHomeExclusivity && { atHomeExclusivity: true }),
							...(input.atHomeContinuously && { atHomeContinuously: true }),
							...(input.atHomeOnlyBringPet && { atHomeOnlyBringPet: true }),
							...(input.atOwnerHomePlantsCare && { atOwnerHomePlantsCare: true }),
							...(input.atOwnerHomeMail && { atOwnerHomeMail: true }),
							...(input.atOwnerHomeCurtains && { atOwnerHomeCurtains: true }),
							...(input.flexibleCancelation && { flexibleCancelation: true }),
							...(input.abilityToProvideMedicalCare && {
								abilityToProvideMedicalCare: true
							}),
							...(input.acceptShortNotice && { acceptShortNotice: true }),
							...(input.isProfessionalOperator && { isProfessionalOperator: true })
						}
					})
				},
				include: {
					availabilities: true
				}
			})

			const allRequiredDays = getIntervalDaysAsStrings(input.startDate, input.endDate)
			const availableOperatorForAllRequiredDates = operators.filter((operator) =>
				allRequiredDays.every((date) =>
					operator.availabilities
						.map((availability) => format(new Date(availability.date), 'yyyy-MM-dd'))
						.includes(date)
				)
			)

			return { operators: availableOperatorForAllRequiredDates }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})

export const AllOperatorsResult = unionType({
	name: 'AllOperatorsResult',
	definition(t) {
		t.members(
			'Operators',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const allOperators = queryField('allOperators', {
	type: 'AllOperatorsResult',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const operators = await prisma.operator.findMany()
			return { operators }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})
