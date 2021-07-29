import { sendSitterPaymentAuthorizedEmail, sendOwnerPaymentAuthorizedEmail } from '../../emails'
import { stripe, getValueFromPercentage, priceInCents } from '../../utils'
import { PAYMENT_STATUS } from '../../schema/booking/constants'
import { SETUP_INTENT_CRON_DONE } from '../../constants'
import { differenceInSeconds } from 'date-fns'
import { pubsub } from '../../config'
import cron from 'node-cron'
import prisma from '../../lib/prisma'

// CREATE PAYMENT_INTENT FROM SETUP_INTENT
export const HOURLY_CONFIRMED_SETUP_INTENT = cron.schedule(
	// 5 6-23 * * *',
	'* * * * *',
	async () => {
		const start = new Date().toISOString()
		console.log(`Running HOURLY_CONFIRMED_SETUP_INTENT cron at ${start}`)

		const bookings = await prisma.booking.findMany({
			where: {
				underReview: false,
				stripePayment: {
					status: PAYMENT_STATUS.SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION,
					expectedPaymentIntentCreationDate: { lte: new Date() }
				}
			},
			include: {
				operator: {
					select: {
						id: true,
						partnerId: true,
						partnerPercentage: true,
						stripeAccountId: true
					},
					include: {
						account: {
							select: {
								email: true
							}
						}
					}
				},
				user: {
					select: {
						stripeCustomerId: true
					},
					include: {
						account: {
							select: {
								email: true
							}
						}
					}
				},
				stripePayment: {
					select: {
						paymentMethodId: true,
						status: true
					}
				}
			}
		})

		const numberOfItems = bookings.length
		console.log(
			`FOUND ${numberOfItems} ITEMS MATCHING CONFIRMED_SETUP_INTENT MATCHING CRITERIAS`
		)

		if (numberOfItems === 0) {
			console.log('NO MATCHING ITEMS FOUND FOR SETUP_INTENTS, STOPPING...')
			return
		}

		const successFullPaymentIntentCreationBookingsIds: Array<{
			bookingId: string
			paymentIntentId: string
			paymentIntentClientSecret: string | null
		}> = []
		const unSuccessFullPaymentIntentCreationBookingsIds: Array<{
			bookingId: string
			paymentIntentId?: string
			paymentIntentClientSecret?: string | null
			declineCode: 'insufficient_funds' | 'authentication_required' | string
		}> = []
		const createPaymentIntents = bookings.map(async (booking, index) => {
			try {
				// Add the donated percentage to the application fee amount to be
				// later donated
				let applicationFeeAmount: number

				if (!booking.operator.id) {
					console.log('/! COULD NOT FIND BOOKING SITTER: STOPPING')
					return
				}

				const operatorHasValidPartnerShip =
					booking.operator?.partnerId &&
					booking.operator?.partnerPercentage &&
					booking.operator?.partnerPercentage > 0

				if (operatorHasValidPartnerShip) {
					applicationFeeAmount =
						booking.applicationFeeAmount +
						getValueFromPercentage(
							booking.operator.partnerPercentage as number,
							booking.priceWithOutApplicationFee
						)
				} else {
					applicationFeeAmount = booking.applicationFeeAmount
				}

				const create = await stripe.paymentIntents.create({
					amount: priceInCents(
						Number(booking.priceWithOutApplicationFee + applicationFeeAmount)
					),
					application_fee_amount: priceInCents(applicationFeeAmount),
					payment_method_types: ['card'],
					currency: 'eur',
					capture_method: 'manual',
					receipt_email: booking.user.account.email,
					on_behalf_of: booking.operator.stripeAccountId as string,
					customer: booking.user.stripeCustomerId as string,
					payment_method: booking.stripePayment?.paymentMethodId as string,
					confirm: true,
					off_session: true,
					transfer_data: {
						destination: booking.operator.stripeAccountId as string
					}
				})
				// SuccessFull payment intent creation
				if (create.status === 'requires_capture') {
					successFullPaymentIntentCreationBookingsIds.push({
						bookingId: booking.id,
						paymentIntentId: create.id,
						paymentIntentClientSecret: create.client_secret
					})
					console.log(
						`SUCCESSUFULLY CREATED PAYMENT INTENT ${index + 1}/${numberOfItems}`
					)
					// If payment intent creation is successfull and the operator has a valid partnership we create the donation object to track the donation
					if (operatorHasValidPartnerShip) {
						await prisma.donation.create({
							data: {
								operatorId: booking.operator.id,
								bookingId: booking.id,
								partnerId: booking.operator.partnerId as string,
								partnerPercentageAtDonationCreation: booking.operator
									.partnerPercentage as number,
								amountToDonate: getValueFromPercentage(
									booking.operator.partnerPercentage as number,
									booking.priceWithOutApplicationFee
								)
							}
						})
					}

					sendSitterPaymentAuthorizedEmail(
						booking.id,
						booking.operator.account.email,
						'fr'
					)
					sendOwnerPaymentAuthorizedEmail(booking.id, booking.user.account.email, 'fr')
				}
			} catch (error) {
				console.error(error.raw)
				console.log(
					`ERROR CREATING PAYMENT : \n ${JSON.stringify({
						id: booking.id,
						paymentStatus: booking.stripePayment?.status
					})}`
				)
				console.log(
					`STRIPE ERROR DECLINE_CODE : \n ${JSON.stringify(error.raw.decline_code)}`
				)
				if (!error.raw.decline_code) {
					unSuccessFullPaymentIntentCreationBookingsIds.push({
						bookingId: booking.id,
						declineCode: JSON.stringify(error.raw)
					})
				} else {
					const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
						error.raw.payment_intent.id
					)
					unSuccessFullPaymentIntentCreationBookingsIds.push({
						bookingId: booking.id,
						paymentIntentId: paymentIntentRetrieved.id,
						paymentIntentClientSecret: paymentIntentRetrieved.client_secret,
						declineCode: error.raw.decline_code as
							| 'insufficient_funds'
							| 'authentication_required'
					})
				}
			}
		})

		await Promise.all(createPaymentIntents)
		console.log(
			`PAYMENT CREATION ATTEMPS DONE: \n
			${successFullPaymentIntentCreationBookingsIds.length} SUCCESSFULL \n
			${unSuccessFullPaymentIntentCreationBookingsIds.length} UNSUCCESSFULL \n
			NOW UPDATING booking COLLECTION`
		)
		if (successFullPaymentIntentCreationBookingsIds.length > 0) {
			const updateSuccessFullbookings = successFullPaymentIntentCreationBookingsIds.map(
				async (successFullBooking, index) => {
					try {
						await prisma.booking.update({
							where: { id: successFullBooking.bookingId },
							data: {
								stripePayment: {
									update: {
										status: PAYMENT_STATUS.AUTHORIZED_REQUIRE_CAPTURE,
										paymentIntentId: successFullBooking.paymentIntentId,
										paymentIntentClientSecret:
											successFullBooking.paymentIntentClientSecret
									}
								}
							}
						})

						console.log(
							`SUCCESSFULLY UPDATED SUCCESSFULL booking ${index + 1}/${
								successFullPaymentIntentCreationBookingsIds.length
							}`
						)
					} catch (error) {
						console.log(
							`ERROR UPDATING SUCCESSFULL PAYMENTSREF : \n ${JSON.stringify(
								successFullBooking
							)}`
						)
						console.error(error)
					}
				}
			)
			await Promise.all(updateSuccessFullbookings)
		}
		if (unSuccessFullPaymentIntentCreationBookingsIds.length > 0) {
			const updateUnSuccessFullPaymentRefs =
				unSuccessFullPaymentIntentCreationBookingsIds.map(
					async (unSuccessFullBooking, index) => {
						try {
							const paymentStatus =
								unSuccessFullBooking.declineCode === 'authentication_required'
									? PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED
									: unSuccessFullBooking.declineCode === 'insufficient_funds'
									? PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
									: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR

							await prisma.booking.update({
								where: { id: unSuccessFullBooking.bookingId },
								data: {
									stripePayment: {
										update: {
											status: paymentStatus,
											paymentIntentId: unSuccessFullBooking.paymentIntentId,
											paymentIntentClientSecret:
												unSuccessFullBooking.paymentIntentClientSecret,
											errorCode: unSuccessFullBooking.declineCode
										}
									}
								}
							})

							console.log(
								`SUCCESSFULLY UPDATED UNSUCCESSFULL PAYMENTREF ${index + 1}/${
									unSuccessFullPaymentIntentCreationBookingsIds.length
								}`
							)
						} catch (error) {
							console.log(
								`ERROR UPDATING SUCCESSFULL PAYMENTSREF : \n ${JSON.stringify(
									unSuccessFullBooking
								)}`
							)
							console.error(error)
						}
					}
				)
			await Promise.all(updateUnSuccessFullPaymentRefs)
		}

		const end = new Date().getTime()
		const diffInSec = differenceInSeconds(new Date(end), new Date(start))
		console.log(`HOURLY_CONFIRMED_SETUP_INTENT cron finished ${diffInSec} seconds`)
		pubsub.publish(SETUP_INTENT_CRON_DONE, { success: true })
	},
	{ scheduled: false }
)
