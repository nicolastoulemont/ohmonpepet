import { interfaceType } from 'nexus'

export const TimeStamps = interfaceType({
	name: 'TimeStamps',
	description: 'Represent the createdAt and updatedAt fields',
	definition(t) {
		t.nonNull.datetime('createdAt')
		t.nonNull.datetime('updatedAt')
	}
})
