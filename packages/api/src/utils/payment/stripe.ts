import Stripe from 'stripe'

const apiKey =
	process.env.NODE_ENV === 'development'
		? process.env.STRIPE_TESTING_SECRET_KEY
		: process.env.STRIPE_PROD_SECRET_KEY

export const stripe = new Stripe(apiKey as string, {
	apiVersion: '2020-08-27'
})
