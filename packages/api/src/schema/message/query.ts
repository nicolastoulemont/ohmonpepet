import { idArg, nonNull, objectType, queryField, unionType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const bookingMessageByIdResult = unionType({
	name: 'BookingMessageByIdResult',
	description: 'The result of the bookingMessageById query',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'UserAuthenticationError',
			'UserForbiddenError',
			'NotFoundError',
			'InvalidArgumentsError'
		)
	}
})

export const bookingMessageById = queryField('bookingMessageById', {
	type: 'BookingMessageByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.bookingMessage.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const bookingMessagesList = objectType({
	name: 'BookingMessagesList',
	isTypeOf: (data) => Boolean((data as any).bookingMessages),
	description: 'List of booking messages',
	definition(t) {
		t.list.field('bookingMessages', { type: 'BookingMessage' })
	}
})

export const bookingMessagesResult = unionType({
	name: 'BookingMessagesResult',
	description: 'The result of the bookingMessages query',
	definition(t) {
		t.members(
			'BookingMessagesList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const bookingMessages = queryField('bookingMessages', {
	type: 'BookingMessagesResult',
	description: 'Access restricted to admin users',
	// authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const bookingMessages = await prisma.bookingMessage.findMany()
			return { bookingMessages }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
