import { objectType } from 'nexus'
export * from './query'
export * from './mutation'

export const Staff = objectType({
	name: 'Staff',
	isTypeOf: (data) => Boolean((data as any).phoneNumber && (data as any).access === 'staff'),
	definition(t) {
		t.implements('Node')
		t.string('email')
		t.string('access')
		t.string('phoneNumber')
	}
})
