import { inputObjectType, arg, mutationField, idArg, nonNull, unionType, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const CreateBookingAdInput = inputObjectType({
	name: 'CreateBookingAdInput',
	definition(t) {
		t.nonNull.latitude('latitude')
		t.nonNull.longitude('longitude')
		t.nonNull.list.nonNull.string('animalsSpeciesIds')
		t.nonNull.string('startDate')
		t.nonNull.string('endDate')
		t.nonNull.string('serviceOptionId')
		t.string('description')
		t.float('serviceMaxPrice')
	}
})

export const PreExistingUserAdError = objectType({
	name: 'PreExistingUserAdError',
	isTypeOf: (data) => Boolean((data as any).preExistingUserAdError),
	definition(t) {
		t.string('preExistingUserAdError')
	}
})

export const CreateBookingAdResult = unionType({
	name: 'CreateBookingAdResult',
	definition(t) {
		t.members(
			'BookingAd',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError',
			'PreExistingUserAdError'
		)
	}
})

export const createAd = mutationField('createAd', {
	type: 'CreateBookingAdResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateBookingAdInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) =>
		checkArgs(args, [
			'startDate',
			'startDate:date',
			'endDate',
			'endDate:date',
			'latitude',
			'longitude',
			'animalsSpeciesIds'
		]),
	async resolve(
		_,
		{
			input: {
				startDate,
				endDate,
				longitude,
				latitude,
				serviceOptionId,
				description,
				serviceMaxPrice,
				animalsSpeciesIds
			}
		},
		{ user: { userId } }
	) {
		try {
			const existingAd = await prisma.bookingAd.findFirst({
				where: { userId, startDate, endDate }
			})

			if (existingAd) {
				return {
					preExistingUserAdError: 'You already have an existing ad for these dates'
				}
			}

			const bookingAd = await prisma.bookingAd.create({
				data: {
					userId,
					startDate,
					endDate,
					serviceOptionId,
					description,
					serviceMaxPrice,
					animalsSpeciesIds
				}
			})

			if (!bookingAd) return UnableToProcessError

			await prisma.location.create({
				data: {
					latitude,
					longitude,
					bookingAdId: bookingAd.id
				}
			})

			return bookingAd
		} catch (err) {
			console.error(err)
			return UnableToProcessError
		}
	}
})

export const UpdateBookingAdInput = inputObjectType({
	name: 'UpdateBookingAdInput',
	definition(t) {
		t.nonNull.latitude('latitude')
		t.nonNull.longitude('longitude')
		t.nonNull.list.nonNull.string('animalsSpeciesIds')
		t.nonNull.string('startDate')
		t.nonNull.string('endDate')
		t.nonNull.string('serviceOptionId')
		t.string('description')
		t.float('serviceMaxPrice')
	}
})

export const UpdateBookingAdResult = unionType({
	name: 'UpdateBookingAdResult',
	definition(t) {
		t.members(
			'BookingAd',
			'UserAuthenticationError',
			'NotFoundError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const updateBookingAd = mutationField('updateBookingAd', {
	type: 'UpdateBookingAdResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateBookingAdInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(
		_,
		{
			id,
			input: {
				startDate,
				endDate,
				longitude,
				latitude,
				serviceOptionId,
				description,
				serviceMaxPrice,
				animalsSpeciesIds
			}
		},
		{ user: { userId } }
	) {
		try {
			const existingAd = await prisma.bookingAd.findFirst({
				where: {
					id,
					userId
				},
				include: {
					location: true
				}
			})

			if (!existingAd) return NotFoundError

			const newLatitude = latitude !== existingAd!.location?.latitude
			const newLongitude = longitude !== existingAd!.location?.longitude
			if (newLatitude || newLongitude) {
				await prisma.location.update({
					where: { id: existingAd!.location!.id },
					data: {
						latitude,
						longitude
					}
				})
			}

			const updatedBookingAd = await prisma.bookingAd.updateMany({
				where: { id, userId },
				data: {
					startDate,
					endDate,
					serviceOptionId,
					description,
					serviceMaxPrice,
					animalsSpeciesIds
				}
			})

			return updatedBookingAd
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const PreExistingOperatorBidError = objectType({
	name: 'PreExistingOperatorBidError',
	isTypeOf: (data) => Boolean((data as any).preExistingOperatorBidError),
	definition(t) {
		t.string('preExistingOperatorBidError')
	}
})

export const BidForBookingAdResult = unionType({
	name: 'BidForBookingAdResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError'
		)
	}
})

export const bidForBookingAd = mutationField('bidForBookingAd', {
	type: 'BidForBookingAdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { operatorId } }) {
		try {
			const bookingAd = await prisma.bookingAd.findUnique({ where: { id } })
			if (!bookingAd) return NotFoundError

			const existingBid = await prisma.bookingAdBid.findFirst({
				where: { bookingAdId: id, operatorId }
			})

			if (existingBid) {
				return {
					preExistingOperatorBidError: 'Pre-existing bid for this operator and bookingAd'
				}
			} else {
				await prisma.bookingAdBid.create({
					data: { bookingAdId: id, operatorId: operatorId as string }
				})
				return { success: true }
			}
		} catch (err) {
			return { success: false }
		}
	}
})

export const RemoveBidForBookingAdResult = unionType({
	name: 'RemoveBidForBookingAdResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const removeBidForBookingAd = mutationField('removeBidForBookingAd', {
	type: 'RemoveBidForBookingAdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { operatorId } }) {
		try {
			const { count } = await prisma.bookingAdBid.deleteMany({
				where: { id, operatorId }
			})

			if (count === 0) return NotFoundError

			return { success: true }
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const DeleteBookingAdResult = unionType({
	name: 'DeleteBookingAdResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const deleteBookingAd = mutationField('deleteBookingAd', {
	type: 'DeleteBookingAdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId } }) {
		try {
			const { count } = await prisma.bookingAd.deleteMany({ where: { id, userId } })
			if (count === 0) return NotFoundError

			return { success: true }
		} catch (err) {
			return UnableToProcessError
		}
	}
})
