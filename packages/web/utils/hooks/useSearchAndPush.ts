import { useRouter } from 'next/router'
import { formatForUrl } from 'utils/dates'

export function hasGeo({ coordinates }: { type: string; coordinates: Array<number> }): boolean {
	if (coordinates[0] && coordinates[1]) return true
	return false
}

export function useSearchAndPush(state, fallBackState) {
	const { push } = useRouter()

	const { address, location, acceptedAnimalsIds } = state
	const { address: fb_address, location: fb_location } = fallBackState

	const vals = {
		startDate: formatForUrl(state.startDate),
		endDate: formatForUrl(state.endDate),
		acceptedAnimalsIds
	}

	function search() {
		if (address && hasGeo(location)) {
			push({
				pathname: '/search',
				query: {
					...vals,
					address: address,
					lat: location.coordinates[1],
					lng: location.coordinates[0]
				}
			})
		} else if (fb_address && hasGeo(fb_location)) {
			push({
				pathname: '/search',
				query: {
					...vals,
					address: fb_address,
					lat: fb_location.coordinates[1],
					lng: fb_location.coordinates[0]
				}
			})
		}
	}

	const canSearch = () => (address && hasGeo(location)) || (fb_address && hasGeo(fb_location))

	return { valid: canSearch(), search }
}
