import { objectType, inputObjectType, enumType, interfaceType, unionType } from 'nexus'
import { PAYMENT_STATUS } from './constants'
import prisma from '../../lib/prisma'
// export * from './mutation'
// export * from './query'
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
		t.list.field('messages', {
			type: 'BookingMessage',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).messages()
		})
		t.list.field('claims', {
			type: 'Claim',
			resolve: async (b) => await prisma.booking.findUnique({ where: { id: b.id } }).claims()
		})
		t.field('payment', {
			type: 'BookingPayment',
			resolve: async (b) =>
				await prisma.booking.findUnique({ where: { id: b.id } }).stripePayment()
		})
		// Need to implement the review relation resolver
	}
})

// export const Booking = objectType({
// 	name: 'Booking',
// 	definition(t) {
// 		t.id('id')
// 		t.id('ownerId', { description: 'The owner profile id' })
// 		t.id('sitterId', { description: 'The sitter profile id' })
// 		t.string('startDate')
// 		t.string('endDate')
// 		t.string('service')
// 		t.float('priceWithoutApplicationFee')
// 		t.float('priceWithApplicationFee')
// 		t.float('applicationFeeAmount')
// 		t.list.string('animalsIds')
// 		t.list.field('selectedOptions', { type: 'BookingOption' })
// 		t.field('sitterOk', { type: 'BookingConfirmation' })
// 		t.field('ownerOk', { type: 'BookingConfirmation' })
// 		t.boolean('canceled')
// 		t.boolean('paymentAuthorized')
// 		t.boolean('underReview')
// 		t.boolean('paid')
// 		t.field('cancellationDetails', { type: 'BookingCancellationDetails' })
// 		t.string('cancellationReason')
// 		t.string('paymentStatus')
// 		t.date('captureDate')
// 		t.field('status', {
// 			type: 'BookingStatus',
// 			// @ts-ignore
// 			resolve(booking) {
// 				const { canceled, sitterOk, ownerOk, paid, paymentAuthorized, underReview } =
// 					booking

// 				if (underReview) {
// 					return 'UNDER_REVIEW'
// 				} else if (paid) {
// 					return 'PAID'
// 				} else if (canceled) {
// 					return 'CANCELED'
// 				} else if (paymentAuthorized) {
// 					return 'PAYMENT_AUTHORIZED'
// 				} else if (sitterOk?.confirm && ownerOk?.confirm) {
// 					return 'BOTH_CONFIRMED'
// 				} else if (!sitterOk?.confirm && ownerOk?.confirm) {
// 					return 'PENDING_SITTER_VALIDATION'
// 				} else if (sitterOk?.confirm && !ownerOk?.confirm) {
// 					return 'PENDING_OWNER_VALIDATION'
// 				} else {
// 					return 'NONE_CONFIRMED'
// 				}
// 			},
// 		})
// 		t.date('createdAt')
// 		t.date('updatedAt')
// 		t.id('lastUpdatedBy')
// 		t.field('owner', {
// 			type: 'Profile',
// 			// @ts-ignore
// 			async resolve(booking, _, { loaders: { BookingOwnerLoader } }) {
// 				return await BookingOwnerLoader.load(booking.ownerId)
// 			},
// 		})
// 		t.field('sitter', {
// 			type: 'Profile',
// 			// @ts-ignore
// 			async resolve(booking, _, { loaders: { BookingSitterLoader } }) {
// 				return await BookingSitterLoader.load(booking.sitterId)
// 			},
// 		})
// 		t.list.field('reviews', {
// 			type: 'Review',
// 			// @ts-ignore
// 			async resolve(booking, _, { loaders: { BookingReviewLoader } }) {
// 				return await BookingReviewLoader.load({
// 					id: booking.id,
// 					searchKey: 'bookingId',
// 					additionalParams: {},
// 				})
// 			},
// 		})
// 		t.list.field('messages', {
// 			type: 'Message',
// 			async resolve(booking, _, { loaders: { BookingMessagesLoader } }) {
// 				return await BookingMessagesLoader.load({
// 					id: booking.id,
// 					searchKey: 'bookingId',
// 					additionalParams: {},
// 				})
// 			},
// 		})
// 	},
// })
