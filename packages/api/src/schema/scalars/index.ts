import { asNexusMethod } from 'nexus'
import {
	DateTimeResolver,
	DateResolver,
	EmailAddressResolver,
	JWTResolver,
	LatitudeResolver,
	LongitudeResolver,
	URLResolver
} from 'graphql-scalars'

export const GQLDateTime = asNexusMethod(DateTimeResolver, 'datetime')

export const GQLDate = asNexusMethod(DateResolver, 'date')

export const GQLEmail = asNexusMethod(EmailAddressResolver, 'email')

export const GQLJwt = asNexusMethod(JWTResolver, 'jwt')

export const GQLLat = asNexusMethod(LatitudeResolver, 'latitude')

export const GQLLong = asNexusMethod(LongitudeResolver, 'longitude')

export const GQLUrl = asNexusMethod(URLResolver, 'url')
