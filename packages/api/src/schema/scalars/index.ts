import { asNexusMethod } from 'nexus'
import { SaveAsValueResolver } from './saveAs'
import { SourceValueResolver } from './source'
import {
	DateTimeResolver,
	DateResolver,
	EmailAddressResolver,
	JWTResolver,
	LatitudeResolver,
	LongitudeResolver,
	URLResolver,
	JSONResolver,
	PositiveFloatResolver
} from 'graphql-scalars'

export const GQLJSON = asNexusMethod(JSONResolver, 'json')

export const GQLDateTime = asNexusMethod(DateTimeResolver, 'datetime')

export const GQLDate = asNexusMethod(DateResolver, 'date')

export const GQLEmail = asNexusMethod(EmailAddressResolver, 'email')

export const GQLJwt = asNexusMethod(JWTResolver, 'jwt')

export const GQLLat = asNexusMethod(LatitudeResolver, 'latitude')

export const GQLLong = asNexusMethod(LongitudeResolver, 'longitude')

export const GQLUrl = asNexusMethod(URLResolver, 'url')

export const GQLSaveAs = asNexusMethod(SaveAsValueResolver, 'saveAs')
export const GQLSource = asNexusMethod(SourceValueResolver, 'source')

export const GQLPositiveFloat = asNexusMethod(PositiveFloatResolver, 'positiveFloat')
