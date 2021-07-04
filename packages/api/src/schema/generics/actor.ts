import { interfaceType } from 'nexus'

export const Actor = interfaceType({
	name: 'Actor',
	description: 'Represent the minimal fields required for any actors',
	definition(t) {
		t.implements('Node')
		t.implements('TimeStamps')
		t.id('accountId')
	}
})
