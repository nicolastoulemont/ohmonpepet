import { format } from 'date-fns'

export function getIntervalDays(start: Date | string, end: Date | string): Array<string> {
	let arr: Array<string> = []
	if (start && !end) {
		return [format(new Date(start), 'yyyy-MM-dd')]
	} else if (end && !start) {
		return [format(new Date(end), 'yyyy-MM-dd')]
	} else {
		for (let date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
			arr.push(format(new Date(date), 'yyyy-MM-dd'))
		}
		return arr
	}
}
