import { ApolloError } from '@apollo/client'
import { EnrichedGraphQLError } from '../types'

import { InvalidArgument } from '@ohmonpepet/data'
type ApiErrorArray = Array<Pick<InvalidArgument, 'message' | 'key'>>
export function toErrorRecord(errorsArray: ApiErrorArray): Record<string, string> {
	return errorsArray.reduce((acc: Record<string, string>, { key, message }) => {
		acc[key] = message
		return acc
	}, {})
}

export const hasErrors = (error: ApolloError, stateErrors: { [key: string]: string }) => {
	if (!error?.graphQLErrors) return false
	const [errors] = error.graphQLErrors as Readonly<Array<EnrichedGraphQLError>>
	if (errors?.fields && stateErrors !== errors.fields) {
		return true
	} else {
		return false
	}
}

export const getErrors = (error: ApolloError): { [key: string]: string } => {
	const [errors] = error.graphQLErrors as Readonly<Array<EnrichedGraphQLError>>
	return errors.fields
}

export function handleArgErrors(
	errors: Array<{ argKey: string; message: string }>,
	setErrors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
) {
	setErrors(
		errors.reduce((acc, err) => {
			acc[err.argKey] = err.message
			return acc
		}, {})
	)
}
export function handleErrors(
	errors: Array<{ key: string; message: string }>,
	setErrors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
) {
	setErrors(
		errors.reduce((acc, err) => {
			acc[err.key] = err.message
			return acc
		}, {})
	)
}

export const isEmpty = (value: any): boolean =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

export function validateFields(
	fields: Array<string>,
	state: { [key: string]: any },
	setErrors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
): { valid: boolean } {
	const errors = fields.reduce((acc, field) => {
		if (isEmpty(state[field])) {
			acc[field] = 'Obligatoire'
		}
		return acc
	}, {})
	setErrors(errors)
	return { valid: isEmpty(errors) }
}
