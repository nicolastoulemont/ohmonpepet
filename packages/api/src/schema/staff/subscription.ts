import { subscriptionField, unionType } from 'nexus'
import { authorize } from '../../utils'
import {
	ERRORS_EMAIL_CRON_DONE,
	PENDING_PAYMENT_CRON_DONE,
	SETUP_INTENT_CRON_DONE
} from '../../constants'

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
