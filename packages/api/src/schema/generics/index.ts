import { interfaceType, objectType } from 'nexus'

export const Node = interfaceType({
	name: 'Node',
	definition(t) {
		t.nonNull.string('id', { description: 'GUID for a resource' })
	}
})

export const BooleanResult = objectType({
	name: 'BooleanResult',
	isTypeOf: (data) => Boolean((data as any).success),
	definition(t) {
		t.field('success', { type: 'Boolean' })
	}
})
