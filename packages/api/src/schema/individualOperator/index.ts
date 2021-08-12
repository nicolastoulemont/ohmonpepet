import { objectType, unionType } from 'nexus'
import prisma from '../../lib/prisma'
export * from './query'
export * from './mutation'
export * from './services'
export * from './availability'

export const IndividualOperator = objectType({
	isTypeOf: (data) => Boolean((data as any).birthDate),
	name: 'IndividualOperator',
	definition(t) {
		t.implements('Operator')
		t.date('birthDate')
		t.field('account', {
			type: 'Account',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.account()
		})
		t.field('hosting', {
			type: 'HostingOption',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.hosting()
		})
		t.field('gender', {
			type: 'GenderOption',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.gender()
		})
		t.field('partner', {
			type: 'Partner',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.partner()
		})
		t.field('extraServices', {
			type: 'Account',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.extraServices()
		})
		t.list.field('medias', {
			type: 'Media',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.medias()
		})
		t.list.field('coreServices', {
			type: 'IndividualOperatorCoreService',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.coreServices()
		})
		t.list.field('availabilities', {
			type: 'OperatorAvailability',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.availabilities()
		})
	}
})

export const IndividualOperatorResult = unionType({
	name: 'IndividualOperatorResult',
	description: 'Return an individual operator or related errors',
	definition(t) {
		t.members(
			'IndividualOperator',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})
