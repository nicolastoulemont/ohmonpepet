import { inputObjectType, mutationField, nonNull, unionType, arg, objectType } from 'nexus'
import prisma from '../../lib/prisma'
import {
	authorize,
	checkArgs,
	NotFoundError,
	PartialInvalidArgumentsError,
	UnableToProcessError,
	stripe,
	isValidOperator
} from '../../utils'
export * from './services'

export const createIndividualOperatorInput = inputObjectType({
	name: 'CreateIndividualOperatorInput',
	definition(t) {
		t.date('birthDate')
		t.string('description')
		t.id('avatarMediaId')
		t.nonNull.list.nonNull.id('acceptedSpecieOptionsIds')
		t.nonNull.list.nonNull.id('languageOptionIds')
		t.nonNull.list.nonNull.id('ownAnimalsSpecieOptionsIds')
		t.string('genderOptionId')
		t.string('hostingOptionId')
		t.string('partnerId')
		t.int('partnerPercentage')
		t.id('stripeAccountId')
	}
})

export const createIndividualOperatorResult = unionType({
	name: 'CreateIndividualOperatorResult',
	description: 'The result of the createIndividualOperator mutation',
	definition(t) {
		t.members(
			'IndividualOperator',
			'InvalidArgumentsError',
			'UnableToProcessError',
			'UserAuthenticationError'
		)
	}
})

