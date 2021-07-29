import { ONE_DAY } from '../utils'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createTransporter, emailStyles } from './config'
import { ToOwnerPaymentAuthorized } from './layouts/ToOwnerPaymentAuthorized'
import { ToPetSitterPaymentAuthorized } from './layouts/ToPetSitterPaymentAuthorized'
import { ToPetSitterPaymentTransfered } from './layouts/ToPetSitterPaymentTransfered'
import { ToOwnerPaymentMethodSaved } from './layouts/ToOwnerPaymentMethodSaved'
import { ToOwnerPaymentTransfered } from './layouts/ToOwnerPaymentTransfered'
import { __prod__ } from '../constants'

// ToPetSitterWhenOwnerAuthorizedPayment
export async function sendSitterPaymentAuthorizedEmail(
	bookingId: string,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ destinationUrl: `/bookings/${bookingId}` },
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
							React.createElement(ToPetSitterPaymentAuthorized, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: "Le paiment d'une de vos réservation a été autorisé",
			en: 'The payment of one of your booking has been authorized'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${title.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

// ToPetSitterWhenFundsAreTransfered
export async function sendSitterPaymentTransferedEmail(
	bookingId: string,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ destinationUrl: `/bookings/${bookingId}` },
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
							React.createElement(ToPetSitterPaymentTransfered, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: "Le paiment d'une de vos réservation a été transféré",
			en: 'The payment of one of your booking has been transfered'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${title.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

// ToOwnerWhenSuccessfullyRegisteredCard
export async function sendOwnerPaymentMethodSavedEmail(
	bookingId: string,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ destinationUrl: `/bookings/${bookingId}` },
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
							React.createElement(ToOwnerPaymentMethodSaved, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Votre carte a été enregistrée',
			en: "You're card has been saved"
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${title.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

// ToOwnerWhenSuccessfullyAuthorizedPayment
export async function sendOwnerPaymentAuthorizedEmail(
	bookingId: string,
	email: any,
	lang: 'fr' | 'en' = 'fr'
) {
	const transporter = createTransporter()
	const loginAndRedirectToBookingToken = jwt.sign(
		{ destinationUrl: `/bookings/${bookingId}` },
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
							React.createElement(ToOwnerPaymentAuthorized, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Votre paiment a été autorisé',
			en: "You're paiment has been authorized"
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${title.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}

// ToOwnerWHenSuccesfullyTransferedFunds
export async function sendOwnerPaymentTransferedEmail(email: any, lang: 'fr' | 'en' = 'fr') {
	const transporter = createTransporter()

	const buttonHref = __prod__ ? `https://${process.env.DOMAIN_URL}` : `http://localhost:3000`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToOwnerPaymentTransfered, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Votre paiment a été transféré',
			en: "You're paiment has been transféré"
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${title.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}
