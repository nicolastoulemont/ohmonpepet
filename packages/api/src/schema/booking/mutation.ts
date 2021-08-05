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
	UnableToProcessError
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

// export const confirmBooking = mutationField('confirmBooking', {
// 	type: 'BookingResponse',
// 	args: {
// 		id: nonNull(idArg()),
// 		source: nonNull(stringArg()),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['id']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const { id, source } = args
// 			let update: any = {
// 				updatedAt: Date.now(),
// 			}
// 			if (source === 'OWNER') {
// 				update = {
// 					...update,
// 					ownerOk: { confirm: true, updatedAt: Date.now() },
// 				}
// 			} else if (source === 'SITTER') {
// 				update = {
// 					...update,
// 					sitterOk: { confirm: true, updatedAt: Date.now() },
// 				}
// 			}
// 			const booking = await BookingModel.findOneAndUpdate(
// 				{
// 					_id: id,
// 					$or: [{ ownerId: ctx.user.profileId }, { sitterId: ctx.user.profileId }],
// 				},
// 				update,
// 				{
// 					new: true,
// 				},
// 			)
// 			if (source === 'SITTER') {
// 				sendOwnerPetSitterAcceptedBookingEmail(booking!.id, booking!.ownerEmail, 'fr')
// 			}
// 			ctx.pubsub.publish(UPDATED_BOOKING, { booking })
// 			return { booking }
// 		} catch (error) {
// 			console.error(error)
// 			return { errors: [{ key: 'booking', message: "Couldn't confirm the booking" }] }
// 		}
// 	},
// })

// export const cancelBooking = mutationField('cancelBooking', {
// 	type: 'BookingResponse',
// 	args: {
// 		id: nonNull(idArg()),
// 		source: nonNull(stringArg()),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['id', 'source']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const { id, source } = args
// 			let update: any = {
// 				canceled: true,
// 				cancellationDetails: {
// 					cancelledBy: source as string,
// 					updatedAt: Date.now(),
// 				},
// 				updatedAt: Date.now(),
// 				lastUpdatedBy: ctx.user.profileId,
// 			}
// 			const booking = await BookingModel.findOneAndUpdate(
// 				{
// 					_id: id,
// 					$or: [{ ownerId: ctx.user.profileId }, { sitterId: ctx.user.profileId }],
// 				},
// 				update,
// 				{
// 					new: true,
// 				},
// 			)
// 			if (source === 'SITTER') {
// 				sendOwnerPetSitterRejectedBookingEmail(booking!.ownerEmail, 'fr')
// 			} else if (source === 'OWNER') {
// 				const sitter = await ProfileModel.findById(booking?.sitterId)
// 				const sitterAccount = await UserModel.findById(sitter?.userId)
// 				sendPetSitterBookingCanceledEmail(sitterAccount?.email, 'fr')
// 			}
// 			ctx.pubsub.publish(UPDATED_BOOKING, { booking })
// 			return { booking }
// 		} catch (error) {
// 			console.error(error)
// 			return { errors: [{ key: 'booking', message: "Couldn't cancel the booking" }] }
// 		}
// 	},
// })

// export const cancelOnGoingBooking = mutationField('cancelOnGoingBooking', {
// 	type: 'BookingResponse',
// 	args: {
// 		id: nonNull(idArg()),
// 		source: nonNull(stringArg()),
// 		reason: nonNull(stringArg()),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['id', 'source', 'reason']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const { id, source, reason } = args
// 			let update: any = {
// 				canceled: true,
// 				cancellationDetails: {
// 					cancelledBy: source as string,
// 					updatedAt: Date.now(),
// 				},
// 				cancellationReason: reason,
// 				updatedAt: Date.now(),
// 				underReview: true,
// 				lastUpdatedBy: ctx.user.profileId,
// 				paymentStatus: PAYMENT_STATUS.AUTHORIZED_BUT_CANCELLED,
// 			}

// 			const booking = await BookingModel.findOneAndUpdate(
// 				{
// 					_id: id,
// 					$or: [{ ownerId: ctx.user.profileId }, { sitterId: ctx.user.profileId }],
// 				},
// 				update,
// 				{
// 					new: true,
// 				},
// 			)
// 			ctx.pubsub.publish(UPDATED_BOOKING, { booking })
// 			return { booking }
// 		} catch (error) {
// 			console.error(error)
// 			return { errors: [{ key: 'booking', message: "Couldn't cancel the booking" }] }
// 		}
// 	},
// })

