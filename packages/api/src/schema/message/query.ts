import { MessageModel } from './index'
import { queryField, idArg, arg, nonNull } from 'nexus'
import { checkFields } from '@utils/checkFields'
import { getWhere, getSort } from '../shared'
import { notFound } from '@utils/errors'
import { authorizeUser } from '@utils/authorization'

export const messageById = queryField('messageById', {
	type: 'MessageResponse',
	args: {
		id: nonNull(idArg()),
	},
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const message = await MessageModel.findById(args.id)
			return { message }
		} catch {
			return notFound()
		}
	},
})

export const messagesByBookingId = queryField('messagesByBookingId', {
	type: 'MessagesResponse',
	args: {
		id: nonNull(idArg()),
	},
	authorization: (ctx) => authorizeUser(ctx, 'user'),
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const messages = await MessageModel.find({ bookingId: args.id })
			return { messages }
		} catch {
			return notFound()
		}
	},
})
export const messagesByClaimId = queryField('messagesByClaimId', {
	type: 'MessagesResponse',
	args: {
		id: nonNull(idArg()),
	},
	authorization: (ctx) => authorizeUser(ctx, 'admin'),
	validate: (args) => checkFields(args, ['id']),
	async resolve(_, args) {
		try {
			const messages = await MessageModel.find({ claimId: args.id })
			return { messages }
		} catch {
			return notFound()
		}
	},
})

export const messages = queryField('messages', {
	type: 'MessagesResponse',
	args: {
		params: arg({
			type: 'ParamsInput',
		}),
	},
	async resolve(_, args) {
		try {
			const query = { ...getWhere(args.params) }
			const messages = await MessageModel.find(query)
				.sort(getSort(args.params))
				.skip(args.params?.offset || 0)
				.limit(args.params?.limit || 0)

			return { messages }
		} catch {
			return notFound()
		}
	},
})
