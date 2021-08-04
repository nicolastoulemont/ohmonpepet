import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import { checkArgs, authorize, NotFoundError, UnableToProcessError } from '../../utils'
import prisma from '../../lib/prisma'

export const CreateDonationReceiptInput = inputObjectType({
	name: 'CreateDonationReceiptInput',
	definition(t) {
		t.nonNull.id('partnerId')
		t.nonNull.float('amountDonated')
		t.nonNull.list.id('donationsIds')
		t.nonNull.list.url('filesUrls')
	}
})

export const CreateDonationReceiptResult = unionType({
	name: 'CreateDonationReceiptResult',
	definition(t) {
		t.members(
			'DonationReceipt',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const createDonationReceipt = mutationField('createDonationReceipt', {
	type: 'CreateDonationReceiptResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateDonationReceiptInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) =>
		checkArgs(args, ['partnerId', 'donationsIds', 'filesUrls', 'amountDonated']),
	async resolve(
		_,
		{ input: { partnerId, amountDonated, filesUrls, donationsIds } },
		{ user: { staffId } }
	) {
		try {
			const donationReceipt = await prisma.donationsReceipt.create({
				data: {
					staffId: staffId as string,
					partnerId,
					amountDonated
				}
			})

			const uploadedDonationsReceiptMedias = await prisma.media.findMany({
				where: { storeUrl: { in: filesUrls as Array<string> } }
			})

			await prisma.media.updateMany({
				where: { id: { in: uploadedDonationsReceiptMedias.map((m) => m.id) } },
				data: {
					donationReceiptId: donationReceipt.id
				}
			})

			await prisma.donation.updateMany({
				where: { id: { in: donationsIds as Array<string> } },
				data: {
					donationsReceiptId: donationReceipt.id
				}
			})

			return { donationReceipt }
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const UpdateDonationReceiptInput = inputObjectType({
	name: 'UpdateDonationReceiptInput',
	definition(t) {
		t.nonNull.id('id')
		t.nonNull.id('partnerId')
		t.nonNull.float('amountDonated')
		t.nonNull.list.id('donationsIds')
		t.nonNull.list.url('filesUrls')
	}
})

export const UpdateDonationReceiptResult = unionType({
	name: 'UpdateDonationReceiptResult',
	definition(t) {
		t.members(
			'DonationReceipt',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError',
			'NotFoundError'
		)
	}
})

export const updateReceipt = mutationField('updateReceipt', {
	type: 'UpdateDonationReceiptResult',
	args: {
		input: nonNull(
			arg({
				type: 'UpdateDonationReceiptInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { input: { id, ...rest } }) {
		try {
			const donationReceipt = await prisma.donationsReceipt.update({
				where: { id },
				data: { ...rest }
			})
			if (!donationReceipt) return NotFoundError
			return donationReceipt
		} catch (err) {
			return UnableToProcessError
		}
	}
})

// export const deleteReceipt = mutationField('deleteReceipt', {
// 	type: 'BooleanResponse',
// 	args: {
// 		id: nonNull(idArg())
// 	},
// 	authorization: (ctx) => authorize(ctx, 'staff'),
// 	validate: (args) => checkFields(args, ['id']),
// 	// @ts-ignore
// 	async resolve(_, args, ctx) {
// 		const authErrors = authorize(ctx, 'admin')
// 		if (authErrors) return { errors: authErrors }
// 		const errors = checkFields(args, ['id'])
// 		if (errors) return { errors }
// 		try {
// 			await ReceiptModel.findByIdAndDelete({ _id: args.id, adminId: ctx.user.id })
// 			return { success: true }
// 		} catch (err) {
// 			return { success: false }
// 		}
// 	}
// })
