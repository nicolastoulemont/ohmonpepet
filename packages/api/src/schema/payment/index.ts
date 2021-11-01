import { enumType, interfaceType, objectType } from 'nexus'
import prisma from '../../lib/prisma'

export const paymentStatus = enumType({
	name: 'PaymentStatus',
	description: 'All possible payment status',
	members: [
		'PENDING_AUTHORIZATION',
		'SETUP_INTENT_PENDING_CONFIRMATION',
		'SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION',
		'FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS',
		'FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED',
		'FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR',
		'FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED_MAIL_SENT',
		'FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT',
		'FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT',
		'ERROR_SENDING_AUTH_REQUIRED_MAIL',
		'ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL',
		'ERROR_SENDING_UNKOWN_ERROR_MAIL',
		'AUTHORIZED_REQUIRE_CAPTURE',
		'AUTHORIZED_BUT_CANCELLED',
		'CAPTURED_AND_PAID',
		'FAILED_CAPTURE'
	]
})

export const payment = interfaceType({
	name: 'Payment',
	definition(t) {
		t.implements('Node')
		t.id('bookingId')
		t.nonNull.field('status', { type: 'PaymentStatus' })
	}
})

export const stripePayment = objectType({
	name: 'StripePayment',
	isTypeOf: (data) =>
		Boolean(
			(data as any).status && ((data as any).setupIntentId || (data as any).paymentIntentId)
		),
	definition(t) {
		t.implements('Payment')
		t.string('errorCode')
		t.datetime('expectedPaymentIntentCaptureDate')
		t.field('booking', {
			type: 'Booking',
			resolve: async (m) =>
				await prisma.stripePayment.findUnique({ where: { id: m.id } }).booking()
		})
	}
})
