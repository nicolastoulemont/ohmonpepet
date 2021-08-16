import { queryField, idArg, arg, inputObjectType, nonNull, objectType, unionType } from 'nexus'
import {
	checkArgs,
	NotFoundError,
	authorize,
	UnableToProcessError,
	defineGeometricQuerySquare
} from '../../utils'
import prisma from '../../lib/prisma'
import { subDays } from 'date-fns'

export const AdByIdResult = unionType({
	name: 'AdByIdResult',
	definition(t) {
		t.members('BookingAd', 'NotFoundError', 'InvalidArgumentsError')
	}
})

export const adById = queryField('adById', {
	type: 'AdByIdResult',
	args: {
		id: nonNull(idArg())
	},
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.bookingAd.findUnique({ where: { id }, rejectOnNotFound: true })
		} catch (err) {
			console.error(err)
			return NotFoundError
		}
	}
})

export const BookingAds = objectType({
	name: 'BookingAds',
	isTypeOf: (data) => Boolean((data as any).bookingAds),
	definition(t) {
		t.list.field('bookingAds', { type: 'BookingAd' })
	}
})

export const CurrentUserAdsResult = unionType({
	name: 'CurrentUserAdsResult',
	definition(t) {
		t.members('BookingAds', 'UnableToProcessError')
	}
})

export const currentUserAds = queryField('currentUserAds', {
	type: 'CurrentUserAdsResult',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, __, { user: { userId } }) {
		try {
			const bookingAds = await prisma.bookingAd.findMany({ where: { userId } })
			return { bookingAds }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})

export const BookingAdBids = objectType({
	name: 'BookingAdBids',
	isTypeOf: (data) => Boolean((data as any).bids),
	definition(t) {
		t.list.field('bids', { type: 'BookingAdBid' })
	}
})

export const CurrentUserBidsResult = unionType({
	name: 'CurrentUserBidsResult',
	definition(t) {
		t.members('BookingAdBids', 'UnableToProcessError')
	}
})

export const currentOperatorBids = queryField('currentOperatorBids', {
	type: 'CurrentUserBidsResult',
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, __, { user: { operatorId } }) {
		try {
			const bids = await prisma.bookingAdBid.findMany({ where: { operatorId } })
			return { bids }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const SearchAdsInput = inputObjectType({
	name: 'SearchAdsInput',
	definition(t) {
		t.nonNull.latitude('latitude')
		t.nonNull.longitude('longitude')
		t.float('maxDistanceInKms', { default: 10 })
		t.nonNull.list.nonNull.id('acceptedAnimalsIds')
		t.list.nonNull.string('serviceOptionIds')
	}
})

export const SearchAdsResult = unionType({
	name: 'SearchAdsResult',
	definition(t) {
		t.members('BookingAds', 'UnableToProcessError')
	}
})

export const searchAds = queryField('searchAds', {
	type: 'SearchAdsResult',
	args: {
		input: nonNull(
			arg({
				type: 'SearchAdsInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, { input }, { user: { operatorId } }) {
		try {
			const DEFAULT_MAX_DISTANCE = 10
			const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
				defineGeometricQuerySquare(input.maxDistanceInKms || DEFAULT_MAX_DISTANCE, {
					latitude: input.latitude,
					longitude: input.longitude
				})

			const animalsQueryObjects = input.acceptedAnimalsIds.map((id) => ({
				animalsSpeciesIds: { has: id }
			}))

			const bookingAds = await prisma.bookingAd.findMany({
				where: {
					location: {
						is: {
							latitude: { gte: minLatitude, lte: maxLatitude },
							longitude: { gte: minLongitude, lte: maxLongitude }
						}
					},
					bids: { none: { operatorId } },
					startDate: { gte: subDays(new Date(), 1) }, // Only upcoming ads
					OR: animalsQueryObjects,
					...(input.serviceOptionIds && {
						serviceOptionId: { in: input.serviceOptionIds }
					})
				}
			})

			return { bookingAds }
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})
