interface OgImage {
	url: string
	width?: number
	height?: number
	alt: string
}

export interface BlogMetaData {
	publicationDate: string
	modificationDate?: string
	thumbnail: {
		url: string
		alt: string
	}
	title: string
	snippet: string
	description: string
	images?: Array<OgImage>
}

export type BlogMetaDataWithSlug = BlogMetaData & { slug: string }
