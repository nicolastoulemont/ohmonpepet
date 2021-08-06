import {
	inputObjectType,
	arg,
	mutationField,
	idArg,
	objectType,
	nonNull,
	stringArg,
	unionType
} from 'nexus'

import {
	authorize,
	checkArgs,
	NotFoundError,
	getIntervalDays,
	getValueFromPercentage,
	priceInCents,
	stripe,
	useBookingPrice,
	PartialInvalidArgumentsError,
	UnableToProcessError,
	UserForbiddenError
} from '../../utils'
import prisma from '../../lib/prisma'
import { addDays, isAfter, subDays } from 'date-fns'
import { PAYMENT_STATUS, STRIPE_TARGET_APIS } from './constants'
import { CREATED_BOOKING, UPDATED_BOOKING } from '../../constants/pubsub'
import {
	sendPetSitterSelectedEmail,
	sendOwnerPetSitterAcceptedBookingEmail,
	sendOwnerPetSitterRejectedBookingEmail,
	sendPetSitterBookingCanceledEmail,
	sendSitterPaymentAuthorizedEmail,
	sendOwnerPaymentAuthorizedEmail,
	sendOwnerPaymentMethodSavedEmail
} from '../../emails'

export const CreateBookingInput = inputObjectType({
	name: 'CreateBookingInput',
	definition(t) {
		t.nonNull.id('operatorId')
		t.nonNull.id('serviceOptionId')
		t.nonNull.string('startDate')
		t.nonNull.string('endDate')
		t.nonNull.list.nonNull.string('animalsIds')
		t.list.json('selectedOptions')
		t.string('message')
	}
})

export const CannotBookHimSelfError = objectType({
	name: 'CannotBookHimSelfError',
	isTypeOf: (data) => Boolean((data as any).cannotBookHimSelfError),
	definition(t) {
		t.string('cannotBookHimSelfError')
	}
})
export const ExistingBookingError = objectType({
	name: 'ExistingBookingError',
	isTypeOf: (data) => Boolean((data as any).existingBookingError),
	definition(t) {
		t.string('existingBookingError')
	}
})

export const NotSupportedExtraServiceError = objectType({
	name: 'NotSupportedExtraServiceError',
	isTypeOf: (data) => Boolean((data as any).notSupportedExtraServiceError),
	definition(t) {
		t.string('notSupportedExtraServiceError')
	}
})

export const CreateBookingResult = unionType({
	name: 'CreateBookingResult',
	definition(t) {
		t.members(
			'Booking',
			'CannotBookHimSelfError',
			'ExistingBookingError',
			'NotSupportedExtraServiceError',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UnableToProcessError',
			'NotFoundError'
		)
	}
})

const ExistingBookingErrorObject = {
	existingBookingError: 'A booking already exiting between this user and operator at theses dates'
}

const CannotBookingHimSelfErrorObject = {
	cannotBookHimSelfError: 'An operator cannot book himself'
}

