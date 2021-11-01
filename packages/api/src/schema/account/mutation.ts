import { inputObjectType, mutationField, nonNull, unionType, arg, stringArg } from 'nexus'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isAfter } from 'date-fns'
import prisma from '../../lib/prisma'
import { COOKIE_NAME } from '../../constants'
import { sendForgotPwdEmail, sendVerificationEmail } from '../../emails'
import {
	authorize,
	checkArgs,
	NotFoundError,
	PartialInvalidArgumentsError,
	UnableToProcessError,
	DecodedForgotPwdEmailToken,
	DecodedVerificationEmailToken
} from '../../utils'

export const EmailAndPasswordInput = inputObjectType({
	name: 'EmailAndPasswordInput',
	definition(t) {
		t.nonNull.email('email')
		t.nonNull.string('password')
	}
})

export const createAccountResult = unionType({
	name: 'CreateAccountResult',
	description: 'The result of the createAccount mutation',
	definition(t) {
		t.members('Account', 'InvalidArgumentsError', 'UnableToProcessError')
	}
})

export const CreateAccountInput = inputObjectType({
	name: 'CreateAccountInput',
	definition(t) {
		t.nonNull.email('email')
		t.nonNull.string('password')
		t.nonNull.string('firstName')
		t.string('originUrl')
	}
})