export const createIndividualOperator = mutationField('createIndividualOperator', {
	type: 'CreateIndividualOperatorResult',
	args: {
		input: nonNull(arg({ type: 'CreateIndividualOperatorInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, { input }, { user, req }) {
		const existingOperator = await prisma.operator.findUnique({
			where: { accountId: user.accountId }
		})

		if (existingOperator) {
			return {
				...PartialInvalidArgumentsError,
				invalidArguments: [
					{ key: 'operator', message: 'This account already has an operator' }
				]
			}
		} else {
			try {
				const operator = await prisma.operator.create({
					data: {
						accountId: user.accountId,
						...input
					}
				})

				if (req.session.user) {
					req.session.user = {
						...req.session.user,
						operatorId: operator.id
					}
				}

				return operator
			} catch (error) {
				return UnableToProcessError
			}
		}
	}
})

export const updateIndividualOperatorInput = inputObjectType({
	name: 'UpdateIndividualOperatorInput',
	definition(t) {
		t.date('birthDate')
		t.string('description')
		t.id('avatarMediaId')
		t.nonNull.list.nonNull.id('acceptedSpecieOptionsIds')
		t.nonNull.list.nonNull.id('languageOptionIds')
		t.nonNull.list.nonNull.id('ownAnimalsSpecieOptionsIds')
		t.string('genderOptionId')
		t.string('hostingOptionId')
		t.string('partnerId')
		t.int('partnerPercentage')
		t.id('stripeAccountId')
	}
})

export const updateIndividualOperatorResult = unionType({
	name: 'UpdateIndividualOperatorResult',
	description: 'The result of the updateIndividualOperator mutation',
	definition(t) {
		t.members(
			'IndividualOperator',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UserForbiddenError',
			'UnableToProcessError',
			'NotFoundError'
		)
	}
})

export const updateIndividualOperator = mutationField('updateIndividualOperator', {
	type: 'UpdateIndividualOperatorResult',
	args: {
		input: nonNull(arg({ type: 'UpdateIndividualOperatorInput' }))
	},
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, { input }, { user: { accountId } }) {
		try {
			const operator = await prisma.operator.update({
				where: { accountId },
				data: { ...input }
			})
			if (!operator) return NotFoundError
			return operator
		} catch (error) {
			return UnableToProcessError
		}
	}
})

/**
 * TO FINISH:
 * ConnectOperatorToProccessorResult definition -> unionType
 * connectUserToProcessor mutation
 */

export const ConnectOperatorToProccessorResult = objectType({
	name: 'ConnectOperatorToProccessorResult',
	definition(t) {
		t.string('redirectUrl')
	}
})

export const connectUserToStripe = mutationField('connectUserToProcessor', {
	type: 'ConnectOperatorToProccessorResult',
	authorization: (ctx) => authorize(ctx, 'operator'),
	async resolve(_, __, ctx) {
		const profile = await ProfileModel.findById(ctx.user.profileId).lean()
		const user = await UserModel.findById(ctx.user.id).lean()
		try {
			if (!profile || !user)
				return { errors: [{ key: 'profile', message: 'No user profile' }] }
			if (!isValidOperator(profile))
				return {
					errors: [
						{
							key: 'profile',
							message: 'This profile is missing informations to be a pet sitter'
						}
					]
				}
			let stripeAccountId
			if (!profile.stripeAccountId) {
				const account = await stripe.accounts.create({
					type: 'standard',
					email: user.email,
					default_currency: 'eur',
					business_type: 'individual'
				})
				if (!account) {
					return {
						errors: [
							{
								key: 'payment_processor',
								message:
									'Something prevented creating your account with our payment processor'
							}
						]
					}
				}
				stripeAccountId = account.id
				await ProfileModel.findByIdAndUpdate(ctx.user.profileId, { stripeAccountId })
			} else {
				stripeAccountId = profile.stripeAccountId
			}
			const accountLinks = await stripe.accountLinks.create({
				account: stripeAccountId,
				refresh_url:
					process.env.NODE_ENV === 'development'
						? 'http://localhost:3000/onboarding/complete'
						: 'https://ohmonpepet.com/onboarding/complete',
				return_url:
					process.env.NODE_ENV === 'development'
						? 'http://localhost:3000/onboarding/finished'
						: 'https://ohmonpepet.com/onboarding/finished',
				type: 'account_onboarding'
			})
			if (!accountLinks)
				return {
					errors: [
						{
							key: 'payment_processor',
							message:
								'Something prevented linking your account to out paiment processor'
						}
					]
				}
			return { redirectUrl: accountLinks.url }
		} catch (error) {
			console.log(error)
			return UnableToProcessError
		}
	}
})

export const MissingProcessorAccountError = objectType({
	name: 'MissingProcessorAccountError',
	isTypeOf: (data) => Boolean((data as any).missingProcessorAccountError),
	definition(t) {
		t.string('missingProcessorAccountError')
	}
})
export const ChargesNotEnabledProcessorAccountError = objectType({
	name: 'ChargesNotEnabledProcessorAccountError',
	isTypeOf: (data) => Boolean((data as any).chargesNotEnabledProcessorAccountError),
	definition(t) {
		t.string('chargesNotEnabledProcessorAccountError')
	}
})
export const DetailsNotSubmittedProcessorAccountError = objectType({
	name: 'DetailsNotSubmittedProcessorAccountError',
	isTypeOf: (data) => Boolean((data as any).detailsNotSubmittedProcessorAccountError),
	definition(t) {
		t.string('detailsNotSubmittedProcessorAccountError')
	}
})

export const verifyUserProcessorConnectionCompletionResult = unionType({
	name: 'VerifyUserProcessorConnectionCompletionResult',
	definition(t) {
		t.members(
			'BooleanResult',
			'NotFoundError',
			'UnableToProcessError',
			'MissingProcessorAccountError',
			'ChargesNotEnabledProcessorAccountError',
			'DetailsNotSubmittedProcessorAccountError'
		)
	}
})

export const verifyUserProcessorConnectionCompletion = mutationField(
	'verifyUserProcessorConnectionCompletion',
	{
		type: 'VerifyUserProcessorConnectionCompletionResult',
		authorization: (ctx) => authorize(ctx, 'operator'),
		async resolve(_, __, { user: { operatorId } }) {
			try {
				const operator = await prisma.operator.findUnique({ where: { id: operatorId } })
				if (!operator || !operator.stripeAccountId) return NotFoundError

				const stripeAccount = await stripe.accounts.retrieve(operator.stripeAccountId)
				if (!stripeAccount)
					return {
						missingProcessorAccountError:
							'Missing processor account, connect with processor'
					}

				if (!stripeAccount.charges_enabled) {
					const link = await stripe.accountLinks.create({
						account: operator.stripeAccountId,
						refresh_url:
							process.env.NODE_ENV === 'development'
								? 'http://localhost:3000/onboarding/complete'
								: 'https://ohmonpepet.com/onboarding/complete',
						return_url:
							process.env.NODE_ENV === 'development'
								? 'http://localhost:3000/onboarding/finished'
								: 'https://ohmonpepet.com/onboarding/finished',
						type: 'account_onboarding'
					})
					return { chargesNotEnabledProcessorAccountError: link.url }
				} else if (!stripeAccount.details_submitted) {
					const link = await stripe.accountLinks.create({
						account: operator.stripeAccountId,
						refresh_url:
							process.env.NODE_ENV === 'development'
								? 'http://localhost:3000/onboarding/complete'
								: 'https://ohmonpepet.com/onboarding/complete',
						return_url:
							process.env.NODE_ENV === 'development'
								? 'http://localhost:3000/onboarding/finished'
								: 'https://ohmonpepet.com/onboarding/finished',
						type: 'account_onboarding'
					})
					return { detailsNotSubmittedProcessorAccountError: link.url }
				} else {
					if (!operator.isComplete) {
						await prisma.operator.update({
							where: {
								id: operator.id
							},
							data: {
								isComplete: true
							}
						})
					}
					return { success: true }
				}
			} catch (error) {
				return UnableToProcessError
			}
		}
	}
)
