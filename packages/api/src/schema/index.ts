import { fieldValidationPlugin, fieldAuthorizationPlugin, OperationLoggerPlugin } from './plugins'
import { makeSchema } from 'nexus'
import { __prod__ } from '../constants'
import * as types from './typeDefs'
import path from 'path'
import fs from 'fs'

const isTranspiled = () => !fs.existsSync(path.resolve(__dirname, '../', 'config', 'context.ts'))

export const schema = makeSchema({
	shouldGenerateArtifacts: !isTranspiled() && !__prod__,
	types,
	outputs: {
		schema: path.join(__dirname, './schema.graphql'),
		typegen: path.join(__dirname, './nexus-typegen.d.ts')
	},
	plugins: [fieldValidationPlugin, fieldAuthorizationPlugin, OperationLoggerPlugin],
	features: {
		abstractTypeStrategies: {
			isTypeOf: true
		}
	},
	// @ts-expect-error
	contextType: !isTranspiled()
		? {
				module: path.join(__dirname, '../', 'config', 'context.ts'),
				export: 'ApiContext'
		  }
		: {}
})
