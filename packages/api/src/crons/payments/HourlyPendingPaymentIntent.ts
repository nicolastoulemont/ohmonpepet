import { sendSitterPaymentTransferedEmail, sendOwnerPaymentTransferedEmail } from '../../emails'
import { PAYMENT_STATUS } from '../../schema/booking/constants'
import { PENDING_PAYMENT_CRON_DONE } from '../../constants'
import { stripe, priceInCents, getValueFromPercentage } from '../../utils'
import { differenceInSeconds } from 'date-fns'
import { pubsub } from '../../config'
import prisma from '../../lib/prisma'
import cron from 'node-cron'

// CAPTURE PAYMENTS CRON
export const HOURLY_PENDING_PAYMENT_INTENTS = cron.schedule(
	// '1 6-23 * * *',
	'* * * * *',
	async () => {
		const start = new Date().getTime()
		console.log(`Running HOURLY_PENDING_PAYMENTS cron at ${new Date().toISOString()}`)

		const bookings = await prisma.booking.findMany({
			where: {
				underReview: false,
				stripePayment: {
					status: PAYMENT_STATUS.AUTHORIZED_REQUIRE_CAPTURE,
					expectedPaymentIntentCaptureDate: { lte: new Date() }
				}
			},
			include: {
				operator: {
					select: {
						id: true,
						partnerId: true,
						partnerPercentage: true
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
						paymentIntentId: true
					}
				}
			}
		})

		const numberOfItems = bookings.length
		console.log(`FOUND ${numberOfItems} ITEMS MATCHING PENDING_PAYMENTS MATCHING CRITERIAS`)

		if (numberOfItems === 0) {
			console.log('NO MATCHING ITEMS FOUND FOR PENDING_PAYMENTS, STOPPING...')
			return
		}

		const successFullPaymentCaptureBookingsIds: Array<string> = []
		const unSuccessFullPaymentCaptureBookingsIds: Array<string> = []
		const capturePayments = bookings.map(async (booking, index) => {
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

				const capture = await stripe.paymentIntents.capture(
					booking.stripePayment?.paymentIntentId as string,
					{
						amount_to_capture: priceInCents(
							Number(booking.priceWithOutApplicationFee + applicationFeeAmount)
						)
					}
				)
				if (capture.status === 'succeeded') {
					successFullPaymentCaptureBookingsIds.push(booking.id)
					console.log(
						`SUCCESSUFULLY CAPTURED PAYMENT INTENT ${index + 1}/${numberOfItems}`
					)

					sendOwnerPaymentTransferedEmail(booking.user.account.email, 'fr')
					sendSitterPaymentTransferedEmail(booking.operator.account.email, 'fr')
				} else {
					console.log(JSON.stringify(capture))
					unSuccessFullPaymentCaptureBookingsIds.push(booking.id)
				}
			} catch (error) {
				console.log(`ERROR CAPTURING PAYMENT : \n ${JSON.stringify(booking)}`)
				console.log(`STRIPE ERROR : \n ${JSON.stringify(error)}`)
				unSuccessFullPaymentCaptureBookingsIds.push(booking.id)
			}
		})

		await Promise.all(capturePayments)
		if (successFullPaymentCaptureBookingsIds.length > 0) {
			try {
				await prisma.booking.updateMany({
					where: { id: { in: successFullPaymentCaptureBookingsIds } },
					data: {
						paid: true
					}
				})

				await prisma.stripePayment.updateMany({
					where: { bookingId: { in: successFullPaymentCaptureBookingsIds } },
					data: {
						status: PAYMENT_STATUS.CAPTURED_AND_PAID
					}
				})
			} catch (error) {
				console.log(
					`ERROR UPDATING SUCCESSFULL PAYMENTSREF : \n ${JSON.stringify(
						successFullPaymentCaptureBookingsIds
					)}`
				)
				console.error(error)
			}
		}
		if (unSuccessFullPaymentCaptureBookingsIds.length > 0) {
			try {
				await prisma.stripePayment.updateMany({
					where: { bookingId: { in: unSuccessFullPaymentCaptureBookingsIds } },
					data: {
						status: PAYMENT_STATUS.FAILED_CAPTURE
					}
				})
			} catch (error) {
				console.log(
					`ERROR UPDATING UNSUCCESSFULL PAYMENTSREF : \n ${JSON.stringify(
						unSuccessFullPaymentCaptureBookingsIds
					)}`
				)
				console.error(error)
			}
		}

		const end = new Date().getTime()
		const diffInSec = differenceInSeconds(new Date(end), new Date(start))
		console.log(`HOUR_PENDING_PAYMENTS cron finished ${diffInSec} seconds`)
		pubsub.publish(PENDING_PAYMENT_CRON_DONE, { success: true })
	},
	{ scheduled: false }
)
