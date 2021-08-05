import { idArg, list, nonNull, subscriptionField, unionType } from 'nexus'
import { authorize } from '../../utils'
import { withFilter } from 'apollo-server-express'
import { CREATED_BOOKING, NEW_MESSAGE, UPDATED_BOOKING } from '../../constants/pubsub'

export const BookingMessageSubscriptionResult = unionType({
	name: 'BookingMessageSubscriptionResult',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'UserAuthenticationError',
			'UserForbiddenError'
		)
	}
})

export const bookingByIdChatSub = subscriptionField('bookingByIdChatSub', {
	type: 'BookingMessageSubscriptionResult',
	args: {
		bookingId: nonNull(idArg())
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(NEW_MESSAGE),
		(payload, variables) => payload.bookingByIdChatSub.bookingId === variables.bookingId
	),
	authorization: (ctx) => authorize(ctx, 'user'),
	resolve(root) {
		return { message: root.bookingByIdChatSub }
	}
})

export const userBookingsMessagesChangesSub = subscriptionField('userBookingsMessagesChangesSub', {
	type: 'BookingMessageSubscriptionResult',
	args: {
		bookingIds: list(idArg()),
		authorId: idArg()
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(NEW_MESSAGE),
		(payload, variables) =>
			variables.bookingIds.includes(payload.bookingByIdChatSub.bookingId) &&
			payload.bookingByIdChatSub.authorId !== variables.authorId
	),
	authorization: (ctx) => authorize(ctx, 'user'),
	resolve(root) {
		return { message: root.bookingByIdChatSub }
	}
})

export const BookingSubscriptionResult = unionType({
	name: 'BookingSubscriptionResult',
	definition(t) {
		t.members('Booking', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const userBookingsStatusChangesSub = subscriptionField('userBookingsStatusChangesSub', {
	type: 'BookingSubscriptionResult',
	args: {
		bookingIds: list(idArg())
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(UPDATED_BOOKING),
		(payload, variables) => variables.bookingIds.includes(payload.booking.id)
	),
	authorization: (ctx) => authorize(ctx, 'user'),
	resolve({ booking }) {
		return { booking }
	}
})

export const newlyCreatedBookingsAsSitterSub = subscriptionField(
	'newlyCreatedBookingsAsSitterSub',
	{
		type: 'BookingSubscriptionResult',
		args: {
			sitterId: idArg()
		},
		subscribe: withFilter(
			(_, __, ctx) => ctx.pubsub.asyncIterator(CREATED_BOOKING),
			(payload, variables) => variables.sitterId === payload.booking.sitterId
		),
		authorization: (ctx) => authorize(ctx, 'user'),
		resolve({ booking }) {
			return { booking }
		}
	}
)
