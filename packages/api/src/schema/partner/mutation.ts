import { inputObjectType, arg, mutationField, idArg, nonNull, unionType } from 'nexus'
import prisma from '../../lib/prisma'
import {
	authorize,
	checkArgs,
	NotFoundError,
	PartialInvalidArgumentsError,
	UnableToProcessError,
	deleteS3Media
} from '../../utils'

export const CreatePartnerInput = inputObjectType({
	name: 'CreatePartnerInput',
	definition(t) {
		t.nonNull.string('name')
		t.nonNull.string('description')
		t.nonNull.string('websiteUrl')
		t.nonNull.list.nonNull.string('storeUrls')
	}
})

export const CreatePartnerResult = unionType({
	name: 'CreatePartnerResult',
	definition(t) {
		t.members(
			'Partner',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const createPartner = mutationField('createPartner', {
	type: 'CreatePartnerResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreatePartnerInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['name', 'description', 'websiteUrl', 'storeUrls']),
	async resolve(
		_,
		{ input: { name, description, websiteUrl, storeUrls } },
		{ user: { staffId } }
	) {
		try {
			const partnerMedias = await prisma.media.findMany({
				where: { storeUrl: { in: storeUrls } }
			})

			if (partnerMedias.length === 0)
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'storeUrl', message: 'Invalid storeUrl' }]
				}

			const partner = await prisma.partner.create({
				data: {
					staffId: staffId as string,
					name,
					description,
					websiteUrl
				}
			})

			await prisma.media.updateMany({
				where: { id: { in: partnerMedias.map((m) => m.id) } },
				data: { partnerId: partner.id }
			})

			return partner
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const UpdatePartnerInput = inputObjectType({
	name: 'UpdatePartnerInput',
	definition(t) {
		t.nonNull.string('name')
		t.nonNull.string('description')
		t.nonNull.string('websiteUrl')
		t.nonNull.list.nonNull.string('storeUrls')
	}
})

export const UpdatePartnerResult = unionType({
	name: 'UpdatePartnerResult',
	definition(t) {
		t.members(
			'Partner',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError',
			'InvalidArgumentsError'
		)
	}
})

export const updatePartner = mutationField('updatePartner', {
	type: 'UpdatePartnerResult',
	args: {
		id: nonNull(idArg()),
		input: nonNull(
			arg({
				type: 'UpdatePartnerInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id', 'name', 'description', 'websiteUrl', 'storeUrls']),
	async resolve(
		_,
		{ id, input: { name, description, websiteUrl, storeUrls } },
		{ user: { staffId } }
	) {
		try {
			const partnerMedias = await prisma.media.findMany({
				where: { storeUrl: { in: storeUrls } }
			})

			const partner = await prisma.partner.update({
				where: { id },
				data: {
					staffId: staffId as string,
					name,
					description,
					websiteUrl
				}
			})

			await prisma.media.updateMany({
				where: { id: { in: partnerMedias.map((m) => m.id) } },
				data: { partnerId: partner.id }
			})

			return partner
		} catch (err) {
			return UnableToProcessError
		}
	}
})

export const DeletePartnerResult = unionType({
	name: 'DeletePartnerResult',
	definition(t) {
		t.members('BooleanResult', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const deletePartner = mutationField('deletePartner', {
	type: 'DeletePartnerResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			const partnerMedias = await prisma.media.findMany({ where: { partnerId: id } })
			const deletedPartnerMedias = await partnerMedias.map(
				async (m) => await deleteS3Media(m.storeUrl)
			)

			await Promise.all(deletedPartnerMedias)

			await prisma.media.deleteMany({ where: { id: { in: partnerMedias.map((m) => m.id) } } })

			await prisma.partner.delete({ where: { id } })
			return { success: true }
		} catch (err) {
			return { success: false }
		}
	}
})