export const createAccount = mutationField('createAccount', {
	type: 'CreateAccountResult',
	args: {
		input: nonNull(arg({ type: 'CreateAccountInput' }))
	},
	validation: (args) => checkArgs(args, ['email:mail', 'password:pwd', 'firstName']),
	async resolve(_, { input: { password, email, firstName, originUrl } }) {
		const existingAccount = await prisma.account.findUnique({
			where: { email }
		})

		if (existingAccount) {
			return {
				...PartialInvalidArgumentsError,
				invalidArguments: [{ key: 'email', message: 'Email taken' }]
			}
		}

		const hash = await bcrypt.hash(password, 12)
		const account = await prisma.account.create({
			data: {
				password: hash,
				email
			}
		})
		if (!account) return UnableToProcessError

		await prisma.user.create({
			data: {
				accountId: account.id,
				firstName
			}
		})

		try {
			// await sendVerificationEmail(account, 'fr', originUrl)
			return account
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const createStaffAccountResult = unionType({
	name: 'CreateStaffAccountResult',
	description: 'The result of the createStaffAccount mutation',
	definition(t) {
		t.members('Account', 'InvalidArgumentsError', 'UnableToProcessError')
	}
})

export const CreateStaffAccountInput = inputObjectType({
	name: 'CreateStaffAccountInput',
	definition(t) {
		t.nonNull.email('email')
		t.nonNull.string('password')
		t.nonNull.string('phoneNumber')
	}
})

export const createStaffAccount = mutationField('createStaffAccount', {
	type: 'CreateStaffAccountResult',
	args: {
		input: nonNull(arg({ type: CreateStaffAccountInput }))
	},
	validation: (args) => checkArgs(args, ['email:mail', 'password:pwd', 'phoneNumber:ph']),
	async resolve(_, { input: { password, email, phoneNumber } }) {
		const existingAccount = await prisma.account.findUnique({
			where: { email }
		})

		if (existingAccount) {
			const validPassword = await bcrypt.compare(password, existingAccount.password)
			if (!validPassword) {
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'email', message: 'Email taken' }]
				}
			}

			await prisma.staff.create({
				data: {
					accountId: existingAccount.id,
					phoneNumber
				}
			})
			return existingAccount
		}

		const hash = await bcrypt.hash(password, 12)
		const account = await prisma.account.create({
			data: {
				password: hash,
				email
			}
		})
		if (!account) return UnableToProcessError

		await prisma.staff.create({
			data: {
				accountId: account.id,
				phoneNumber
			}
		})

		try {
			// await sendVerificationEmail(account, 'fr')
			return account
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const signInResult = unionType({
	name: 'SignInResult',
	description: 'The result of the signIn mutation',
	definition(t) {
		t.members('Account', 'InvalidArgumentsError', 'UnableToProcessError', 'NotFoundError')
	}
})

export const signIn = mutationField('signIn', {
	type: 'SignInResult',
	args: {
		input: nonNull(arg({ type: 'EmailAndPasswordInput' }))
	},
	validation: (args) => checkArgs(args, ['email:mail', 'password:pwd']),
	async resolve(_, { input: { email, password } }, ctx) {
		try {
			const account = await prisma.account.findUnique({
				where: { email },
				select: {
					id: true,
					email: true,
					password: true,
					user: {
						select: { id: true }
					},
					operator: {
						select: { id: true }
					},
					staff: {
						select: { id: true }
					}
				}
			})

			if (!account) return NotFoundError

			if (!account?.user?.id) return UnableToProcessError

			const validPassword = await bcrypt.compare(password, account.password)
			if (!validPassword)
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'password', message: 'Invalid password' }]
				}

			ctx.req.session.user = {
				accountId: account.id,
				...(account.user && { userId: account.user.id }),
				...(account.operator && { operatorId: account.operator.id }),
				...(account.staff && { staffId: account.staff.id }),
				access: Boolean(account.staff)
					? 'staff'
					: Boolean(account.operator)
					? 'operator'
					: 'user'
			}

			return account
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const signOutResult = unionType({
	name: 'SignOutResult',
	description: 'The result of the signOut mutation',
	definition(t) {
		t.members('BooleanResult', 'UserAuthenticationError', 'UnableToProcessError')
	}
})

export const signOut = mutationField('signOut', {
	type: 'SignOutResult',
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, __, ctx) {
		try {
			return new Promise((resolve) =>
				ctx.req.session.destroy((err) => {
					ctx.res.clearCookie(COOKIE_NAME)
					if (err) {
						console.log(err)
						resolve({ success: false })
						return
					}

					resolve({ success: true })
				})
			)
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const modifyEmailResult = unionType({
	name: 'ModifyEmailResult',
	description: 'The result of the modifyEmail mutation',
	definition(t) {
		t.members(
			'Account',
			'InvalidArgumentsError',
			'UnableToProcessError',
			'UserAuthenticationError',
			'NotFoundError'
		)
	}
})

export const modifyEmail = mutationField('modifyEmail', {
	type: 'ModifyEmailResult',
	args: {
		email: nonNull(stringArg())
	},
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['email:mail']),
	async resolve(_, { email }, { user }) {
		try {
			const existingAccount = await prisma.account.findUnique({ where: { email } })
			if (existingAccount)
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'email', message: 'Email already taken' }]
				}

			const updatedAccount = await prisma.account.update({
				where: { id: user.accountId },
				data: { email }
			})

			if (!updatedAccount) return NotFoundError

			return updatedAccount
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const modifyPasswordResult = unionType({
	name: 'ModifyPasswordResult',
	description: 'The result of the modifyPassword mutation',
	definition(t) {
		t.members(
			'Account',
			'NotFoundError',
			'InvalidArgumentsError',
			'UserAuthenticationError',
			'UnableToProcessError'
		)
	}
})

export const modifyPassword = mutationField('modifyPassword', {
	type: 'ModifyPasswordResult',
	args: {
		password: nonNull(stringArg()),
		newPassword: nonNull(stringArg())
	},
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	validation: (args) => checkArgs(args, ['password:pwd', 'newPassword:pwd']),
	async resolve(_, { password, newPassword }, { user }) {
		try {
			const account = await prisma.account.findUnique({
				where: { id: user.accountId }
			})
			if (!account) return NotFoundError

			const validPassword = await bcrypt.compare(password, account.password)
			if (!validPassword)
				return {
					...PartialInvalidArgumentsError,
					invalidArguments: [{ key: 'password', message: 'Invalid password' }]
				}

			const hash = await bcrypt.hash(newPassword, 12)
			const updatedAccount = await prisma.account.update({
				where: { id: user.accountId },
				data: { password: hash }
			})
			if (!updatedAccount) return UnableToProcessError

			return updatedAccount
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const deleteAccountResult = unionType({
	name: 'DeleteAccountResult',
	description: 'The result of the deleteAccount mutation',
	definition(t) {
		t.members(
			'BooleanResult',
			'UserAuthenticationError',
			'NotFoundError',
			'InvalidArgumentsError',
			'UnableToProcessError'
		)
	}
})

export const deleteAccount = mutationField('deleteAccount', {
	type: 'DeleteAccountResult',
	args: {
		confirmPassword: nonNull(stringArg())
	},
	description: 'Access restricted to logged in user',
	authorization: (ctx) => authorize(ctx, 'user'),
	async resolve(_, { confirmPassword }, { req, res, user }) {
		const account = await prisma.account.findUnique({
			where: { id: user.accountId }
		})
		if (!account || !account) return NotFoundError

		const validPassword = await bcrypt.compare(confirmPassword, account.password)
		if (!validPassword)
			return {
				...PartialInvalidArgumentsError,
				invalidArguments: [{ key: 'password', message: 'Invalid password' }]
			}

		try {
			await prisma.account.delete({ where: { id: user.accountId } })
		} catch (error) {
			return UnableToProcessError
		}

		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME)
				if (err) {
					console.error(err)
					resolve({ success: false })
					return
				}

				resolve({ success: true })
			})
		)
	}
})

export const lostPasswordResult = unionType({
	name: 'LostPasswordResult',
	description: 'The result of the lostPassword mutation',
	definition(t) {
		t.members('BooleanResult', 'NotFoundError')
	}
})

export const lostPassword = mutationField('lostPassword', {
	type: 'LostPasswordResult',
	args: {
		email: nonNull(stringArg())
	},
	validation: (args) => checkArgs(args, ['email:mail']),
	async resolve(_, { email }) {
		const account = await prisma.account.findUnique({
			where: { email },
			include: { user: true }
		})
		if (!account) return NotFoundError

		await sendForgotPwdEmail(account.user?.id, account.email, 'fr')
		return { success: true }
	}
})

export const resetPasswordResult = unionType({
	name: 'ResetPasswordResult',
	description: 'The result of the resetPassword mutation',
	definition(t) {
		t.members('BooleanResult', 'InvalidArgumentsError', 'UnableToProcessError')
	}
})

export const ResetPasswordInput = inputObjectType({
	name: 'ResetPasswordInput',
	definition(t) {
		t.nonNull.string('newPassword')
		t.nonNull.jwt('token')
	}
})

export const resetPassword = mutationField('resetPassword', {
	type: 'ResetPasswordResult',
	args: {
		input: nonNull(arg({ type: 'ResetPasswordInput' }))
	},
	validation: (args) => checkArgs(args, ['newPassword:pwd', 'token']),
	async resolve(_, { input }) {
		try {
			const token = jwt.verify(
				input.token,
				process.env.TOKEN_SECRET as string
			) as DecodedForgotPwdEmailToken
			const invalidTokenError = {
				...PartialInvalidArgumentsError,
				invalidArguments: [{ key: 'token', message: 'Invalid token' }]
			}

			if (!token) return invalidTokenError
			if (!token.exp) return invalidTokenError
			if (isAfter(new Date(token.exp), new Date())) return invalidTokenError
			if (!token.id) return invalidTokenError

			const hash = await bcrypt.hash(input.newPassword, 12)
			const updatedAccount = await prisma.account.update({
				where: { id: token.id },
				data: { password: hash }
			})

			if (!updatedAccount) return UnableToProcessError

			return { success: true }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const sendVerificationEmailResult = unionType({
	name: 'SendVerificationEmailResult',
	description: 'The result of the sendVerificationEmail mutation',
	definition(t) {
		t.members('BooleanResult', 'InvalidArgumentsError', 'NotFoundError', 'UnableToProcessError')
	}
})

export const sendVerificationEmailMutation = mutationField('sendVerificationEmail', {
	type: 'SendVerificationEmailResult',
	args: {
		email: nonNull(stringArg())
	},
	validation: (args) => checkArgs(args, ['email:mail']),
	async resolve(_, { email }) {
		const account = await prisma.account.findUnique({ where: { email } })

		if (!account) return NotFoundError

		try {
			await sendVerificationEmail(account)
			return { success: true }
		} catch (error) {
			return UnableToProcessError
		}
	}
})

export const verifyUserResult = unionType({
	name: 'VerifyUserResult',
	description: 'The result of the verifyUser mutation',
	definition(t) {
		t.members('BooleanResult', 'InvalidArgumentsError', 'NotFoundError', 'UnableToProcessError')
	}
})

export const verifyUserInput = inputObjectType({
	name: 'VerifyUserInput',
	definition(t) {
		t.nonNull.jwt('token')
	}
})

export const verifyUser = mutationField('verifyUser', {
	type: 'VerifyUserResult',
	args: {
		input: nonNull(arg({ type: verifyUserInput }))
	},
	validation: (args) => checkArgs(args, ['token']),
	async resolve(_, { input }) {
		const invalidTokenError = {
			...PartialInvalidArgumentsError,
			invalidArguments: [{ key: 'token', message: 'Invalid token' }]
		}

		try {
			const decodedToken = jwt.verify(
				input.token,
				process.env.TOKEN_SECRET as string
			) as DecodedVerificationEmailToken

			if (decodedToken) {
				if (!isAfter(new Date(), new Date(decodedToken.exp))) {
					return {
						...PartialInvalidArgumentsError,
						invalidArguments: [{ key: 'token', message: 'Expired token' }]
					}
				} else if (decodedToken.id) {
					try {
						await prisma.account.update({
							where: { id: decodedToken.id },
							data: {
								verifiedAt: new Date()
							}
						})

						return { success: true }
					} catch (error) {
						return UnableToProcessError
					}
				} else {
					return invalidTokenError
				}
			} else {
				return invalidTokenError
			}
		} catch (error) {
			return invalidTokenError
		}
	}
})
