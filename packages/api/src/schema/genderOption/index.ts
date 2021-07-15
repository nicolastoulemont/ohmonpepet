import { objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const GenderOption = objectType({
	name: 'GenderOption',
	isTypeOf: (data) => Boolean((data as any).nameFr && (data as any).nameEn),
	definition(t) {
		t.id('id')
		t.id('adminId')
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
		t.date('createdAt')
		t.date('updatedAt')
	}
})
