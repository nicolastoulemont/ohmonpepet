const EARTH_RADIUS_IN_KILOMETERS = 6378.137

type Points = { latitude: number; longitude: number }
type EdgePoints = {
	minLatitude: number
	maxLatitude: number
	minLongitude: number
	maxLongitude: number
}

export function defineGeometricQuerySquare(
	distanceInKms: number,
	{ latitude, longitude }: Points
): EdgePoints {
	const pi = Math.PI
	const minLatitude = latitude + (-distanceInKms / EARTH_RADIUS_IN_KILOMETERS) * (180 / pi)
	const maxLatitude = latitude + (distanceInKms / EARTH_RADIUS_IN_KILOMETERS) * (180 / pi)

	const minLongitude =
		longitude +
		((-distanceInKms / EARTH_RADIUS_IN_KILOMETERS) * (180 / pi)) /
			Math.cos((latitude * pi) / 180)
	const maxLongitude =
		longitude +
		((distanceInKms / EARTH_RADIUS_IN_KILOMETERS) * (180 / pi)) /
			Math.cos((latitude * pi) / 180)

	return { minLatitude, maxLatitude, minLongitude, maxLongitude }
}
