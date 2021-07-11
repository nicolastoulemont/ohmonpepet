import { inputObjectType, arg, mutationField, idArg, nonNull, unionType, stringArg } from 'nexus'
import prisma from '../../lib/prisma'
import {
	checkArgs,
	authorize,
	NotFoundError,
	UnableToProcessError,
	PartialInvalidArgumentsError
} from '../../utils'
import { NEW_MESSAGE } from '../../constants/pubsub'

export const createBookingMessageInput = inputObjectType({
	name: 'CreateBookingMessageInput',
	definition(t) {
		t.nonNull.string('content')
		t.nonNull.string('bookingId')
		t.nonNull.string('saveAs')
	}
})

export const createBookingMessageResult = unionType({
	name: 'CreateBookingMessageResult',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createBookingMessage = mutationField('createBookingMessage', {
	type: 'CreateBookingMessageResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateBookingMessageInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['content', 'bookingId']),
	async resolve(
		_,
		{ input: { content, bookingId, saveAs } },
		{ user: { userId, operatorId }, pubsub }
	) {
		try {
			if (saveAs === 'operator' && !operatorId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot save as operator, please create an operator profile'
						}
					]
				}
			}

			const bookingMessage = await prisma.bookingMessage.create({
				data: {
					content,
					bookingId,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'user' && { userId })
				}
			})

			pubsub.publish(NEW_MESSAGE, {
				bookingByIdChatSub: bookingMessage
			})
			return bookingMessage
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const setBookingMessagesAsReadInput = inputObjectType({
	name: 'SetBookingMessagesAsReadInput',
	definition(t) {
		t.nonNull.list.nonNull.id('ids')
		t.date('readAt')
	}
})

export const setBookingMessagesAsReadResult = unionType({
	name: 'SetBookingMessagesAsReadResult',
	description: 'The result of the setBookingMessageAsRead mutation',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const setAsRead = mutationField('setAsRead', {
	type: 'SetBookingMessagesAsReadResult',
	args: {
		input: nonNull(
			arg({
				type: 'SetBookingMessagesAsReadInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'readtAt:date']),
	async resolve(_, { input: { ids, readAt } }) {
		try {
			await prisma.bookingMessage.updateMany({
				where: {
					id: { in: ids }
				},
				data: {
					readAt
				}
			})
			return { success: true }
		} catch (error) {
			return { success: false }
		}
	}
})

export const updateBookingMessageInput = inputObjectType({
	name: 'UpdateBookingMessageInput',
	definition(t) {
		t.string('content')
		t.date('readAt')
	}
})

export const updateBookingMessageResult = unionType({
	name: 'UpdateBookingMessageResult',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'NotFoundError',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const updateBookingMessage = mutationField('updateBookingMessage', {
	type: 'UpdateBookingMessageResult',
	args: {
		id: nonNull(idArg()),
		saveAs: nonNull(stringArg()),
		input: nonNull(
			arg({
				type: 'UpdateBookingMessageInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'saveAs']),
	async resolve(_, { id, saveAs, input: { content, readAt } }, { user: { userId, operatorId } }) {
		try {
			if (saveAs === 'operator' && !operatorId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot update as operator, please create an operator profile'
						}
					]
				}
			}

			const message = await prisma.bookingMessage.update({
				where: {
					id,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'user' && { userId })
				},
				data: {
					content,
					readAt
				}
			})
			return message
		} catch (err) {
			return NotFoundError
		}
	}
})

export const deleteBookingMessageResult = unionType({
	name: 'DeleteBookingMessageResult',
	description: 'The result of the deleteBookingMessage mutation',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const deleteBookingMessage = mutationField('deleteBookingMessage', {
	type: 'DeleteBookingMessageResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId, operatorId } }) {
		try {
			const [message] = await prisma.bookingMessage.findMany({
				where: { id, AND: [{ OR: [{ userId }, { operatorId }] }] },
				include: {
					medias: true
				}
			})

			if (!message) return NotFoundError

			if (message.medias.length > 0) {
				const mediaIds = message.medias.map((media) => media.id)
				await prisma.media.deleteMany({
					where: { id: { in: mediaIds } }
				})
			}

			await prisma.bookingMessage.delete({ where: { id: message.id } })

			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
