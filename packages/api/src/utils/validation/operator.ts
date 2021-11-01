import { isEmpty } from './validators'

export const operatorNeededFields = [
	'firstName',
	'lastName',
	'genderOptionId',
	'hostingOptionId',
	'acceptedSpecieOptionsIds',
	'languageOptionIds',
	'birthDate',
	'avatar',
	'address',
	'description',
	'atHomeDay',
	'availability'
]

// TO REWORK TO ACCOUNT FOR THE DIFFERENT DATA STRUCTURE OF THE INCOMING DATA
export const isValidOperator = (data: { [key: string]: any }) =>
	operatorNeededFields.reduce((acc, field) => {
		if (isEmpty(data[field])) {
			acc = false
		}
		return acc
	}, true)
