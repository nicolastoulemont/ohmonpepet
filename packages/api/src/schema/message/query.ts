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
			return await prisma.message.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (err) {
			return NotFoundError
		}
	}
})

export const MessagesList = objectType({
	name: 'MessagesList',
	isTypeOf: (data) => Boolean((data as any).messages),
	description: 'List of booking messages',
	definition(t) {
		t.list.field('messages', { type: 'Message' })
	}
})

export const MessagesResult = unionType({
	name: 'MessagesResult',
	description: 'The result of the bookingMessages query',
	definition(t) {
		t.members(
			'MessagesList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const messages = queryField('messages', {
	type: 'MessagesResult',
	description: 'Access restricted to admin users',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const messages = await prisma.message.findMany()
			return { messages }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const MessagesByBookingIdResult = unionType({
	name: 'MessagesByBookingIdResult',
	description: 'The result of the bookingMessages query',
	definition(t) {
		t.members(
			'MessagesList',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const messagesByBookingId = queryField('messagesByBookingId', {
	type: 'MessagesByBookingIdResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			const messages = await prisma.message.findMany({ where: { bookingId: id } })
			return { messages }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
