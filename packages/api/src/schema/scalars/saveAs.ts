import { Kind, GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { saveAsOptions } from '../../utils'

const validate = (value: any) => {
	if (typeof value !== 'string') {
		throw new TypeError(`Value is not string: ${value}`)
	}

	if (!saveAsOptions.includes(String(value))) {
		throw new TypeError(`Value is not a valid saveAs input: ${value}`)
	}

	return value
}

export const GraphQLCurrencyConfig: GraphQLScalarTypeConfig<string, string> = /*#__PURE__*/ {
	name: 'SaveAsValue',
	description: 'A field whose value must be either: user, operator, admin',
	serialize: validate,
	parseValue: validate,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(
				`Can only validate strings as email addresses but got a: ${ast.kind}`
			)
		}

		return validate(ast.value)
	}
}

export const SaveAsValueResolver = /*#__PURE__*/ new GraphQLScalarType(GraphQLCurrencyConfig)
