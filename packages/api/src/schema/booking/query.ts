import {
	queryField,
	idArg,
	arg,
	nonNull,
	stringArg,
	booleanArg,
	floatArg,
	unionType,
	inputObjectType,
	objectType
} from 'nexus'
import { checkArgs, authorize, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'
// import { withDates } from '../shared'

export const BookingByIdResult = unionType({
	name: 'BookingByIdResult',
	definition(t) {
		t.members('Booking', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const bookingById = queryField('bookingById', {
	type: 'BookingByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.booking.findUnique({ where: { id }, rejectOnNotFound: true })
		} catch {
			return NotFoundError
		}
	}
})

// export const currentUserBookings = queryField('currentUserBookings', {
// 	type: 'BookingsResponse',
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	async resolve(_, __, ctx) {
// 		try {
// 			const bookings = await BookingModel.find({
// 				$or: [{ ownerId: ctx.user.profileId }, { sitterId: ctx.user.profileId }]
// 			}).sort({ updatedAt: 'descending' })

// 			return { bookings }
// 		} catch {
// 			return NotFoundError
// 		}
// 	}
// })

export const CurrentUserBookingFilterInput = inputObjectType({
	name: 'CurrentUserBookingFilterInput',
	definition(t) {
		t.string('sortKey')
		t.string('sortValue')
		t.boolean('includeFinished')
		t.id('serviceOptionId')
		t.date('startDate')
		t.date('endDate')
	}
})

export const BookingsList = objectType({
	name: 'BookingsList',
	isTypeOf: (data) => Boolean((data as any).bookings),
	description: 'List of bookings',
	definition(t) {
		t.list.field('bookings', { type: 'Booking' })
	}
})

export const CurrentUserBookingsResult = unionType({
	name: 'CurrentUserBookingsResult',
	definition(t) {
		t.members(
			'BookingsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

type SortKey = 'startDate' | 'endDate' | 'priceWithOutApplicationFee'

export const currentUserOwnerBookings = queryField('currentUserOwnerBookings', {
	type: 'CurrentUserBookingsResult',
	args: {
		input: nonNull(arg({ type: 'CurrentUserBookingFilterInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(
		_,
		{ input: { sortKey, sortValue, includeFinished, serviceOptionId, startDate, endDate } },
		{ user: { userId } }
	) {
		try {
			const bookings = await prisma.booking.findMany({
				where: {
					userId,
					...(includeFinished && { paid: true }),
					...(includeFinished && { canceled: true }),
					...(startDate && { startDate: { gte: new Date(startDate) } }),
					...(endDate && { endDate: { lte: new Date(endDate) } }),
					...(serviceOptionId && { serviceOptionId })
				},
				orderBy: {
					[sortKey as SortKey]: sortValue as 'asc' | 'desc'
				}
			})
			return { bookings }
		} catch {
			return UnableToProcessError
		}
	}
})
export const currentUserOperatorBookings = queryField('currentUserOperatorBookings', {
	type: 'CurrentUserBookingsResult',
	args: {
		input: nonNull(arg({ type: 'CurrentUserBookingFilterInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(
		_,
		{ input: { sortKey, sortValue, includeFinished, serviceOptionId, startDate, endDate } },
		{ user: { operatorId } }
	) {
		try {
			const bookings = await prisma.booking.findMany({
				where: {
					operatorId,
					...(includeFinished && { paid: true }),
					...(includeFinished && { canceled: true }),
					...(startDate && { startDate: { gte: new Date(startDate) } }),
					...(endDate && { endDate: { lte: new Date(endDate) } }),
					...(serviceOptionId && { serviceOptionId })
				},
				orderBy: {
					[sortKey as SortKey]: sortValue as 'asc' | 'desc'
				}
			})
			return { bookings }
		} catch {
			return UnableToProcessError
		}
	}
})

export const BookingsResult = unionType({
	name: 'BookingsResult',
	definition(t) {
		t.members(
			'BookingsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const bookings = queryField('bookings', {
	type: 'BookingsResult',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			return { bookings: await prisma.booking.findMany() }
		} catch {
			return NotFoundError
		}
	}
})

export const BookingWithPaymentStatusInput = inputObjectType({
	name: 'BookingWithPaymentStatusInput',
	definition(t) {
		t.string('paymentStatus')
		t.boolean('underReview')
	}
})

export const BookingWithPaymentStatusResult = unionType({
	name: 'BookingWithPaymentStatusResult',
	definition(t) {
		t.members(
			'BookingsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const bookingsWithPaymentStatus = queryField('bookingsWithPaymentStatus', {
	type: 'BookingWithPaymentStatusResult',
	args: {
		input: nonNull(arg({ type: 'BookingWithPaymentStatusInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve(_, { input: { paymentStatus, underReview } }) {
		try {
			const bookings = await prisma.booking.findMany({
				where: {
					...(paymentStatus && { stripePayment: { status: paymentStatus as any } }),
					...(underReview && { underReview })
				}
			})

			return { bookings }
		} catch {
			return UnableToProcessError
		}
	}
})
