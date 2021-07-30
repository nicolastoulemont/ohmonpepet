import { objectType } from 'nexus'
export * from './query'

export const user = objectType({
	isTypeOf: (data) => Boolean((data as any).firstName),
	name: 'User',
	definition(t) {
		t.implements('Actor')
		t.nonNull.string('firstName')
		t.string('lastName')
	}
})
