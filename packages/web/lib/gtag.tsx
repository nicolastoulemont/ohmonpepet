import { useEffect } from 'react'
import { useRouter } from 'next/router'
// https://github.com/vercel/next.js/tree/master/examples/with-google-analytics

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTAG_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	// @ts-ignore
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url
	})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	// @ts-ignore
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value
	})
}

export function useGtag() {
	const router = useRouter()
	const isProdAndTrackingIdIsAvailable =
		process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GTAG_ID

	useEffect(() => {
		const handleRouteChange = (url) => pageview(url)
		if (isProdAndTrackingIdIsAvailable) {
			router.events.on('routeChangeComplete', handleRouteChange)
		}

		return () => {
			if (isProdAndTrackingIdIsAvailable) {
				router.events.off('routeChangeComplete', handleRouteChange)
			}
		}
	}, [router.events])
}
