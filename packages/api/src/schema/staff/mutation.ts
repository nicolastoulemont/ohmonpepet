import { authorize } from '../../utils'
import { __prod__ } from '../../constants'
import { mutationField, stringArg, nonNull, unionType } from 'nexus'
import {
	HOURLY_PENDING_PAYMENT_INTENTS,
	HOURLY_CONFIRMED_SETUP_INTENT,
	HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL
} from '../../crons'

export const startCronResult = unionType({
	name: 'StartCronResult',
	definition(t) {
		t.members('BooleanResult', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const startCron = mutationField('startCron', {
	type: 'StartCronResult',
	args: {
		cronName: nonNull(stringArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve(_, { cronName }) {
		if (cronName === 'HOURLY_PENDING_PAYMENT_INTENTS') {
			HOURLY_PENDING_PAYMENT_INTENTS.start()
		} else if (cronName === 'HOURLY_CONFIRMED_SETUP_INTENT') {
			HOURLY_CONFIRMED_SETUP_INTENT.start()
		} else if (cronName === 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL') {
			HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL.start()
		} else if (cronName === 'ALL') {
			HOURLY_CONFIRMED_SETUP_INTENT.start()
			HOURLY_PENDING_PAYMENT_INTENTS.start()
			HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL.start()
		}

		return { success: true }
	}
})

export const stopCronResult = unionType({
	name: 'StopCronResult',
	definition(t) {
		t.members('BooleanResult', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const stopCron = mutationField('stopCron', {
	type: 'StopCronResult',
	args: {
		cronName: nonNull(stringArg())
	},
	authorization: (ctx) => authorize(ctx, 'staff'),
	async resolve(_, { cronName }) {
		if (cronName === 'HOURLY_PENDING_PAYMENT_INTENTS') {
			HOURLY_PENDING_PAYMENT_INTENTS.stop()
		} else if (cronName === 'HOURLY_CONFIRMED_SETUP_INTENT') {
			HOURLY_CONFIRMED_SETUP_INTENT.stop()
		} else if (cronName === 'HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL') {
			HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL.stop()
		} else if (cronName === 'ALL') {
			HOURLY_CONFIRMED_SETUP_INTENT.stop()
			HOURLY_PENDING_PAYMENT_INTENTS.stop()
			HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL.stop()
		}
		return { success: true }
	}
})
