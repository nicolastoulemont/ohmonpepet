import { inputObjectType, mutationField, nonNull, unionType, arg } from 'nexus'
import { NotFoundError, PartialInvalidArgumentsError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const createIndividualOperatorInput = inputObjectType({
	name: 'CreateIndividualOperatorInput',
	definition(t) {
		t.nonNull.date('birthDate')
		t.nonNull.string('description')
		t.nonNull.id('mainMediaId')
		t.nonNull.list.nonNull.id('acceptedSpecieOptionsIds')
		t.nonNull.list.nonNull.id('languageOptionIds')
		t.nonNull.list.nonNull.id('ownAnimalsSpecieOptionsIds')
		t.nonNull.string('genderOptionId')
		t.nonNull.string('hostingOptionId')
		t.string('partnerId')
		t.int('partnerPercentage')
		t.id('stripeAccountId')
	}
})

export const createIndividualOperatorResult = unionType({
	name: 'CreateIndividualOperatorResult',
	description: 'The result of the createIndividualOperator mutation',
	definition(t) {
		t.members('IndividualOperator', 'InvalidArgumentsError', 'UnableToProcessError')
	}
})

export const createIndividualOperator = mutationField('createIndividualOperator', {
	type: 'CreateIndividualOperatorResult',
	args: {
		input: nonNull(arg({ type: createIndividualOperatorInput }))
	},
	async resolve(_, { input }, { user }) {
		const existingOperator = await prisma.operator.findUnique({
			where: { accountId: user.accountId }
		})

		if (existingOperator) {
			return {
				...PartialInvalidArgumentsError,
				invalidArguments: [
					{ key: 'operator', message: 'This account already has an operator' }
				]
			}
		} else {
			try {
				return await prisma.operator.create({
					data: {
						accountId: user.accountId,
						...input
					}
				})
			} catch (error) {
				return UnableToProcessError
			}
		}
	}
})

export const updateIndividualOperatorInput = inputObjectType({
	name: 'UpdateIndividualOperatorInput',
	definition(t) {
		t.date('birthDate')
		t.string('description')
		t.id('mainMediaId')
		t.list.id('acceptedSpecieOptionsIds')
		t.list.id('languageOptionIds')
		t.list.id('ownAnimalsSpecieOptionsIds')
		t.string('genderOptionId')
		t.string('hostingOptionId')
		t.string('partnerId')
		t.int('partnerPercentage')
		t.id('stripeAccountId')
	}
})

export const updateIndividualOperatorResult = unionType({
	name: 'UpdateIndividualOperatorResult',
	description: 'The result of the updateIndividualOperator mutation',
	definition(t) {
		t.members(
			'IndividualOperator',
			'InvalidArgumentsError',
			'UnableToProcessError',
			'NotFoundError'
		)
	}
})

export const updateIndividualOperator = mutationField('updateIndividualOperator', {
	type: 'IndividualOperatorResult',
	args: {
		input: nonNull(arg({ type: createIndividualOperatorInput }))
	},
	async resolve(_, { input }, { user }) {
		try {
			const operator = await prisma.operator.update({
				where: { accountId: user.accountId },
				data: { ...input }
			})
			if (!operator) return NotFoundError
			return operator
		} catch (error) {
			return UnableToProcessError
		}
	}
})