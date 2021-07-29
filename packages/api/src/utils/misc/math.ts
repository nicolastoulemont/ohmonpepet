export function getPercentage(num: number, per: number) {
	return (num / 100) * per
}

export function getValueFromPercentage(percentage: number, number: number) {
	return (number * percentage) / 100
}

export const priceInCents = (num: number): number => Math.floor(num * 100)

export function roundToTwoDecimals(number: number): number {
	return Math.round((number + Number.EPSILON) * 100) / 100
}
