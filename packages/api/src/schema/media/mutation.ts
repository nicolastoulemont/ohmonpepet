import { mutationField, objectType, unionType, inputObjectType, nonNull, arg, idArg } from 'nexus'
import prisma from '../../lib/prisma'
import {
	authorize,
	checkArgs,
	NotFoundError,
	PartialInvalidArgumentsError,
	UnableToProcessError,
	UserForbiddenError,
	getS3SignedUrl,
	getS3StoreUrl,
	deleteS3Media
} from '../../utils'

export const StorageInfos = objectType({
	name: 'StorageInfos',
	isTypeOf: (data) => Boolean((data as any).signedRequest),
	definition(t) {
		t.string('signedRequest')
		t.string('url')
	}
})

export const CreateMediaInput = inputObjectType({
	name: 'CreateMediaInput',
	definition(t) {
		t.nonNull.string('fileName')
		t.nonNull.string('fileType')
		t.nonNull.string('saveAs')
	}
})

export const CreateMediaResult = unionType({
	name: 'CreateMediaResult',
	definition(t) {
		t.members(
			'StorageInfos',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const createMedia = mutationField('createMedia', {
	type: 'CreateMediaResult',
	args: { input: nonNull(arg({ type: CreateMediaInput })) },
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['fileName', 'fileType', 'saveAs:saveAs']),
	async resolve(
		_,
		{ input: { fileName, fileType, saveAs } },
		{ user: { operatorId, userId, staffId } }
	) {
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
			return UserForbiddenError
		}

		try {
			const signedRequest = await getS3SignedUrl({ fileName, fileType })
			const storeUrl = getS3StoreUrl(fileName)
			try {
				await prisma.media.create({
					data: {
						mediaType: fileType.includes('video') ? 'VIDEO' : 'IMAGE',
						storeUrl,
						storageProvider: 'AWS',
						...(saveAs === 'staff' && staffId && { staffId }),
						...(saveAs === 'operator' && operatorId && { operatorId }),
						...(saveAs === 'user' && { userId })
					}
				})
			} catch (error) {
				return UnableToProcessError
			}

			return {
				signedRequest,
				url: storeUrl
			}
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const IsActiveOperatorWithNoReplacementMediaError = objectType({
	name: 'IsActiveOperatorWithNoReplacementMediaError',
	isTypeOf: (data) => Boolean((data as any).activeOperatorWithNoReplacementMediaError),
	definition(t) {
		t.nonNull.string('activeOperatorWithNoReplacementMediaError')
	}
})

export const IsActiveOperatorMainMediaError = objectType({
	name: 'IsActiveOperatorMainMediaError',
	isTypeOf: (data) => Boolean((data as any).activeOperatorMainMediaError),
	definition(t) {
		t.nonNull.string('activeOperatorMainMediaError')
	}
})

export const deleteMediaResult = unionType({
	name: 'DeleteMediaResult',
	description: 'The result of the deleteMedia mutation',
	definition(t) {
		t.members(
			'BooleanResult',
			'IsActiveOperatorWithNoReplacementMediaError',
			'IsActiveOperatorMainMediaError',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const deleteMedia = mutationField('deleteMedia', {
	type: 'DeleteMediaResult',
	args: {
		mediaId: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['mediaId']),
	async resolve(_, { mediaId }, { user: { operatorId } }) {
		try {
			const media = await prisma.media.findUnique({
				where: { id: mediaId },
				rejectOnNotFound: true
			})

			// For operator media we need to perform additional checks in order to
			// ensure that active operator always have at least one picture
			const isOperatorMedia = Boolean(media.operatorId)
			if (isOperatorMedia) {
				const operator = await prisma.operator.findUnique({ where: { id: operatorId } })

				if (operator?.isActive) {
					const operatorMedias = await prisma.media.findMany({
						where: { operatorId: media.operatorId }
					})
					const hasNoReplacementPictures = operatorMedias.length === 1 // Only has this one media
					const isOperatorMainPicture = operator.mainMediaId === mediaId
					if (hasNoReplacementPictures) {
						return {
							activeOperatorWithNoReplacementMediaError:
								'Cannot delete media because of lack of replacement medias, please desactivate the related operator before deleting its last media'
						}
					} else if (isOperatorMainPicture) {
						return {
							activeOperatorMainMediaError:
								'Cannot delete an active Operator main media, replace this media with another one before deleting or set this operator as unactive'
						}
					} else {
						const { success } = await deleteS3Media(media.storeUrl)
						if (success) {
							await prisma.media.delete({
								where: { id: mediaId }
							})
							return { success: true }
						} else {
							return { success: false }
						}
					}
				} else {
					const { success } = await deleteS3Media(media.storeUrl)
					if (success) {
						await prisma.media.delete({
							where: { id: mediaId }
						})
						return { success: true }
					} else {
						return { success: false }
					}
				}
			} else {
				try {
					const { success } = await deleteS3Media(media.storeUrl)
					if (success) {
						await prisma.media.delete({
							where: { id: mediaId }
						})
						return { success: true }
					} else {
						return { success: false }
					}
				} catch (error) {
					return UnableToProcessError
				}
			}
		} catch (error) {
			return NotFoundError
		}
	}
})
