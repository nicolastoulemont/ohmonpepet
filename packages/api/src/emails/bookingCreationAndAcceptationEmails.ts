import { ONE_DAY } from '../utils'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createTransporter, emailStyles } from './config'
import { ToPetSitterSelected } from './layouts/ToPetSitterSelected'
import { ToPetSitterBookingCanceled } from './layouts/ToPetSitterBookingCanceled'
import { ToOwnerPetSitterConfirmed } from './layouts/ToOwnerPetSitterConfirmed'
import { ToOwnerPetSitterRejected } from './layouts/ToOwnerPetSitterRejected'
import { __prod__ } from '../constants'

// ToPetSitterSelection
export async function sendPetSitterSelectedEmail(
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
							React.createElement(ToPetSitterSelected, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Vous avez été sélectionné - Confirmation de réservation requise',
			en: 'You have been selected - Booking confirmation needed'
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

// ToSitterCancelation
export async function sendPetSitterBookingCanceledEmail(email: any, lang: 'fr' | 'en' = 'fr') {
	const transporter = createTransporter()

	const buttonHref = __prod__ ? `https://${process.env.DOMAIN_URL}` : `http://localhost:3000`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToPetSitterBookingCanceled, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Une de vos réservations a été annulée',
			en: 'One of your booking has been canceled'
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

// ToOwnerForSitterConfirmation
export async function sendOwnerPetSitterAcceptedBookingEmail(
	bookingId: string,
	email: string,
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
							React.createElement(ToOwnerPetSitterConfirmed, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Votre petsitter a accepté votre demande',
			en: "You're petsitter has accepted your booking"
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

// ToOwnerForSitterRejection
export async function sendOwnerPetSitterRejectedBookingEmail(
	email: string,
	lang: 'fr' | 'en' = 'fr'
) {
	const transporter = createTransporter()

	const buttonHref = __prod__ ? `https://${process.env.DOMAIN_URL}` : `http://localhost:3000`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ToOwnerPetSitterRejected, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Votre petsitter a refusé votre réservation',
			en: "You're petsitter has rejected your booking"
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
