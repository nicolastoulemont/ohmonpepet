import { interfaceType } from 'nexus'

export const Operator = interfaceType({
	name: 'Operator',
	description: 'Represent the required fields of commercial operators on the plateform.',
	definition(t) {
		t.implements('Actor')
		t.string('description')
		t.string('avatarMediaId')
		t.list.string('acceptedSpecieOptionsIds')
		t.list.string('ownAnimalsSpecieOptionsIds')
		t.list.string('languageOptionIds')
		t.string('hostingOptionId')
		t.datetime('calendarUpdate')
		t.string('partnerId')
		t.int('partnerPercentage')
		t.string('stripeAccountId')
	}
})
