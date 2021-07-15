import { objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const LanguageOption = objectType({
	name: 'LanguageOption',
	isTypeOf: (data) =>
		Boolean((data as any).nameFr && (data as any).nameEn && (data as any).iconUrl),
	definition(t) {
		t.id('id')
		t.id('adminId')
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
		t.nonNull.string('iconUrl')
		t.date('createdAt')
		t.date('updatedAt')
	}
})
