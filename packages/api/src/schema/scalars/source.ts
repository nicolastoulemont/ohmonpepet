import { Kind, GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'

const sourceOptions = ['USER', 'OPERATOR']

const validate = (value: any) => {
	if (typeof value !== 'string') {
		throw new TypeError(`Value is not string: ${value}`)
	}

	if (!sourceOptions.includes(String(value))) {
		throw new TypeError(`Value is not a valid source input: ${value}`)
	}

	return value
}

export const GraphQLSourceConfig: GraphQLScalarTypeConfig<string, string> = /*#__PURE__*/ {
	name: 'SourceValue',
	description: 'A field whose value must be either: USER, OPERATOR',
	serialize: validate,
	parseValue: validate,
	parseLiteral(ast) {
		if (ast.kind !== Kind.STRING) {
			throw new GraphQLError(`Can only validate strings but got a: ${ast.kind}`)
		}

		return validate(ast.value)
	}
}

export const SourceValueResolver = /*#__PURE__*/ new GraphQLScalarType(GraphQLSourceConfig)