export const createBooking = mutationField('createBooking', {
	type: 'CreateBookingResult',
	args: {
		input: nonNull(
			arg({
				type: 'CreateBookingInput'
			})
		)
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) =>
		checkArgs(args, [
			'operatorId',
			'serviceOptionId',
			'startDate:date',
			'endDate:date',
			'animalsIds'
		]),
	async resolve(
		_,
		{
			input: {
				operatorId,
				serviceOptionId,
				startDate,
				endDate,
				animalsIds,
				selectedOptions,
				message
			}
		},
		{ user: { userId }, pubsub }
	) {
		try {
			const requiredDays = getIntervalDays(startDate, endDate)
			const operator = await prisma.operator.findFirst({
				where: {
					id: operatorId,
					AND: [
						// Verify that the operator provides the asked services
						{
							coreServices: {
								some: { serviceOptionId: { equals: serviceOptionId } }
							}
						},
						// Verify that the operator accepts all asked animals species
						{
							AND: animalsIds.map((id) => ({
								acceptedSpecieOptionsIds: { has: id }
							}))
						},
						// Verify that the operator is available at the required days
						{
							availabilities: {
								every: { date: { in: requiredDays } }
							}
						}
					]
				},
				include: {
					account: {
						select: {
							email: true,
							user: { select: { id: true } }
						}
					},
					extraServices: true,
					coreServices: {
						where: {
							serviceOptionId: { equals: serviceOptionId }
						},
						select: { price: true }
					}
				}
			})

			if (!operator) return NotFoundError
			if (operator.account?.user?.id === userId) return CannotBookingHimSelfErrorObject

			const existingBooking = await prisma.booking.findFirst({
				where: { userId, operatorId, serviceOptionId, startDate, endDate }
			})

			if (existingBooking) return ExistingBookingErrorObject

			const { priceWithOutApplicationFee, applicationFeeAmount } = await useBookingPrice({
				coreServicePrice: operator.coreServices[0].price as number,
				startDate,
				endDate,
				selectedOptions
			})

			const booking = await prisma.booking.create({
				data: {
					userId,
					serviceOptionId,
					selectedOptions,
					startDate,
					endDate,
					operatorId: operator.id,
					ownerConfirmationDate: new Date(),
					priceWithOutApplicationFee,
					applicationFeeAmount
				}
			})

			await prisma.bookingAnimal.createMany({
				data: animalsIds.map((id) => ({ bookingId: booking.id, specieOptionId: id }))
			})

			if (message) {
				await prisma.bookingMessage.create({
					data: {
						userId,
						bookingId: booking.id,
						content: message
					}
				})
			}

			sendPetSitterSelectedEmail(booking.id, operator.account?.email, 'fr')
			pubsub.publish(CREATED_BOOKING, { booking })
			return { booking }
		} catch (err) {
			console.error(err)
			return UnableToProcessError
		}
	}
})

// export const ChangeBookingInput = inputObjectType({
// 	name: 'ChangeBookingInput',
// 	definition(t) {
// 		t.id('id')
// 		t.id('ownerId')
// 		t.id('sitterId')
// 		t.string('startDate')
// 		t.string('endDate')
// 		t.string('service')
// 		t.field('sitterOk', { type: 'BookingConfirmationInput' })
// 		t.field('ownerOk', { type: 'BookingConfirmationInput' })
// 		t.boolean('canceled')
// 		t.field('cancellationDetails', { type: 'BookingCancellationDetailsInput' })
// 		t.list.string('animalsIds')
// 		t.list.field('selectedOptions', { type: 'BookingOptionInput' })
// 	},
// })

