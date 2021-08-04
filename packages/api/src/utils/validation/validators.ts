import { isValid } from 'date-fns'

export const ValidatorsRegistry = {
	mail: validateEmail,
	pwd: validatePassword,
	ph: validateFrenchPhoneNumber,
	date: validateDate,
	req: validateReq,
	saveAs: validateSaveAs
} as const

export const isEmpty = (value: any): boolean =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

// Functions to validate user Inputs
export function validateEmail(key: string, value: string | number): string | null {
	if (typeof value !== 'string') {
		return `${value} is not a string`
	}

	if (value === '') return 'Email is required'
	/* eslint-disable no-useless-escape */
	const email_regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/)
	/* eslint-enable */
	if (!email_regex.test(value)) {
		return `${value} is not a valid email address`
	} else {
		return null
	}
}

export function validatePassword(key: string, value: string | number): string | null {
	if (typeof value !== 'string') {
		return `${value} is not a string`
	}
	/* eslint-disable no-useless-escape */
	const minMaxLength = /^[\s\S]{8,32}$/,
		upper = /[A-Z]/,
		lower = /[a-z]/,
		number = /[0-9]/,
		special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/
	/* eslint-enable */

	if (!minMaxLength.test(value)) {
		return 'Password must include 8 to 32 characters'
	} else if (!upper.test(value)) {
		return 'Password must include 1 or more uppercase'
	} else if (!lower.test(value)) {
		return 'Password must include 1 or more lowercase'
	} else if (!number.test(value)) {
		return 'Password must include 1 or more number'
	} else if (!special.test(value)) {
		return 'Password must include 1 or more special character'
	} else {
		return null
	}
}

export function validateFrenchPhoneNumber(key: string, value: string | number): string | null {
	if (typeof value !== 'string') {
		return `${value} is not a string`
	}
	const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
	if (!phoneRegex.test(value)) {
		return `${value} is not a valid french phone number`
	} else {
		return null
	}
}

export function validateDate(key: string, value: number | string): string | null {
	if (!isValid(new Date(value))) {
		return `${value} is not a valid date.`
	} else {
		return null
	}
}

export function validateReq(key: string, value: number | string): string | null {
	if (isEmpty(value)) {
		return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
	} else {
		return null
	}
}

export const saveAsOptions = ['user', 'operator', 'staff']

export function validateSaveAs(key: string, value: number | string): string | null {
	if (isEmpty(value)) {
		return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
	} else if (!saveAsOptions.includes(String(value))) {
		return `${
			key.charAt(0).toUpperCase() + key.slice(1)
		} must be have either of the following values: user, operator, staff`
	} else {
		return null
	}
}
