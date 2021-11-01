export interface DecodedToken {
	payload: string
	exp: number
	iat: number
}

export interface DecodedForgotPwdEmailToken extends DecodedToken {
	id: string
}
export interface DecodedVerificationEmailToken extends DecodedToken {
	id: string
}

export interface UserSessionData {
	accountId: string
	userId: string
	operatorId?: string
	staffId?: string
	access: 'user' | 'operator' | 'staff'
}
