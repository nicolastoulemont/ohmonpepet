import { objectType } from 'nexus'

export const donation = objectType({
	name: 'Donation',
	isTypeOf: (data) => Boolean((data as any).amountToDonate),
	definition(t) {
		t.implements('Node')
		t.positiveFloat('amountToDonate')
	}
})
