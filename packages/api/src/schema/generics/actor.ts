import { interfaceType } from 'nexus'

export const Actor = interfaceType({
	name: 'Actor',
	description: 'Represent the minimal fields required for any actors',
	definition(t) {
		t.nonNull.id('id')
		t.id('accountId')
		t.nonNull.datetime('createdAt')
		t.nonNull.datetime('updatedAt')
	}
})
