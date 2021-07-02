import { interfaceType } from 'nexus'

export const actor = interfaceType({
	name: 'Actor',
	description: 'Represent the minimal fields required for any actors',
	definition(t) {
		t.nonNull.id('id')
		t.id('accountId')
		t.nonNull.date('createdAt')
		t.nonNull.date('updatedAt')
	}
})
