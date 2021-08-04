import { objectType } from 'nexus'

export * from './mutation'
export * from './query'

export const donationReceipt = objectType({
	name: 'DonationReceipt',
	isTypeOf: (data) => Boolean((data as any).amountDonated),
	definition(t) {
		t.implements('Node')
		t.positiveFloat('amountDonated')
	}
})
