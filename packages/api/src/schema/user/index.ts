import { objectType } from 'nexus'
export * from './query'
import prisma from '../../lib/prisma'

export const user = objectType({
	isTypeOf: (data) => Boolean((data as any).firstName),
	name: 'User',
	definition(t) {
		t.implements('Actor')
		t.nonNull.string('firstName')
		t.string('lastName')
		t.string('avatarMediaId')
		t.field('avatar', {
			type: 'Media',
			resolve: async (i) =>
				await prisma.media.findUnique({ where: { id: i.avatarMediaId as string } })
		})
		t.field('account', {
			type: 'Account',
			resolve: async (i) =>
				await prisma.user
					.findUnique({
						where: { id: i.id }
					})
					.account()
		})
	}
})
