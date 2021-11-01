import { NextSeoProps } from 'next-seo'

type PossibleLocales = 'fr' | 'en'

const description = {
	fr:
		"Ohmonpepet est plateforme de petsitting pour trouver rapidement un pet sitter ou effectuer des gardes d'animaux",
	en: 'Ohmonpepet is a petsitting platform to quickly find a pet sitter or perform pet sittings'
}

const title = {
	fr: 'Ohmonpepet | La plateforme de petsitting',
	en: 'Ohmonpepet | The petsitting plateform'
}

export const generateNextSeoProps = (lang: PossibleLocales = 'fr'): NextSeoProps => ({
	title: title[lang],
	description: description[lang],
	canonical: 'https://ohmonpepet.com',
	languageAlternates: [
		{ hrefLang: 'fr', href: 'https://ohmonpepet.com' },
		{ hrefLang: 'en', href: 'https://ohmonpepet.com/en' }
	],
	openGraph: {
		type: 'website',
		locale: lang,
		url: 'https://ohmonpepet.com',
		site_name: 'Ohmonpepet',
		title: title[lang],
		description: description[lang],
		images: [
			{
				url: 'https://ohmonpepet.com/og-default-image.png',
				width: 256,
				height: 256,
				alt: 'Ohmonpepet logo'
			}
		]
	},
	twitter: {
		handle: '@ohmonpepet',
		site: '@ohmonpepet',
		cardType: 'summary_large_image'
	}
})

export const petsitterTitle = {
	fr: 'Espace petsitter',
	en: 'Petsitter space'
}

export const petsitterAds = {
	fr: 'Annonces petsitter',
	en: 'Petsitter ads'
}

export const petsitterBids = {
	fr: 'Candidatures petsitter',
	en: 'Petsitter bids'
}

export const petsitterMetrics = {
	fr: 'Statistiques petsitter',
	en: 'Petsitter stats'
}

export const bookingList = {
	fr: 'Liste des réservations',
	en: 'Bookings list'
}
