import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()

function getFilesPath(dir) {
	let files = fs.readdirSync(dir)
	// @ts-ignore
	files = files.map((file) => {
		const filePath = path.join(dir, file)
		const stats = fs.statSync(filePath)
		if (stats.isDirectory()) return getFilesPath(filePath)
		else if (stats.isFile()) return filePath
	})

	return files.reduce((all, folderContents) => all.concat(folderContents), []) as Array<string>
}

export function generateArticleList() {
	const filesPath = getFilesPath(path.join(root, 'pages', 'article'))
	const filesFrontMatter = filesPath.map((filePath) => {
		const source = fs.readFileSync(filePath, 'utf8')
		const { data } = matter(source)
		return {
			...data,
			slug: filePath.split('pages')[1].replace('.mdx', '')
		}
	})

	return filesFrontMatter.sort(
		// @ts-expect-error
		(a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
	)
}
