import { InvalidArgument } from '@ohmonpepet/data'
type ApiErrorArray = Array<Pick<InvalidArgument, 'message' | 'key'>>
export function toErrorRecord(errorsArray: ApiErrorArray): Record<string, string> {
	return errorsArray.reduce((acc: Record<string, string>, { key, message }) => {
		acc[key] = message
		return acc
	}, {})
}
