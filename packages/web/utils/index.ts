import { getDistance } from 'geolib'
import { ParsedUrlQuery } from 'querystring'
import { format } from 'date-fns'

export const isServer = typeof window === 'undefined'

export const generateRandomString = () => Math.random().toString(36).substr(2, 5)

const isFloat = (value) => value.includes('.') || value.includes(',')

export function getPercentage(num: number, per: number) {
	return (num / 100) * per
}

export function getValueFromPercentage(percentage: number, number: number) {
	return (number * percentage) / 100
}

export function roundToTwoDecimals(number: number): number {
	return Math.round((number + Number.EPSILON) * 100) / 100
}

type BasicTypedOutput = {
	name: string
	value: string | number | boolean
	type: string
	checked?: boolean
}

export function stringToTyped(e: React.ChangeEvent<any>): BasicTypedOutput {
	const { name, value, type, checked } = e.target

	if (name === 'limit') {
		return { name, type, value: parseInt(value), checked }
	} else if (type === 'number') {
		return { name, type, value: isFloat(value) ? parseFloat(value) : parseInt(value), checked }
	} else if (type === 'checkbox') {
		return { name, type, value: checked, checked }
	} else {
		return { name, type, value, checked }
	}
}

export function capitalizeFirstLetter(string) {
	return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

interface ListItem {
	id: string
	name:
		| {
				fr: string
				en: string
		  }
		| string
	iconUrl?: string
}

export function lookUpByItemId<T extends { id: string }>(list: Array<T>): Record<string, T> {
	if (!list) return {}
	return list.reduce((acc, item) => {
		acc[item.id] = item
		return acc
	}, {})
}

export function listAsOptions(
	list: Array<ListItem>,
	locale: 'fr' | 'en',
	valueKey: string = 'id',
	textKey: string = 'name'
) {
	if (!list) return []
	return list.map((item) => ({
		key: item.id,
		value: item[valueKey],
		text:
			typeof item[textKey] === 'string'
				? capitalizeFirstLetter(item[textKey])
				: capitalizeFirstLetter(item[textKey][locale]),
		iconUrl: item.iconUrl ? item.iconUrl : null
	}))
}

export function removeTypename<T extends { [key: string]: any | Array<any> }>(
	value: T
): Omit<T, '__typename'> {
	if (value === null || value === undefined) {
		return value
	} else if (Array.isArray(value)) {
		// @ts-ignore
		return value.map((v) => removeTypename(v))
	} else if (typeof value === 'object') {
		// @ts-ignore
		const newObj: T = {}
		Object.entries(value).forEach(([key, v]) => {
			if (key !== '__typename') {
				// @ts-ignore
				newObj[key] = removeTypename(v)
			}
		})
		return newObj
	}
	return value
}

export function getIntervalDays(start: Date, end: Date) {
	let arr = []
	if (start && !end) {
		return [new Date(start)]
	}
	if (end && !start) {
		return [new Date(end)]
	} else {
		for (let date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
			arr.push(new Date(date))
		}
		return arr
	}
}
export function getIntervalFormattedDays(start: Date, end: Date) {
	let arr = []
	if (start && !end) {
		return [format(new Date(start), 'yyyy-MM-dd')]
	}
	if (end && !start) {
		return [format(new Date(end), 'yyyy-MM-dd')]
	} else {
		for (let date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
			arr.push(format(new Date(date), 'yyyy-MM-dd'))
		}
		return arr
	}
}

interface LocationData {
	lat: number
	lng: number
}

export function getDist(first: LocationData, second: LocationData) {
	if (!first || !second) return ''
	const distance = getDistance(first, second)
	if (distance > 1000) {
		return `${Math.round(distance / 1000)}km`
	} else {
		return `${Math.round(distance)}m`
	}
}

export function parseUrl(query: ParsedUrlQuery) {
	let values = {}

	// Simple copies
	query.id ? (values = { ...values, id: query.id }) : null
	query.src ? (values = { ...values, src: query.src }) : null
	query.address ? (values = { ...values, address: query.address }) : null
	query.startDate ? (values = { ...values, startDate: query.startDate }) : null
	query.endDate ? (values = { ...values, endDate: query.endDate }) : null
	query.service ? (values = { ...values, service: query.service }) : null

	// Parsing changes
	query.acceptedAnimalsIds
		? (values = {
				...values,
				acceptedAnimalsIds: Array.isArray(query.acceptedAnimalsIds)
					? query.acceptedAnimalsIds
					: [query.acceptedAnimalsIds]
		  })
		: null
	query.selectedOptions
		? (values = {
				...values,
				selectedOptions: Array.isArray(query.selectedOptions)
					? query.selectedOptions
					: [query.selectedOptions]
		  })
		: null
	query.lng && query.lat
		? (values = {
				...values,
				location: {
					type: 'Point',
					// @ts-ignore
					coordinates: [parseFloat(query.lng), parseFloat(query.lat)]
				}
		  })
		: null

	return values
}

interface SelectedOption {
	price: number
}

export function calculateTotalPrice<Option extends SelectedOption>(
	numberOfDays: number,
	selectedOptions: Array<Option> = [],
	sitterProfile: object,
	serviceName: string
) {
	let total = sitterProfile[serviceName] * numberOfDays
	selectedOptions.forEach((option) => (total += option.price))
	return total
}
