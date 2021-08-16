import { PAYMENT_STATUS } from '../../schema/booking/constants'
import { ERRORS_EMAIL_CRON_DONE } from '../../constants'
import { differenceInSeconds } from 'date-fns'
import cron from 'node-cron'
import prisma from '../../lib/prisma'
import { pubsub } from '../../config'
import {
	sendBookingAuthentificationRequiredEmail,
	sendBookingInsufficientFundsEmail,
	sendBookingUnkownErrorEmail
} from '../../emails'

export const HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL = cron.schedule(
	// '10 6-23 * * *',
	'* * * * *',
	async () => {
		const start = new Date().getTime()
		console.log(
			`Running HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL cron at ${new Date().toISOString()}`
		)

		const unsucessfullPaymentIntentCreation = await prisma.booking.findMany({
			where: {
				underReview: false,
				stripePayment: {
					expectedPaymentIntentCreationDate: { lte: new Date() },
					OR: [
						{
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED
						},
						{
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
						},
						{
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR
						}
					]
				}
			},
			include: {
				user: {
					select: {
						id: true,
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
						status: true
					}
				}
			}
		})

		const numberOfItems = unsucessfullPaymentIntentCreation.length
		console.log(
			`FOUND ${numberOfItems} ITEMS MATCHING UNSUCCESSFULL_PAYMENT_CREATION MATCHING CRITERIAS`
		)

		if (numberOfItems === 0) {
			console.log('NO MATCHING ITEMS FOUND FOR UNSUCCESSFULL_PAYMENT_CREATION, STOPPING...')
			return
		}

		const successFullEmailSendBookingsIds: Array<string> = []
		const unSuccessFullEmailSendBookingsIds: Array<string> = []
		const sendMails = unsucessfullPaymentIntentCreation.map(async (booking, index) => {
			try {
				if (
					booking.stripePayment?.status ===
					PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED
				) {
					await sendBookingAuthentificationRequiredEmail(
						booking.user.id,
						booking,
						booking.user.account.email
					)
				} else if (
					booking.stripePayment?.status ===
					PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
				) {
					await sendBookingInsufficientFundsEmail(
						booking.user.id,
						booking,
						booking.user.account.email
					)
				} else if (
					booking.stripePayment?.status ===
					PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR
				) {
					await sendBookingUnkownErrorEmail(
						booking.user.id,
						booking,
						booking.user.account.email
					)
				}

				successFullEmailSendBookingsIds.push(booking.id)
				console.log(`SUCCESSFULLY SENT EMAIL ${index + 1}/${numberOfItems}`)
			} catch (error) {
				console.log(`ERROR SENDING EMAIL : \n ${JSON.stringify(booking)}`)
				unSuccessFullEmailSendBookingsIds.push(booking.id)
			}
		})

		await Promise.all(sendMails)
		console.log(
			`EMAIL SENDING ATTEMPS DONE: \n 
			${successFullEmailSendBookingsIds.length} SUCCESSFULL \n 
			${unSuccessFullEmailSendBookingsIds.length} UNSUCCESSFULL \n 
			NOW UPDATING PAYMENTREF COLLECTION`
		)
		if (successFullEmailSendBookingsIds.length > 0) {
			const allSuccessFullySentBookingsEmails = unsucessfullPaymentIntentCreation.filter(
				(booking) => successFullEmailSendBookingsIds.includes(booking.id)
			)
			const authenticationRequiredSentEmailsIds = allSuccessFullySentBookingsEmails
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED
				)
				.map((booking) => booking.id)
			const insufficientFundsSentEmailsIds = allSuccessFullySentBookingsEmails
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
				)
				.map((booking) => booking.id)
			const unkownErrorSentEmailsIds = allSuccessFullySentBookingsEmails
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR
				)
				.map((booking) => booking.id)

			if (authenticationRequiredSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: authenticationRequiredSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED_MAIL_SENT
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING AUTHENTICATION REQUIRED SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							authenticationRequiredSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}

			if (insufficientFundsSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: insufficientFundsSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING INSUFFICIENT FUNDS SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							authenticationRequiredSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}

			if (unkownErrorSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: unkownErrorSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING UNKOWN ERROR SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							authenticationRequiredSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}
		}
		if (unSuccessFullEmailSendBookingsIds.length > 0) {
			const allUnsuccessFullySentBookingEmail = unsucessfullPaymentIntentCreation.filter(
				(booking) => unSuccessFullEmailSendBookingsIds.includes(booking.id)
			)
			const authenticationRequiredNotSentEmailsIds = allUnsuccessFullySentBookingEmail
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED
				)
				.map((booking) => booking.id)
			const insufficientFundsNotSentEmailsIds = allUnsuccessFullySentBookingEmail
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
				)
				.map((booking) => booking.id)
			const unkownErrorNotSentEmailsIds = allUnsuccessFullySentBookingEmail
				.filter(
					(booking) =>
						booking.stripePayment?.status ===
						PAYMENT_STATUS.FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR
				)
				.map((booking) => booking.id)

			if (authenticationRequiredNotSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: authenticationRequiredNotSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.ERROR_SENDING_AUTH_REQUIRED_MAIL
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING AUTHENTICATION REQUIRED NOT SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							authenticationRequiredNotSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}

			if (insufficientFundsNotSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: insufficientFundsNotSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING INSUFFICIENT FUNDS NOT SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							insufficientFundsNotSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}

			if (unkownErrorNotSentEmailsIds.length > 0) {
				try {
					await prisma.stripePayment.updateMany({
						where: { bookingId: { in: unkownErrorNotSentEmailsIds } },
						data: {
							status: PAYMENT_STATUS.ERROR_SENDING_UNKOWN_ERROR_MAIL
						}
					})
				} catch (error) {
					console.log(
						`ERROR UPDATING UNKOWN ERROR NOT SENT EMAILS PAYMENTREFS : \n ${JSON.stringify(
							unkownErrorNotSentEmailsIds
						)}`
					)
					console.error(error)
				}
			}
		}

		const end = new Date().getTime()
		const diffInSec = differenceInSeconds(new Date(end), new Date(start))
		console.log(
			`HOURLY_UNSUCCESSFULL_PAYMENT_CREATION_EMAIL cron finished ${diffInSec} seconds`
		)
		pubsub.publish(ERRORS_EMAIL_CRON_DONE, { success: true })
	},
	{ scheduled: false }
)
