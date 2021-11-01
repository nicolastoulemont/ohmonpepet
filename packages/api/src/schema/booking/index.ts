import { objectType, enumType, unionType } from 'nexus'
import { PAYMENT_STATUS } from './constants'
import prisma from '../../lib/prisma'
export * from './mutation'
export * from './query'
export * from './subscriptions'

export const bookingPayment = unionType({
	name: 'BookingPayment',
	definition(t) {
		t.members('StripePayment')
	}
})

export const bookingAnimal = objectType({
	name: 'BookingAnimal',
	isTypeOf: (data) => Boolean((data as any).specieOptionId && (data as any).bookingId),
	definition(t) {
		t.implements('Node')
		t.nonNull.id('specieOptionId')
		t.nonNull.id('bookingId')
		t.field('specie', {
			type: 'SpecieOption',
			resolve: async (i) =>
				await prisma.bookingAnimal
					.findUnique({
						where: { id: i.id }
					})
					.specie()
		})
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
		t.json('selectedOptions')
		t.positiveFloat('priceWithOutApplicationFee')
		t.positiveFloat('applicationFeeAmount')
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
			type: 'IndividualOperator',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).operator()
		})
		t.field('service', {
			type: 'ServiceOption',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).service()
		})
		t.field('payment', {
			type: 'StripePayment',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).stripePayment()
		})
		t.list.field('messages', {
			type: 'BookingMessage',
			// @ts-expect-error
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
		t.list.field('animals', {
			type: 'BookingAnimal',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).animals()
		})
	}
})
