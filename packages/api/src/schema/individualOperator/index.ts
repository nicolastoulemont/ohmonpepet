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
		t.id('genderOptionId')
		t.datetime('averageResponseTime')
		t.float('averageScore')
		t.field('avatar', {
			type: 'Media',
			resolve: async (i) =>
				await prisma.media.findUnique({ where: { id: i.avatarMediaId as string } })
		})
		t.field('account', {
			type: 'Account',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.account()
		})
		t.field('location', {
			type: 'Location',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.location()
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
			type: 'IndividualOperatorExtraService',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.extraServices()
		})
		t.list.field('donations', {
			type: 'Donation',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.donations()
		})
		t.list.field('reviews', {
			type: 'Review',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.reviews()
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
		t.list.field('bids', {
			type: 'BookingAdBid',
			resolve: async (i) =>
				await prisma.operator
					.findUnique({
						where: { id: i.id }
					})
					.bookingAdBids()
		})
	}
})
