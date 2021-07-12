export interface DecodedToken {
	payload: string
	exp: number
	iat: number
}

export interface UserSessionData {
	accountId: string
	userId: string
	operatorId?: string
	adminId?: string
	access: 'user' | 'admin'
}
