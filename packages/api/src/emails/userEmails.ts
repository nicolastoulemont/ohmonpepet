import { ONE_HOUR, ONE_DAY } from '../utils'
import jwt from 'jsonwebtoken'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { VerificationEmail } from '../emails/layouts/VerificationEmail'
import { ForgotPassword } from '../emails/layouts/ForgotPassword'
import { createTransporter, emailStyles } from './config'
import { __prod__ } from '../constants'

export const sendVerificationEmail = async (
	user: any,
	lang: 'fr' | 'en' = 'fr',
	originUrl?: string | undefined | null
) => {
	const transporter = createTransporter()

	const payload = originUrl ? { id: user.id, originUrl } : { id: user.id }

	const emailToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
		expiresIn: ONE_DAY
	})

	const verificationUrl = __prod__
		? `https://${process.env.DOMAIN_URL}/email-verification?token=${emailToken}`
		: `http://localhost:3000/email-verification?token=${emailToken}`

	const emailHTML = `
		<!DOCTYPE html>
		<html>
			${emailStyles}
				<body>
					${ReactDOMServer.renderToStaticMarkup(
						React.createElement(VerificationEmail, {
							lang,
							buttonHref: verificationUrl
						})
					)}
				</body>
		</html>
		`

	const verification = {
		subject: {
			fr: 'Vérification de votre email',
			en: 'Email verification'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: user.email,
			subject: `Ohmonpepet - ${verification.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error)
	}
}

export const sendForgotPwdEmail = async (user: any, email: any, lang: 'fr' | 'en' = 'fr') => {
	const transporter = createTransporter()
	const resetPwdToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET as string, {
		expiresIn: ONE_HOUR
	})

	const resetUrl = __prod__
		? `https://${process.env.DOMAIN_URL}/reset-password?token=${resetPwdToken}`
		: `http://localhost:3000/reset-password?token=${resetPwdToken}`

	const emailHTML = `
			<!DOCTYPE html>
			<html>
				${emailStyles}
					<body>
						${ReactDOMServer.renderToStaticMarkup(
							React.createElement(ForgotPassword, { lang, buttonHref: resetUrl })
						)}
					</body>
			</html>
			`

	const forgot = {
		subject: {
			fr: 'Réinitialisation de mot passe',
			en: 'Password reset'
		}
	}

	try {
		await transporter.sendMail({
			from: 'Ohmonpepet <contact@ohmonpepet.com>',
			to: email,
			subject: `Ohmonpepet - ${forgot.subject[lang]}`,
			html: emailHTML
		})
	} catch (error) {
		console.log(error.message)
	}
}