// export const changeBooking = mutationField('changeBooking', {
// 	type: 'BookingResponse',
// 	args: {
// 		id: nonNull(idArg()),
// 		input: nonNull(
// 			arg({
// 				type: ChangeBookingInput,
// 			}),
// 		),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['id']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const { id, input } = args
// 			if (!input.startDate && !input.endDate && !input.service && !input.selectedOptions) {
// 				const update: any = {
// 					...input,
// 					lastUpdatedBy: ctx.user.profileId,
// 					updatedAt: Date.now(),
// 				}

// 				const booking = await BookingModel.findByIdAndUpdate({ _id: id }, update, {
// 					new: true,
// 				})
// 				ctx.pubsub.publish(UPDATED_BOOKING, { booking })
// 				return { booking }
// 			} else {
// 				const booking = await BookingModel.findById(id).lean()
// 				if (!booking) return notFound()

// 				const {
// 					priceWithoutApplicationFee,
// 					priceWithApplicationFee,
// 					applicationFeeAmount,
// 				} = await useBookingPrice({
// 					sitterId: booking.sitterId,
// 					service: input.service ? input.service : booking.service,
// 					startDate: input.startDate ? input.startDate : booking.startDate,
// 					endDate: input.endDate ? input.endDate : booking.endDate,
// 					selectedOptions: input.selectedOptions
// 						? input.selectedOptions
// 						: booking.selectedOptions,
// 				})

// 				const update: any = {
// 					...input,
// 					priceWithoutApplicationFee,
// 					priceWithApplicationFee,
// 					applicationFeeAmount,
// 					lastUpdatedBy: ctx.user.profileId,
// 					updatedAt: Date.now(),
// 				}

// 				const updatedBooking = await BookingModel.findByIdAndUpdate({ _id: id }, update, {
// 					new: true,
// 				})
// 				ctx.pubsub.publish(UPDATED_BOOKING, { updatedBooking })
// 				return { booking: updatedBooking }
// 			}
// 		} catch (err) {
// 			return notFound()
// 		}
// 	},
// })

// export const deleteBooking = mutationField('deleteBooking', {
// 	type: 'BooleanResponse',
// 	args: {
// 		id: nonNull(idArg()),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['id']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			await BookingModel.findByIdAndDelete({ _id: args.id, ownerId: ctx.user.profileId })
// 			return { success: true }
// 		} catch (err) {
// 			return { success: false }
// 		}
// 	},
// })

// export const BookingAuthorizationResponse = objectType({
// 	name: 'BookingAuthorizationResponse',
// 	definition(t) {
// 		t.string('clientSecret')
// 		t.boolean('hadRef')
// 		t.string('stripeTargetApi')
// 		t.list.field('errors', { type: 'Error' })
// 	},
// })

// export const authorizePayment = mutationField('authorizePayment', {
// 	type: 'BookingAuthorizationResponse',
// 	args: {
// 		bookingId: nonNull(idArg()),
// 	},
// 	authorization: (ctx) => authorizeUser(ctx, 'user'),
// 	validate: (args) => checkFields(args, ['bookingId']),
// 	async resolve(_, args, ctx) {
// 		try {
// 			const booking = await BookingModel.findById(args.bookingId)
// 			if (
// 				!booking ||
// 				!booking.priceWithoutApplicationFee ||
// 				!booking.priceWithApplicationFee ||
// 				!booking.applicationFeeAmount
// 			)
// 				return notFound()

// 			if (booking.ownerId !== ctx.user.profileId)
// 				return { errors: [{ key: 'user', message: 'You cannot pay this booking' }] }

// 			const sitter = await ProfileModel.findById(booking.sitterId)
// 			if (!sitter)
// 				return {
// 					errors: [
// 						{ key: 'sitter', message: "The booking selected sitter doesn't exist" },
// 					],
// 				}
// 			if (!sitter.stripeAccountId)
// 				return {
// 					errors: [
// 						{
// 							key: 'sitter',
// 							message: 'The selected sitter cannot process payments at the moment',
// 						},
// 					],
// 				}

// 			const user = await UserModel.findById(ctx.user.id)
// 			if (!user) {
// 				return {
// 					errors: [
// 						{
// 							key: 'user',
// 							message: 'You cannot create a booking payment',
// 						},
// 					],
// 				}
// 			}

// 			const dayIn4days = addDays(new Date(), 4)
// 			const shouldUseSetupIntentApi = isAfter(new Date(booking.endDate), dayIn4days)

