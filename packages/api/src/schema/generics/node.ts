import { interfaceType } from 'nexus'

export const Node = interfaceType({
	name: 'Node',
	definition(t) {
		t.nonNull.string('id', { description: 'GUID for a resource' })
		t.datetime('createdAt')
		t.datetime('updatedAt')
	}
})
