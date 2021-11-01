import { queryField, objectType, stringArg, nonNull, unionType } from 'nexus'
import algoliasearch from 'algoliasearch'
import { checkArgs, UnableToProcessError } from '../../utils'

const places = algoliasearch.initPlaces(
	process.env.ALGOLIA_APP_ID as string,
	process.env.ALGOLIA_API_KEY as string
)

export const LocationSearchInfos = objectType({
	name: 'LocationSearchInfos',
	definition(t) {
		t.string('id')
		t.string('formattedLocationString')
		t.string('locale_names')
		t.string('postcode')
		t.string('city')
		t.string('country')
		t.string('country_code')
		t.latitude('latitude')
		t.longitude('longitude')
	}
})

export const LocationsList = objectType({
	name: 'LocationsList',
	isTypeOf: (data) => Boolean((data as any).locations),
	definition(t) {
		t.list.field('locations', { type: 'LocationSearchInfos' })
	}
})

export const LocationSearchResult = unionType({
	name: 'LocationSearchResult',
	definition(t) {
		t.members('LocationsList', 'UnableToProcessError', 'InvalidArgumentsError')
	}
})

interface highlightResultValueInterface {
	fullyHighlighted?: boolean
	matchLevel: string
	matchedWords: string[]
	value: string
}

export interface LocationSearchHitInterface {
	country: string
	is_country: boolean
	city?: Array<string> | undefined
	is_highway: boolean
	importance: number
	_tags: Array<string>
	postcode?: Array<string> | undefined
	county?: Array<string> | undefined
	population?: number | undefined
	country_code: string
	is_city: boolean
	is_popular: boolean
	administrative?: Array<string> | undefined
	admin_level: number
	is_suburb: boolean
	locale_names: Array<string>
	_geoloc: {
		lat: number
		lng: number
	}
	objectID: string
	_highlightResult: {
		administrative: highlightResultValueInterface
		country: highlightResultValueInterface
		county?: highlightResultValueInterface
		locale_names: highlightResultValueInterface[]
		postcode: highlightResultValueInterface[]
	}
}

function getLocationNeededInfos(apiData: Array<LocationSearchHitInterface>) {
	const virgule = ', '
	return apiData.map((hit) => ({
		id: hit.objectID,
		formattedLocationString: `${hit.locale_names[0]}${
			hit.postcode ? virgule.concat(hit.postcode[0]) : ''
		}${hit.city ? virgule.concat(hit.city[0]) : ''}${
			hit.country ? virgule.concat(hit.country) : ''
		}`,
		locale_names: hit.locale_names[0],
		postcode: hit.postcode && hit.postcode[0],
		city: hit.city && hit.city[0],
		country: hit.country,
		country_code: hit.country_code,
		latitude: hit._geoloc.lat,
		longitude: hit._geoloc.lng
	}))
}

export const locationSearch = queryField('locationSearch', {
	type: 'LocationSearchResult',
	args: {
		query: nonNull(stringArg()),
		locale: nonNull(stringArg())
	},
	validation: (args) => checkArgs(args, ['query', 'locale']),
	async resolve(_, args) {
		try {
			const query = await places.search({
				query: args.query,
				language: args.locale,
				hitsPerPage: 5,
				getRankingInfo: false
			})

			if (query.hits.length === 0) return { locations: [] }
			return { locations: getLocationNeededInfos(query.hits) }
		} catch (error) {
			return UnableToProcessError
		}
	}
})
