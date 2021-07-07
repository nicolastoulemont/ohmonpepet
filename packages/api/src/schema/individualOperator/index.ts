import { objectType, unionType } from 'nexus'
import prisma from '../../lib/prisma'
// export * from './query'
export * from './mutation'

export const IndividualOperator = objectType({
	isTypeOf: (data) => Boolean((data as any).birthDate),
	name: 'IndividualOperator',
	definition(t) {
		t.implements('Operator')
		t.date('birthDate')
		t.string('genderOptionId')
		t.field('account', {
			type: 'Account',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.account()
		})
	}
})

export const IndividualOperatorResult = unionType({
	name: 'IndividualOperatorResult',
	description: 'Return an individual operator or related errors',
	definition(t) {
		t.members(
			'IndividualOperator',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})
