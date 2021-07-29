import { ONE_DAY } from '../utils'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { __prod__ } from '../constants'
import { createTransporter, emailStyles } from './config'
import { HasNewMessage } from './layouts/HasNewMessage'

// New messages
export async function sendNewMessageEmail(bookingId: string, email: any, lang: 'fr' | 'en' = 'fr') {
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
							React.createElement(HasNewMessage, {
								lang,
								buttonHref
							})
						)}
					</body>
			</html>
			`

	const title = {
		subject: {
			fr: 'Vous avez un nouveau message',
			en: 'You have a new message'
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
