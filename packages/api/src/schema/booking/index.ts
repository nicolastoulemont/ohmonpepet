import { objectType, inputObjectType, enumType, unionType } from 'nexus'
import { PAYMENT_STATUS } from './constants'
import prisma from '../../lib/prisma'
// export * from './mutation'
export * from './query'
// export * from './subscriptions'

export const bookingPayment = unionType({
	name: 'BookingPayment',
	definition(t) {
		t.members('StripePayment')
	}
})

export const BookingStatus = enumType({
	name: 'BookingStatus',
	description: 'The booking different possible status',
	members: [
		'UNDER_REVIEW',
		'PAID',
		'CANCELED',
		'PAYMENT_AUTHORIZED',
		'BOTH_CONFIRMED',
		'PENDING_SITTER_VALIDATION',
		'PENDING_OWNER_VALIDATION',
		'NONE_CONFIRMED'
	]
})

export const booking = objectType({
	name: 'Booking',
	isTypeOf: (data) => Boolean((data as any).priceWithOutApplicationFee),
	definition(t) {
		t.implements('Node')
		t.date('startDate')
		t.date('endDate')
		t.list.json('selectedOptions')
		t.positiveFloat('priceWithOutApplicationFee')
		t.positiveFloat('applictionFeeAmount')
		t.list.id('animalsIds')
		t.datetime('operatorConfirmationDate')
		t.datetime('ownerConfirmationDate')
		t.boolean('canceled')
		t.string('canceledBy')
		t.string('canceledReason')
		t.boolean('paid')
		t.boolean('underReview')
		t.field('status', {
			type: 'BookingStatus',
			resolve: async (b) => {
				// Early return to avoid DB joins if not needed
				if (b.underReview) {
					return 'UNDER_REVIEW'
				} else if (b.paid) {
					return 'PAID'
				} else if (b.canceled) {
					return 'CANCELED'
				} else if (!b.operatorConfirmationDate && b.ownerConfirmationDate) {
					return 'PENDING_SITTER_VALIDATION'
				} else if (b.operatorConfirmationDate && !b.ownerConfirmationDate) {
					return 'PENDING_OWNER_VALIDATION'
				} else {
					if (b.operatorConfirmationDate && b.ownerConfirmationDate) {
						// Only execute DB query if needed
						const p = await prisma.booking
							.findUnique({ where: { id: b.id } })
							.stripePayment()

						const isPaymentAuthorized =
							p?.status === PAYMENT_STATUS.AUTHORIZED_REQUIRE_CAPTURE ||
							p?.status ===
								PAYMENT_STATUS.SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION

						if (isPaymentAuthorized) {
							return 'PAYMENT_AUTHORIZED'
						} else {
							return 'BOTH_CONFIRMED'
						}
					} else {
						return 'NONE_CONFIRMED'
					}
				}
			}
		})
		t.field('user', {
			type: 'User',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).user()
		})
		t.field('operator', {
			type: 'Operator',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).operator()
		})
		t.field('service', {
			type: 'ServiceOption',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).service()
		})
		t.field('payment', {
			type: 'BookingPayment',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).stripePayment()
		})
		t.list.field('messages', {
			type: 'BookingMessage',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).messages()
		})
		t.list.field('claims', {
			type: 'Claim',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).claims()
		})
		t.list.field('reviews', {
			type: 'Review',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).reviews()
		})
	}
})