export const ConfirmBookingResult = unionType({
	name: 'ConfirmBookingResult',
	definition(t) {
		t.members(
			'Booking',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const confirmBooking = mutationField('confirmBooking', {
	type: 'ConfirmBookingResult',
	args: {
		id: nonNull(idArg()),
		source: nonNull(stringArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id, source }, { pubsub }) {
		try {
			const booking = await prisma.booking.update({
				where: { id },
				data: {
					...(source === 'OWNER' && { ownerConfirmationDate: new Date() }),
					...(source === 'OPERATOR' && { operatorConfirmationDate: new Date() })
				},
				include: {
					user: {
						select: {
							account: { select: { email: true } }
						}
					}
				}
			})

			if (!booking) return NotFoundError

			if (source === 'SITTER') {
				sendOwnerPetSitterAcceptedBookingEmail(booking.id, booking.user.account.email, 'fr')
			}
			pubsub.publish(UPDATED_BOOKING, { booking })
			return booking
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})

export const CancelBookingResult = unionType({
	name: 'CancelBookingResult',
	definition(t) {
		t.members(
			'Booking',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const cancelBooking = mutationField('cancelBooking', {
	type: 'CancelBookingResult',
	args: {
		id: nonNull(idArg()),
		source: nonNull(stringArg()),
		canceledReason: stringArg()
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'source']),
	async resolve(_, { id, source, canceledReason }, ctx) {
		try {
			const booking = await prisma.booking.update({
				where: { id },
				data: {
					canceled: true,
					canceledBy: source === 'OWNER' ? 'OWNER' : 'OPERATOR',
					canceledReason
				},
				include: {
					user: {
						select: { account: { select: { email: true } } }
					},
					operator: {
						select: { account: { select: { email: true } } }
					}
				}
			})

			if (!booking) return NotFoundError

			if (source === 'SITTER') {
				sendOwnerPetSitterRejectedBookingEmail(booking.user.account.email, 'fr')
			} else if (source === 'OWNER') {
				sendPetSitterBookingCanceledEmail(booking.operator.account.email, 'fr')
			}
			ctx.pubsub.publish(UPDATED_BOOKING, { booking })
			return booking
		} catch (error) {
			console.error(error)
			return UnableToProcessError
		}
	}
})

export const CancelOnGoingBookingResult = unionType({
	name: 'CancelOnGoingBookingResult',
	definition(t) {
		t.members(
			'Booking',
			'UserAuthenticationError',
			'InvalidArgumentsError',
			'NotFoundError',
			'UnableToProcessError'
		)
	}
})

export const cancelOnGoingBooking = mutationField('cancelOnGoingBooking', {
	type: 'CancelOnGoingBookingResult',
	args: {
		id: nonNull(idArg()),
		source: nonNull(stringArg()),
		canceledReason: stringArg()
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id', 'source', 'canceledReason']),
	async resolve(_, { id, source, canceledReason }, ctx) {
		try {
			const booking = await prisma.booking.update({
				where: { id },
				data: {
					canceled: true,
					canceledBy: source === 'OWNER' ? 'OWNER' : 'OPERATOR',
					canceledReason,
					underReview: true,
					stripePayment: {
						update: { status: PAYMENT_STATUS.AUTHORIZED_BUT_CANCELLED }
					}
				}
			})
			ctx.pubsub.publish(UPDATED_BOOKING, { booking })
			return booking
		} catch (error) {
			console.error(error)
			return { errors: [{ key: 'booking', message: "Couldn't cancel the booking" }] }
		}
	}
})

export const AuthorizedPayment = objectType({
	name: 'AuthorizedPayment',
	isTypeOf: (data) => Boolean((data as any).clientSecret),
	definition(t) {
		t.string('clientSecret')
		t.boolean('hadRef')
		t.string('stripeTargetApi')
	}
})

export const OperatorCannotProcessPaymentsError = objectType({
	name: 'OperatorCannotProcessPaymentsError',
	isTypeOf: (data) => Boolean((data as any).operatorCannotProcessPaymentsError),
	definition(t) {
		t.string('operatorCannotProcessPaymentsError')
	}
})
export const InvalidOperatorError = objectType({
	name: 'InvalidOperatorError',
	isTypeOf: (data) => Boolean((data as any).invalidOperatorError),
	definition(t) {
		t.string('invalidOperatorError')
	}
})

export const AuthorizePaymentResult = unionType({
	name: 'AuthorizePaymentResult',
	definition(t) {
		t.members(
			'AuthorizedPayment',
			'UserAuthenticationError',
			'NotFoundError',
			'UnableToProcessError',
			'OperatorCannotProcessPaymentsError',
			'InvalidOperatorError'
		)
	}
})

export const authorizePayment = mutationField('authorizePayment', {
	type: 'AuthorizePaymentResult',
	args: {
		id: nonNull(idArg())
	},
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['id']),
	async resolve(_, { id }, { user: { userId } }) {
		try {
			const booking = await prisma.booking.findFirst({
				where: { id, userId },
				include: {
					user: {
						select: {
							id: true,
							stripeCustomerId: true,
							account: { select: { email: true } }
						}
					},
					operator: {
						select: {
							id: true,
							stripeAccountId: true,
							partnerId: true,
							partnerPercentage: true
						}
					},
					stripePayment: true
				}
			})
			if (!booking || !booking.priceWithOutApplicationFee || !booking.applicationFeeAmount)
				return NotFoundError

			if (!booking.operator)
				return { invalidOperatorError: 'This booking operator does not exist anymore' }

			if (!booking.operator.stripeAccountId)
				return {
					operatorCannotProcessPaymentsError:
						'This booking operator cannot process payments'
				}

			const dayIn4days = addDays(new Date(), 4)
			const shouldUseSetupIntentApi = isAfter(new Date(booking.endDate), dayIn4days)

			if (shouldUseSetupIntentApi) {
				// Verify if the booking already has a setupIntentClientSecret
				if (booking.stripePayment?.setupIntentClientSecret) {
					return {
						clientSecret: booking.stripePayment.setupIntentClientSecret,
						stripeTargetApi: STRIPE_TARGET_APIS.SETUP_INTENT,
						hadRef: true
					}
				} else {
					// Verify if the user already has a stripeCustomerId or not
					let customerId
					if (booking.user?.stripeCustomerId) {
						customerId = booking.user.stripeCustomerId
					} else {
						const customer = await stripe.customers.create()
						customerId = customer.id
						await prisma.user.update({
							where: { id: userId },
							data: { stripeCustomerId: customer.id }
						})
					}

					const setupIntent = await stripe.setupIntents.create({
						customer: customerId,
						usage: 'off_session',
						payment_method_types: ['card']
					})

					const captureDate = addDays(new Date(booking.endDate), 2)

					await prisma.stripePayment.create({
						data: {
							bookingId: booking.id,
							setupIntentClientSecret: setupIntent.client_secret,
							setupIntentId: setupIntent.id,
							setupIntentCreationDate: new Date(),
							status: PAYMENT_STATUS.SETUP_INTENT_PENDING_CONFIRMATION,
							expectedPaymentIntentCaptureDate: captureDate
						}
					})

					return {
						clientSecret: setupIntent.client_secret,
						stripeTargetApi: STRIPE_TARGET_APIS.SETUP_INTENT,
						hadRef: false
					}
				}
			} else {
				if (booking.stripePayment?.paymentIntentClientSecret) {
					return {
						clientSecret: booking.stripePayment.paymentIntentClientSecret,
						stripeTargetApi: STRIPE_TARGET_APIS.PAYMENT_INTENT,
						hadRef: true
					}
				} else {
					// Add the donated percentage to the application fee amount to be
					// later donated
					let applicationFeeAmount: number

					const sitterHasValidPartnerShip =
						booking.operator?.partnerId &&
						booking.operator?.partnerPercentage &&
						booking.operator?.partnerPercentage > 0

					if (sitterHasValidPartnerShip) {
						applicationFeeAmount =
							booking.applicationFeeAmount +
							getValueFromPercentage(
								booking.operator.partnerPercentage as number,
								booking.priceWithOutApplicationFee
							)
					} else {
						applicationFeeAmount = booking.applicationFeeAmount
					}

					// Fees amounts in cents
					const applicationFeeAmountInCents = priceInCents(applicationFeeAmount)
					const bookingPriceWithApplicationFeeInCents = priceInCents(
						booking.priceWithOutApplicationFee + applicationFeeAmount
					)

					const paymentIntent = await stripe.paymentIntents.create({
						payment_method_types: ['card'],
						amount: bookingPriceWithApplicationFeeInCents,
						application_fee_amount: applicationFeeAmountInCents,
						currency: 'eur',
						capture_method: 'manual',
						receipt_email: booking.user.account?.email,
						on_behalf_of: booking.operator.stripeAccountId,
						transfer_data: {
							destination: booking.operator.stripeAccountId
						}
					})

					await prisma.stripePayment.create({
						data: {
							bookingId: booking.id,
							paymentIntentClientSecret: paymentIntent.client_secret,
							paymentIntentId: paymentIntent.id,
							status: PAYMENT_STATUS.PENDING_AUTHORIZATION,
							expectedPaymentIntentCreationDate: new Date(),
							expectedPaymentIntentCaptureDate: addDays(new Date(booking.endDate), 2)
						}
					})

					return {
						clientSecret: paymentIntent.client_secret,
						stripeTargetApi: STRIPE_TARGET_APIS.PAYMENT_INTENT,
						hadRef: false
					}
				}
			}
		} catch (err) {
			console.error(err)
			return UnableToProcessError
		}
	}
})

// export const updateBookingPaymentStatus = mutationField('updateBookingPaymentStatus', {
// 	type: 'BooleanResponse',
// 	args: {
// 		bookingId: nonNull(idArg()),
// 		paymentMethodId: stringArg(),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['bookingId']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const booking = await BookingModel.findOne({
// 				_id: args.bookingId,
// 				ownerId: ctx.user.profileId,
// 			})

// 			if (!booking)
// 				return {
// 					errors: [{ key: 'booking', message: 'No booking found' }],
// 				}

// 			// Case of booking directly using the paymentIntentApi
// 			if (booking.paymentIntentId && !args.paymentMethodId) {
// 				const stripePaymentIntent = await stripe.paymentIntents.retrieve(
// 					booking.paymentIntentId,
// 				)

// 				if (!stripePaymentIntent)
// 					return {
// 						errors: [
// 							{
// 								key: 'providerError',
// 								message: 'The provider could not find the payment intent',
// 							},
// 						],
// 					}

// 				if (stripePaymentIntent.status === 'requires_capture') {
// 					const updatedBooking = await BookingModel.findByIdAndUpdate(
// 						{
// 							_id: args.bookingId,
// 						},
// 						{
// 							paymentAuthorized: true,
// 							paymentStatus: PAYMENT_STATUS.AUTHORIZED_REQUIRE_CAPTURE,
// 							updatedAt: Date.now(),
// 						},
// 						{ new: true },
// 					)

// 					const sitter = await ProfileModel.findById(booking.sitterId)
// 					const sitterHasValidPartnerShip =
// 						sitter?.partnerId &&
// 						sitter?.partnerPercentage &&
// 						sitter?.partnerPercentage > 0

// 					if (sitter && sitterHasValidPartnerShip) {
// 						await new DonationModel({
// 							bookingId: booking._id,
// 							sitterId: sitter._id,
// 							partnerId: sitter.partnerId,
// 							partnerPercentageAtDonationCreation: sitter.partnerPercentage,
// 							amountToDonate: getValueFromPercentage(
// 								sitter.partnerPercentage,
// 								booking.priceWithoutApplicationFee,
// 							),
// 						}).save()
// 					}
// 					const sitterAccount = await UserModel.findById(sitter?.userId)
// 					sendSitterPaymentAuthorizedEmail(updatedBooking!.id, sitterAccount?.email, 'fr')
// 					sendOwnerPaymentAuthorizedEmail(
// 						updatedBooking!.id,
// 						updatedBooking!.ownerEmail,
// 						'fr',
// 					)
// 					ctx.pubsub.publish(UPDATED_BOOKING, { updatedBooking })
// 				}
// 			} else if (booking.setupIntentId && !booking.paymentIntentId && args.paymentMethodId) {
// 				const updatedBooking = await BookingModel.findByIdAndUpdate(
// 					{
// 						_id: args.bookingId,
// 					},
// 					{
// 						paymentAuthorized: true,
// 						paymentMethodId: args.paymentMethodId,
// 						paymentStatus:
// 							PAYMENT_STATUS.SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION,
// 						updatedAt: Date.now(),
// 					},
// 					{ new: true },
// 				)
// 				sendOwnerPaymentMethodSavedEmail(
// 					updatedBooking!.id,
// 					updatedBooking!.ownerEmail,
// 					'fr',
// 				)
// 				ctx.pubsub.publish(UPDATED_BOOKING, { updatedBooking })
// 			}

// 			return { success: true }
// 		} catch (error) {
// 			console.log(error)
// 			return notFound()
// 		}
// 	},
// })
