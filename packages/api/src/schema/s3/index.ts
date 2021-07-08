import { mutationField, objectType, unionType, inputObjectType, nonNull, arg } from 'nexus'
import { authorize, checkArgs, UnableToProcessError } from '../../utils'
import { s3Bucket, s3 } from './config'

export const StorageInfos = objectType({
	name: 'StorageInfos',
	isTypeOf: (data) => Boolean((data as any).signedRequest),
	definition(t) {
		t.string('signedRequest')
		t.string('url')
	}
})

export const SaveToStorageInput = inputObjectType({
	name: 'SaveToStorageInput',
	definition(t) {
		t.nonNull.string('fileName')
		t.nonNull.string('fileType')
	}
})

export const SaveToStorageResult = unionType({
	name: 'SaveToStorageResult',
	definition(t) {
		t.members(
			'StorageInfos',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UnableToProcessError'
		)
	}
})

export const saveToStorage = mutationField('saveToStorage', {
	type: 'SaveToStorageResult',
	args: { input: nonNull(arg({ type: SaveToStorageInput })) },
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['fileName', 'fileType']),
	async resolve(_, { input: { fileName, fileType } }) {
		const s3Params = {
			Bucket: s3Bucket,
			Key: fileName,
			Expires: 60,
			ContentType: fileType,
			ACL: 'public-read'
		}

		try {
			const signedRequest = await s3.getSignedUrl('putObject', s3Params)
			return {
				signedRequest,
				url: `https://${s3Bucket}.s3.amazonaws.com/${fileName}`
			}
		} catch (error) {
			return UnableToProcessError
		}
	}
})
