export namespace Authentication {
	export interface AccessTokenPayload {
		auth_time: number;
		client_id: string;
		event_id: string;
		exp: number;
		iat: number;
		iss: string;
		jti: string;
		origin_jti: string
		scope: string
		sub: string
		token_use: string
		username: string
	}

	interface IdTokenPayload {
		aud: string
		auth_time: number
		'cognito:username': string
		email: string
		email_verified: string
		event_id: string
		exp: number
		iat: number
		iss: string
		jti: string
		origin_jti: string
		sub: string
		token_use: string
	}

	export type SessionResult = IdTokenPayload
}
