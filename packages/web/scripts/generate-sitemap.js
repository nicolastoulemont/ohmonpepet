const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
	// Ignore Next.js specific files (e.g., _app.js) and API routes.
	const pages = await globby(['pages/**/*{.ts,.tsx}', '!pages/_*{.ts,.tsx}'])
	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
				.map((page) => {
					const path = page.replace('pages', '').replace('.tsx', '').replace('.ts', '')
					const route = path === '/index' ? '' : path

					return `
                        <url>
                            <loc>${`${process.env.DOMAIN_URL}${route}`}</loc>
                        </url>
                    `
				})
				.join('')}
        </urlset>
    `

	// If you're not using Prettier, you can remove this.
	const formatted = prettier.format(sitemap, {
		parser: 'html'
	})

	fs.writeFileSync('public/sitemap.xml', formatted)
})()
