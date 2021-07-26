import { BookingModel } from './index'
import { queryField, idArg, arg, nonNull, stringArg, booleanArg, floatArg } from 'nexus'

import { checkFields } from '@utils/checkFields'
import { withDates } from '../shared'
import { notFound } from '@utils/errors'
import { authorizeUser } from '@utils/authorization'

export const bookingById = queryField('bookingById', {
	type: 'BookingResponse',
	args: {
		id: nonNull(idArg()),
	},
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const booking = await BookingModel.findById(args.id)
			return { booking }
		} catch {
			return notFound()
		}
	},
})

export const currentUserBookings = queryField('currentUserBookings', {
	type: 'BookingsResponse',
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	async resolve(_, __, ctx) {
		try {
			const bookings = await BookingModel.find({
				$or: [{ ownerId: ctx.user.profileId }, { sitterId: ctx.user.profileId }],
			}).sort({ updatedAt: 'descending' })

			return { bookings }
		} catch {
			return notFound()
		}
	},
})

export const currentUserOwnerBookings = queryField('currentUserOwnerBookings', {
	type: 'BookingsResponse',
	args: {
		sortKey: stringArg(),
		sortValue: stringArg(),
		includeFinished: booleanArg(),
		filterByService: stringArg(),
		startDate: floatArg(),
		endDate: floatArg(),
	},
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	async resolve(_, args, ctx) {
		try {
			const {
				sortKey,
				sortValue,
				includeFinished,
				filterByService,
				// @ts-ignore
				startDate,
				// @ts-ignore
				endDate,
			} = args
			let query: any = {
				ownerId: ctx.user.profileId,
				paid: false,
				canceled: false,
			}
			let sortBy: any = { updatedAt: 'descending' }
			if (sortKey && sortValue) {
				sortBy = { [sortKey]: sortValue }
			} else if (!sortKey && sortValue) {
				sortBy = { updatedAt: sortValue }
			}
			if (includeFinished) {
				delete query.paid
				delete query.canceled
			}
			if (filterByService) {
				query = {
					...query,
					service: filterByService,
				}
			}

			if (startDate) {
				query = {
					...query,
					updatedAt: { $gte: new Date(startDate).getTime() },
				}
			}

			if (endDate) {
				query = {
					...query,
					updatedAt: { $lte: new Date(endDate).getTime() },
				}
			}

			if (startDate && endDate) {
				query = {
					...query,
					updatedAt: {
						$gte: new Date(startDate).getTime(),
						$lte: new Date(endDate).getTime(),
					},
				}
			}

			const bookings = await BookingModel.find(query).sort(sortBy)

			return { bookings }
		} catch {
			return notFound()
		}
	},
})
export const currentUserSitterBookings = queryField('currentUserSitterBookings', {
	type: 'BookingsResponse',
	args: {
		sortKey: stringArg(),
		sortValue: stringArg(),
		includeFinished: booleanArg(),
		filterByService: stringArg(),
		startDate: floatArg(),
		endDate: floatArg(),
	},
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	async resolve(_, args, ctx) {
		try {
			const {
				sortKey,
				sortValue,
				includeFinished,
				filterByService,
				// @ts-ignore
				startDate,
				// @ts-ignore
				endDate,
			} = args
			let query: any = {
				sitterId: ctx.user.profileId,
				paid: false,
				canceled: false,
			}
			let sortBy: any = { updatedAt: 'descending' }
			if (sortKey && sortValue) {
				sortBy = { [sortKey]: sortValue }
			} else if (!sortKey && sortValue) {
				sortBy = { updatedAt: sortValue }
			}
			if (includeFinished) {
				delete query.paid
				delete query.canceled
			}
			if (filterByService) {
				query = {
					...query,
					service: filterByService,
				}
			}

			if (startDate) {
				query = {
					...query,
					updatedAt: { $gte: new Date(startDate).getTime() },
				}
			}

			if (endDate) {
				query = {
					...query,
					updatedAt: { $lte: new Date(endDate).getTime() },
				}
			}

			if (startDate && endDate) {
				query = {
					...query,
					updatedAt: {
						$gte: new Date(startDate).getTime(),
						$lte: new Date(endDate).getTime(),
					},
				}
			}
			const bookings = await BookingModel.find(query).sort(sortBy)

			return { bookings }
		} catch {
			return notFound()
		}
	},
})

export const bookingBySitterId = queryField('bookingBySitterId', {
	type: 'BookingsResponse',
	args: {
		id: nonNull(idArg()),
	},
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const bookings = await BookingModel.find({
				sitterId: args.id,
			})
			return { bookings }
		} catch {
			return notFound()
		}
	},
})
export const bookings = queryField('bookings', {
	type: 'BookingsResponse',
	authorization: (ctx) => authorizeUser(ctx, 'admin'),
	async resolve() {
		try {
			// const query = { ...getWhere(args.params) }
			const bookings = await BookingModel.find({}).sort({ updatedAt: 'descending' }).lean()
			// .skip(args.params?.offset || 0)
			// .limit(args.params?.limit || 0)

			return { bookings }
		} catch {
			return notFound()
		}
	},
})

export const bookingsWithPaymentStatus = queryField('bookingsWithPaymentStatus', {
	type: 'BookingsResponse',
	args: {
		paymentStatus: stringArg(),
		underReview: booleanArg(),
	},
	authorization: (ctx) => authorizeUser(ctx, 'admin'),
	async resolve(_, args) {
		try {
			let query: any = {
				paymentStatus: { $ne: null },
			}

			if (args.paymentStatus)
				query = {
					...query,
					paymentStatus: args.paymentStatus,
				}
			if (args.underReview)
				query = {
					...query,
					underReview: args.underReview,
				}

			const bookings = await BookingModel.find(query).sort({ updatedAt: 'descending' }).lean()
			// .skip(args.params?.offset || 0)
			// .limit(args.params?.limit || 0)

			return { bookings }
		} catch {
			return notFound()
		}
	},
})

export const searchBookings = queryField('searchBookings', {
	type: 'BookingsResponse',
	args: {
		input: nonNull(
			arg({
				type: 'SearchInput',
			}),
		),
	},
	async resolve(_, args) {
		const { input } = args
		try {
			let search = { description: { $regex: new RegExp(input.search || '', 'i') } }

			const query = withDates(input, search, 'updatedAt')

			const bookings = await BookingModel.find(query)
				.sort({ updatedAt: input.sort || 'descending' })
				.limit(input.limit || 0)

			return { bookings }
		} catch {
			return notFound()
		}
	},
})
