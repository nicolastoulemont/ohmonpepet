import { authorize } from '../../utils'
import {
	mutationField,
	stringArg,
	nonNull,
	objectType,
	queryField,
	subscriptionField,
	unionType
} from 'nexus'
import {
	HOURLY_PENDING_PAYMENT_INTENTS,
	HOURLY_CONFIRMED_SETUP_INTENT,
	HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL
} from '../../crons'
import {
	ERRORS_EMAIL_CRON_DONE,
	PENDING_PAYMENT_CRON_DONE,
	SETUP_INTENT_CRON_DONE,
	__prod__
} from '../../constants'

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

export const cronSubscriptionsResult = unionType({
	name: 'CronSubscriptionsResult',
	definition(t) {
		t.members('BooleanResult', 'UserAuthenticationError', 'UserForbiddenError')
	}
})

export const pendingPaymentCronSub = subscriptionField('pendingPaymentCronSub', {
	type: 'CronSubscriptionsResult',
	subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(PENDING_PAYMENT_CRON_DONE),
	authorization: (ctx) => authorize(ctx, 'staff'),
	resolve(root: any) {
		return { success: root.success }
	}
})
export const setupIntentCronSub = subscriptionField('setupIntentCronSub', {
	type: 'CronSubscriptionsResult',
	subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(SETUP_INTENT_CRON_DONE),
	authorization: (ctx) => authorize(ctx, 'staff'),
	resolve(root: any) {
		return { success: root.success }
	}
})
export const errorsEmailCronSub = subscriptionField('errorsEmailCronSub', {
	type: 'CronSubscriptionsResult',
	subscribe: (_, __, ctx) => ctx.pubsub.asyncIterator(ERRORS_EMAIL_CRON_DONE),
	authorization: (ctx) => authorize(ctx, 'staff'),
	resolve(root: any) {
		return { success: root.success }
	}
})
