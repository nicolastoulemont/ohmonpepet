import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from './MDXComponents'

export function MDXWithChakraProvider({ children }) {
	return <MDXProvider components={MDXComponents}>{children}</MDXProvider>
}
