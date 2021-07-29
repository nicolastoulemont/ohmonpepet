import prisma from '../../lib/prisma'
import { idArg, nonNull, queryField, unionType, objectType } from 'nexus'
import { authorize, checkArgs, NotFoundError, UnableToProcessError } from '../../utils'

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
