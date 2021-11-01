import { useRouter } from 'next/router'

interface useI18nResult<Content> {
	t: (key: keyof Content[keyof Content], variables?: Record<string, string | number>) => string
	lang: 'en' | 'fr'
	locale: 'en' | 'fr'
}

export const useI18n = <Content>(content?: Content): useI18nResult<Content> => {
	const router = useRouter()
	const fallBackLocale = 'fr'
	const locale = router?.locale ? router.locale : fallBackLocale
	function t(
		key: keyof Content[keyof Content],
		variables?: Record<string, string | number>
	): string {
		let string = locale ? content[locale][key] : content[fallBackLocale][key]
		if (!string && process.env.NODE_ENV !== 'production')
			throw new Error(`No content found for key ${key}`)
		if (variables && string) {
			for (const key in variables) {
				string = string.replace(new RegExp(`{{${key}}}`, 'g'), variables[key])
			}
			return string
		}
		return string.replace(new RegExp(`{{.*}}`, 'g'), '')
	}

	return {
		t,
		lang: locale ? (locale as 'en' | 'fr') : fallBackLocale,
		locale: locale as 'en' | 'fr'
	}
}
