module.exports = {
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
}
