import { ONE_DAY } from '../utils'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ToOwnerPaymentFailedAuthorizationRequired } from './layouts/ToOwnerPaymentFailedAuthorizationRequired'
import { ToOwnerPaymentFailedInsufficientFunds } from './layouts/ToOwnerPaymentFailedInsufficientFunds'
import { ToOwnerPaymentFailedUnkownError } from './layouts/ToOwnerPaymentFailedUnkownError'
import { createTransporter, emailStyles } from './config'
import { __prod__ } from '../constants'

export const sendBookingAuthentificationRequiredEmail = async (
	userId: string,
	booking: any,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) => {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ id: userId, destinationUrl: `/bookings/${booking._id}` },
		process.env.TOKEN_SECRET as string,
		{
			expiresIn: ONE_DAY * 3
		}
	)

	const buttonHref = __prod__
		? `https://${process.env.DOMAIN_URL}/email-token-router?token=${loginAndRedirectToBookingToken}`
		: `http://localhost:3000/email-token-router?token=${loginAndRedirectToBookingToken}`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToOwnerPaymentFailedAuthorizationRequired, {
								lang,
								buttonHref,
								booking
							})
						)}
					</body>
			</html>
			`

	const authenticationRequired = {
		subject: {
			fr: 'Echec du paiement - Autorisation requise',
			en: 'Payment Failure - Authorization Required'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${authenticationRequired.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

export const sendBookingInsufficientFundsEmail = async (
	userId: string,
	booking: any,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) => {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ id: userId, destinationUrl: `/bookings/${booking._id}` },
		process.env.TOKEN_SECRET as string,
		{
			expiresIn: ONE_DAY * 3
		}
	)

	const buttonHref = __prod__
		? `https://${process.env.DOMAIN_URL}/email-token-router?token=${loginAndRedirectToBookingToken}`
		: `http://localhost:3000/email-token-router?token=${loginAndRedirectToBookingToken}`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToOwnerPaymentFailedInsufficientFunds, {
								lang,
								buttonHref,
								booking
							})
						)}
					</body>
			</html>
			`

	const insufficientFunds = {
		subject: {
			fr: 'Echec du paiement - Fonds insuffisants',
			en: 'Payment Failure - Insufficient Funds'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${insufficientFunds.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

export const sendBookingUnkownErrorEmail = async (
	userId: string,
	booking: any,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) => {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ id: userId, destinationUrl: `/bookings/${booking._id}` },
		process.env.TOKEN_SECRET as string,
		{
			expiresIn: ONE_DAY * 3
		}
	)

	const buttonHref = __prod__
		? `https://${process.env.DOMAIN_URL}/email-token-router?token=${loginAndRedirectToBookingToken}`
		: `http://localhost:3000/email-token-router?token=${loginAndRedirectToBookingToken}`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToOwnerPaymentFailedUnkownError, {
								lang,
								buttonHref,
								booking
							})
						)}
					</body>
			</html>
			`
	const unkownError = {
		subject: {
			fr: 'Echec du paiement',
			en: 'Payment Failure'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${unkownError.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}
