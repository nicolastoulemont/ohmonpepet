import { idArg, list, nonNull, subscriptionField } from 'nexus'
import { authorizeUser } from '@utils/authorization'
import { withFilter } from 'apollo-server-express'
import { CREATED_BOOKING, NEW_MESSAGE, UPDATED_BOOKING } from '../../constants/pubsub'

export const bookingByIdChatSub = subscriptionField('bookingByIdChatSub', {
	type: 'MessageResponse',
	args: {
		bookingId: nonNull(idArg()),
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(NEW_MESSAGE),
		(payload, variables) => payload.bookingByIdChatSub.bookingId === variables.bookingId,
	),
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	resolve(root) {
		return { message: root.bookingByIdChatSub }
	},
})

export const userBookingsMessagesChangesSub = subscriptionField('userBookingsMessagesChangesSub', {
	type: 'MessageResponse',
	args: {
		bookingIds: list(idArg()),
		authorId: idArg(),
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(NEW_MESSAGE),
		(payload, variables) =>
			variables.bookingIds.includes(payload.bookingByIdChatSub.bookingId) &&
			payload.bookingByIdChatSub.authorId !== variables.authorId,
	),
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	resolve(root) {
		return { message: root.bookingByIdChatSub }
	},
})

export const userBookingsStatusChangesSub = subscriptionField('userBookingsStatusChangesSub', {
	type: 'BookingResponse',
	args: {
		bookingIds: list(idArg()),
	},
	subscribe: withFilter(
		(_, __, ctx) => ctx.pubsub.asyncIterator(UPDATED_BOOKING),
		(payload, variables) => variables.bookingIds.includes(payload.booking.id),
	),
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	resolve({ booking }) {
		return { booking }
	},
})

export const newlyCreatedBookingsAsSitterSub = subscriptionField(
	'newlyCreatedBookingsAsSitterSub',
	{
		type: 'BookingResponse',
		args: {
			sitterId: idArg(),
		},
		subscribe: withFilter(
			(_, __, ctx) => ctx.pubsub.asyncIterator(CREATED_BOOKING),
			(payload, variables) => variables.sitterId === payload.booking.sitterId,
		),
		authorization: (ctx) => authorizeUser(ctx, 'user'),
		resolve({ booking }) {
			return { booking }
		},
	},
)