// 			if (shouldUseSetupIntentApi) {
// 				// Verify if the booking already has a setupIntentClientSecret
// 				if (booking.setupIntentClientSecret) {
// 					return {
// 						clientSecret: booking.setupIntentClientSecret,
// 						stripeTargetApi: STRIPE_TARGET_APIS.SETUP_INTENT,
// 						hadRef: true,
// 					}
// 				} else {
// 					// Verify if the user already has a stripeCustomerId or not
// 					const profile = await ProfileModel.findById(ctx.user.profileId).lean()
// 					let customerId
// 					if (profile?.stripeCustomerId) {
// 						customerId = profile.stripeCustomerId
// 					} else {
// 						const customer = await stripe.customers.create()
// 						customerId = customer.id
// 						await ProfileModel.findByIdAndUpdate(ctx.user.profileId, {
// 							stripeCustomerId: customer.id,
// 						})
// 					}
// 					const setupIntent = await stripe.setupIntents.create({
// 						customer: customerId,
// 						usage: 'off_session',
// 						payment_method_types: ['card'],
// 					})

// 					const captureDate = addDays(new Date(booking.endDate), 2)

// 					await BookingModel.findByIdAndUpdate(booking._id, {
// 						setupIntentClientSecret: setupIntent.client_secret,
// 						setupIntentId: setupIntent.id,
// 						paymentStatus: PAYMENT_STATUS.SETUP_INTENT_PENDING_CONFIRMATION,
// 						captureDate: captureDate,
// 						expectedPaymentIntentCreationDate: subDays(captureDate, 4),
// 						sitterStripeAccountId: sitter.stripeAccountId,
// 						ownerCustomerId: customerId,
// 					})

// 					return {
// 						clientSecret: setupIntent.client_secret,
// 						stripeTargetApi: STRIPE_TARGET_APIS.SETUP_INTENT,
// 						hadRef: false,
// 					}
// 				}
// 			} else {
// 				if (booking.paymentIntentClientSecret) {
// 					return {
// 						clientSecret: booking.paymentIntentClientSecret,
// 						stripeTargetApi: STRIPE_TARGET_APIS.PAYMENT_INTENT,
// 						hadRef: true,
// 					}
// 				} else {
// 					// Add the donated percentage to the application fee amount to be
// 					// later donated
// 					let applicationFeeAmount: number

// 					const sitterHasValidPartnerShip =
// 						sitter?.partnerId &&
// 						sitter?.partnerPercentage &&
// 						sitter?.partnerPercentage > 0

// 					if (sitterHasValidPartnerShip) {
// 						applicationFeeAmount =
// 							booking.applicationFeeAmount +
// 							getValueFromPercentage(
// 								sitter.partnerPercentage,
// 								booking.priceWithoutApplicationFee,
// 							)
// 					} else {
// 						applicationFeeAmount = booking.applicationFeeAmount
// 					}

// 					// Fees amounts in cents
// 					const applicationFeeAmountInCents = priceInCents(applicationFeeAmount)
// 					const bookingPriceWithApplicationFeeInCents = priceInCents(
// 						booking.priceWithApplicationFee,
// 					)

// 					const paymentIntent = await stripe.paymentIntents.create({
// 						payment_method_types: ['card'],
// 						amount: bookingPriceWithApplicationFeeInCents,
// 						application_fee_amount: applicationFeeAmountInCents,
// 						currency: 'eur',
// 						capture_method: 'manual',
// 						receipt_email: user?.email,
// 						on_behalf_of: sitter!.stripeAccountId,
// 						transfer_data: {
// 							destination: sitter!.stripeAccountId,
// 						},
// 					})

// 					await BookingModel.findByIdAndUpdate(booking._id, {
// 						paymentIntentClientSecret: paymentIntent.client_secret,
// 						paymentIntentId: paymentIntent.id,
// 						paymentStatus: PAYMENT_STATUS.PENDING_AUTHORIZATION,
// 						captureDate: addDays(new Date(booking.endDate), 2),
// 						expectedPaymentIntentCreationDate: new Date(),
// 						sitterStripeAccountId: sitter.stripeAccountId,
// 					})

// 					return {
// 						clientSecret: paymentIntent.client_secret,
// 						stripeTargetApi: STRIPE_TARGET_APIS.PAYMENT_INTENT,
// 						hadRef: false,
// 					}
// 				}
// 			}
// 		} catch (err) {
// 			console.log(err)
// 			return notFound()
// 		}
// 	},
// })

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
