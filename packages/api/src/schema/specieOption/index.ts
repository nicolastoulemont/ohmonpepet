import { objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const SpecieOption = objectType({
	name: 'SpecieOption',
	isTypeOf: (data) => Boolean((data as any).nameFr && (data as any).nameEn),
	definition(t) {
		t.implements('Node')
		t.id('adminId')
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
	}
})
