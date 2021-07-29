export function hasKey<T extends object, K extends keyof T>(obj: T, key: K) {
	return typeof obj[key] !== 'undefined'
}
