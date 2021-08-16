import { objectType } from 'nexus'
import prisma from '../../lib/prisma'

export const Location = objectType({
	name: 'Location',
	isTypeOf: (data) => Boolean((data as any).longitude && (data as any).latitude),
	definition(t) {
		t.implements('Node')
		t.nonNull.longitude('longitude')
		t.nonNull.latitude('latitude')
		t.string('address')
		t.string('country')
		t.string('country_code')
		t.string('postcode')
		t.field('operator', {
			type: 'Operator',
			resolve: async (l) =>
				await prisma.location.findUnique({ where: { id: l.id } }).operator()
		})
		t.field('bookingAd', {
			type: 'BookingAd',
			resolve: async (l) =>
				await prisma.location.findUnique({ where: { id: l.id } }).bookingAd()
		})
	}
})
