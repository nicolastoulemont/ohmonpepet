import prisma from '../../lib/prisma'
import { idArg, nonNull, queryField, unionType, objectType, stringArg } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'
import {
	HOURLY_PENDING_PAYMENT_INTENTS,
	HOURLY_CONFIRMED_SETUP_INTENT,
	HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL
} from '../../crons'

export const CurrentStaffResult = unionType({
	name: 'CurrentStaffResult',
	definition(t) {
		t.members('Staff', 'UserAuthenticationError', 'UserForbiddenError', 'NotFoundError')
	}
})

export const CurrentStaff = queryField('currentStaff', {
	type: 'CurrentStaffResult',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve(_, __, { user: { staffId } }) {
		try {
			return await prisma.staff.findUnique({ where: { id: staffId }, rejectOnNotFound: true })
		} catch (error) {
			return NotFoundError
		}
	}
})

export const StaffByIdResult = unionType({
	name: 'StaffByIdResult',
	description: 'The result of the StaffById query',
	definition(t) {
		t.members(
			'Staff',
			'NotFoundError',
			'UserAuthenticationError',
			'UserForbiddenError',
			'InvalidArgumentsError'
		)
	}
})

export const StaffById = queryField('staffById', {
	type: 'StaffByIdResult',
	args: {
		id: nonNull(idArg())
	},
	description: 'Access restricted to Staff Staffs',
	authorization: (ctx) => authorize(ctx, 'staff'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }) {
		try {
			return await prisma.staff.findUnique({
				where: { id },
				rejectOnNotFound: true
			})
		} catch (error) {
			return NotFoundError
		}
	}
})

export const StaffsList = objectType({
	name: 'StaffsList',
	isTypeOf: (data) => Boolean((data as any).staffs),
	description: 'List of Staffs',
	definition(t) {
		t.list.field('staffs', { type: 'Staff' })
	}
})

export const allStaffsResults = unionType({
	name: 'AllStaffsResult',
	description: 'The result of the allStaffs query',
	definition(t) {
		t.members(
			'StaffsList',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError'
		)
	}
})

export const allStaffs = queryField('allStaffs', {
	type: 'AllStaffsResult',
	description: 'Access restricted to Staff Staffs',
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve() {
		try {
			const staffs = await prisma.staff.findMany()
			return { staffs }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const CronStatus = objectType({
	name: 'CronStatus',
	isTypeOf: (data) => Boolean((data as any).status),
	definition(t) {
		t.string('status')
	}
})

export const cronStatusResult = unionType({
	name: 'GetCronStatusResult',
	definition(t) {
		t.members('CronStatus', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const getCronStatus = queryField('getCronStatus', {
	type: 'GetCronStatusResult',
	args: {
		cronName: nonNull(stringArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	resolve(_, { cronName }) {
		let status
		if (cronName === 'HOURLY_PENDING_PAYMENT_INTENTS') {
			status = HOURLY_PENDING_PAYMENT_INTENTS.getStatus()
		} else if (cronName === 'HOURLY_CONFIRMED_SETUP_INTENT') {
			status = HOURLY_CONFIRMED_SETUP_INTENT.getStatus()
		} else if (cronName === 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL') {
			status = HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL.getStatus()
		}
		return { status: status ? status.toUpperCase() : 'NOT_SCHEDULED' }
	}
})
