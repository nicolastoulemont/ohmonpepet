import { objectType } from 'nexus'

export const BooleanResult = objectType({
	name: 'BooleanResult',
	isTypeOf: (data) => Boolean((data as any).success),
	definition(t) {
		t.field('success', { type: 'Boolean' })
	}
})
