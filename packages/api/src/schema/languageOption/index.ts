import { objectType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'

export const LanguageOption = objectType({
	name: 'LanguageOption',
	isTypeOf: (data) => Boolean((data as any).nameFr && (data as any).nameEn),
	definition(t) {
		t.implements('Node')
		t.nonNull.string('nameFr')
		t.nonNull.string('nameEn')
		t.field('media', {
			type: 'Media',
			resolve: async (m) =>
				await prisma.languageOption.findUnique({ where: { id: m.id } }).media()
		})
	}
})
