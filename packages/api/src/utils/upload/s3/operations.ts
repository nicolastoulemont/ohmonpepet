import { s3Bucket, s3 } from './config'

interface GetS3ParamsArgs {
	fileName: string
	fileType: string
}

interface GetS3ParamsResult {
	Bucket: string
	Key: string
	Expires: 60
	ContentType: string
	ACL: 'public-read'
}

function getS3Params({ fileName, fileType }: GetS3ParamsArgs): GetS3ParamsResult {
	return {
		Bucket: s3Bucket,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	}
}

export async function getS3SignedUrl({ fileName, fileType }: GetS3ParamsArgs): Promise<string> {
	const s3Params = getS3Params({ fileName, fileType })
	return await s3.getSignedUrlPromise('putObject', s3Params)
}

export function getS3StoreUrl(fileName: string): string {
	return `https://${s3Bucket}.s3.amazonaws.com/${fileName}`
}

function getS3MediaAwsPath(storeUrl: string): string {
	return storeUrl.split('s3.amazonaws.com/')[1]
}

const isValidS3StoreUrl = (storeUrl: string) => storeUrl.includes('s3.amazonaws.com/')

export async function deleteS3Media(storeUrl: string): Promise<{ success: boolean }> {
	if (!isValidS3StoreUrl(storeUrl)) {
		console.error(`Invalid S3 storeUrl ${storeUrl}, stopping deletion`)
		return { success: false }
	}

	try {
		await s3
			.deleteObject({
				Bucket: s3Bucket,
				Key: getS3MediaAwsPath(storeUrl)
			})
			.promise()
		return { success: true }
	} catch (error) {
		console.error(error)
		return { success: false }
	}
}
