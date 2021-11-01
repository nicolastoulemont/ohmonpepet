import Cookies from 'universal-cookie'
import { addYears, addMonths } from 'date-fns'
const cookies = new Cookies()

interface ConsentObject {
	consent: 'no-consent' | 'consent'
	date: number
}

const PREFERENCES_COOKIE_NAME = 'preferences-cookie'

export function setPreferencesCookie(consent: ConsentObject) {
	cookies.set(PREFERENCES_COOKIE_NAME, consent, {
		path: '/',
		expires: consent.consent === 'consent' ? addYears(Date.now(), 1) : addMonths(Date.now(), 3)
	})
}

export function getPreferencesCookie() {
	return cookies.get(PREFERENCES_COOKIE_NAME)
}
