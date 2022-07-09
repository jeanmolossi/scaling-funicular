import * as Cognito from 'amazon-cognito-identity-js'
import { SessionError } from '../errors/session-error'

export class Authenticator {
	private _user: Cognito.CognitoUser
	private _userPool: Cognito.CognitoUserPool

	constructor () {
		this._userPool = new Cognito.CognitoUserPool({
			UserPoolId: process.env.COGNITO_USER_POOL!,
			ClientId: process.env.COGNITO_CLIENT_ID!
		})
	}

	public async signIn (username: string, password: string) {
		this._user = new Cognito.CognitoUser({
			Username: username,
			Pool: this._userPool
		})

		const authenticationData: Cognito.IAuthenticationDetailsData = {
			Username: username,
			Password: password
		}

		const authenticationDetails = new Cognito.AuthenticationDetails(authenticationData)

		return await new Promise((resolve, reject) => {
			this._user.authenticateUser(authenticationDetails, {
				onSuccess: resolve,
				onFailure: reject,
				newPasswordRequired: (_, requiredAttributes: any) => {
					this._user.completeNewPasswordChallenge(password, requiredAttributes,
						{
							onSuccess: resolve,
							onFailure: reject
						}
					)
				}
			})
		})
	}

	public async signOut (): Promise<string> {
		return await new Promise((resolve, reject) => {
			const user = this._userPool.getCurrentUser()
			if (!user) {
				reject(new SessionError('user not logged in'))
				return
			}

			user.signOut(() => {
				resolve('logged out')
			})
		})
	}

	public async getSession () {
		return await new Promise((resolve, reject) => {
			const user = this._userPool.getCurrentUser()

			if (!user) {
				reject(new SessionError('user not logged in'))
				return
			}

			user.getSession((err: Error, session: Cognito.CognitoUserSession | null) => {
				if (err) {
					reject(new SessionError(err.message))
					return
				}

				if (!session) {
					reject(new SessionError('user not logged in'))
					return
				}

				resolve(session)
			})
		})
	}
}
