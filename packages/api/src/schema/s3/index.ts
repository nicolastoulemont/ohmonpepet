import { mutationField, stringArg, objectType, nonNull } from 'nexus'
import { authorize } from '../../utils'
import { s3Bucket, s3 } from './config'

export const StorageInfos = objectType({
	name: 'StorageInfos',
	definition(t) {
		t.string('signedRequest')
		t.string('url')
	}
})

export const StorageResponse = objectType({
	name: 'StorageResponse',
	definition(t) {
		t.string('signedRequest')
		t.string('url')
		// t.list.field('errors', { type: 'Error' })
	}
})

// export const saveToStorage = mutationField('saveToStorage', {
// 	type: 'StorageResponse',
// 	args: {
// 		fileName: nonNull(stringArg()),
// 		fileType: nonNull(stringArg()),
// 	},
// 	async resolve(_, args, ctx) {

// 		const s3Params = {
// 			Bucket: s3Bucket,
// 			Key: args.fileName,
// 			Expires: 60,
// 			ContentType: args.fileType,
// 			ACL: 'public-read',
// 		}

// 		const infos = {
// 			signedRequest: await s3.getSignedUrl('putObject', s3Params),
// 			url: `https://${s3Bucket}.s3.amazonaws.com/${args.fileName}`,
// 		}

// 		return {
// 			...infos,
// 		}
// 	},
// })
