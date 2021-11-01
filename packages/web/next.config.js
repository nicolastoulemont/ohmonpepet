// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true'
// })

// TO ADD if IE is needed
// const withTM = require('next-transpile-modules')(['@chakra-ui', 'framer-motion', 'date-fns'])

const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
	layoutPath: 'blog',
	defaultLayout: true,
	fileExtensions: ['mdx'],
	usesSrc: false,
	extendFrontMatter: {
		process: (mdxContent, frontMatter) => {},
		phase: 'prebuild|loader|both'
	},
	reExportDataFetching: false
})({
	poweredByHeader: false,
	i18n: {
		// These are all the locales you want to support in
		// your application
		locales: ['en', 'fr'],
		// This is the default locale you want to be used when visiting
		// a non-locale prefixed path e.g. `/hello`
		defaultLocale: 'fr'
	}
	//
	// webpack: (config, { isServer }) => {
	// 	if (isServer) {
	// 		require('./scripts/generate-sitemap')
	// 	}

	// 	return config
})
