import { S3 } from 'aws-sdk'
import { __prod__ } from '../../constants'

export const s3Bucket = __prod__
	? (process.env.S3_BUCKET_PROD as string)
	: (process.env.S3_BUCKET_DEV as string)

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

export const s3 = new S3({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'eu-west-3'
})
