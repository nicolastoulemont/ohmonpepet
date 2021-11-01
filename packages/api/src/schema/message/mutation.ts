import { inputObjectType, arg, mutationField, idArg, nonNull, unionType, stringArg } from 'nexus'
import prisma from '../../lib/prisma'
import { NEW_MESSAGE } from '../../constants/pubsub'
import {
	checkArgs,
	authorize,
	NotFoundError,
	UnableToProcessError,
	PartialInvalidArgumentsError,
	deleteS3Media
} from '../../utils'

export const createMessageInput = inputObjectType({
	name: 'CreateMessageInput',
	definition(t) {
		t.nonNull.string('content')
		t.nonNull.string('bookingId')
		t.nonNull.saveAs('saveAs')
	}
})

export const createMessageResult = unionType({
	name: 'CreateMessageResult',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'StaffBookingMessage',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createMessage = mutationField('createMessage', {
	type: 'CreateMessageResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateMessageInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['content', 'bookingId', 'saveAs:saveAs']),
	async resolve(
		_,
		{ input: { content, bookingId, saveAs } },
		{ user: { userId, operatorId, staffId }, pubsub }
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
			if (saveAs === 'staff' && !staffId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot save as staff, please use a staff account'
						}
					]
				}
			}

			const message = await prisma.message.create({
				data: {
					content,
					bookingId,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'staff' && staffId && { staffId }),
					...(saveAs === 'user' && { userId })
				}
			})

			pubsub.publish(NEW_MESSAGE, {
				bookingByIdChatSub: message
			})
			return message
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const setMessagesAsReadInput = inputObjectType({
	name: 'SetMessagesAsReadInput',
	definition(t) {
		t.nonNull.list.nonNull.id('ids')
		t.date('readAt')
	}
})

export const setMessagesAsReadResult = unionType({
	name: 'SetMessagesAsReadResult',
	description: 'The result of the setMessageAsRead mutation',
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
	type: 'SetMessagesAsReadResult',
	args: {
		input: nonNull(
			arg({
				type: 'SetMessagesAsReadInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'readtAt:date']),
	async resolve(_, { input: { ids, readAt } }) {
		try {
			await prisma.message.updateMany({
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

export const updateMessageInput = inputObjectType({
	name: 'UpdateMessageInput',
	definition(t) {
		t.nonNull.string('content')
		t.date('readAt')
		t.saveAs('saveAs')
	}
})

export const updateMessageResult = unionType({
	name: 'UpdateMessageResult',
	definition(t) {
		t.members(
			'UserBookingMessage',
			'OperatorBookingMessage',
			'StaffBookingMessage',
			'NotFoundError',
			'UserAuthenticationError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const updateMessage = mutationField('updateMessage', {
	type: 'UpdateMessageResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdateMessageInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'saveAs']),
	async resolve(
		_,
		{ id, input: { content, readAt, saveAs } },
		{ user: { userId, operatorId, staffId } }
	) {
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

			if (saveAs === 'staff' && !staffId) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [
						{
							key: 'saveAs',
							message: 'Cannot save as staff, please use a staff account'
						}
					]
				}
			}

			const message = await prisma.message.update({
				where: {
					id,
					...(saveAs === 'operator' && operatorId && { operatorId }),
					...(saveAs === 'staff' && staffId && { staffId }),
					...(saveAs === 'user' && { userId })
				},
				data: {
					content,
					readAt
				}
			})
			if (!message) return NotFoundError
			return message
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const deleteMessageResult = unionType({
	name: 'DeleteMessageResult',
	description: 'The result of the deleteMessage mutation',
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

export const deleteMessage = mutationField('deleteMessage', {
	type: 'DeleteMessageResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId, operatorId, staffId } }) {
		try {
			const [message] = await prisma.message.findMany({
				where: { id, OR: [{ userId }, { operatorId }, { staffId }] },
				include: {
					medias: true
				}
			})

			if (!message) return NotFoundError

			if (message.medias.length > 0) {
				const mediaIds = message.medias.map((media) => media.id)
				const mediaStoreUrls = message.medias.map((media) => media.storeUrl)

				const removeMediasFromStorage = mediaStoreUrls.map(
					async (storeUrl) => await deleteS3Media(storeUrl)
				)
				await Promise.all(removeMediasFromStorage)
				await prisma.media.deleteMany({
					where: { id: { in: mediaIds } }
				})
			}

			await prisma.message.delete({ where: { id: message.id } })

			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
