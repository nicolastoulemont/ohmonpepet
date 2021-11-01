import { format } from 'date-fns'
import { DATE_SEARCH_FORMAT } from 'utils/constants'

const WEEKDAYS_LONG = {
	en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
}
const WEEKDAYS_SHORT = {
	en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa']
}
const MONTHS = {
	en: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	fr: [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	]
}

const FIRST_DAY = {
	en: 1,
	fr: 1 // Use Monday as first day of the week
}

function formatDay(d, locale = 'fr') {
	return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${
		MONTHS[locale][d.getMonth()]
	} ${d.getFullYear()}`
}

function formatMonthTitle(d, locale = 'fr') {
	return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
}

function formatWeekdayShort(i, locale = 'fr') {
	return WEEKDAYS_SHORT[locale][i]
}

function formatWeekdayLong(i, locale = 'fr') {
	return WEEKDAYS_SHORT[locale][i]
}

function getFirstDayOfWeek(locale = 'fr') {
	return FIRST_DAY[locale]
}

export function getMonths(locale = 'fr') {
	return MONTHS[locale]
}

export const localeUtils = {
	formatDay,
	formatMonthTitle,
	formatWeekdayShort,
	formatWeekdayLong,
	getFirstDayOfWeek,
	getMonths
}

export function formatForUrl(date: string | number) {
	return format(new Date(date), DATE_SEARCH_FORMAT)
}

export function getFirstDayOfLastMonth() {
	const today = new Date()
	return new Date(today.getFullYear(), today.getMonth() - 1, 1).getTime()
}

export function getLastDayOfLastMonth() {
	const today = new Date()
	return new Date(today.getFullYear(), today.getMonth(), 0).getTime()
}
