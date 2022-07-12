import * as Cognito from 'amazon-cognito-identity-js'
import { Student } from '@/domain/student'
import { SessionError } from '../errors/session-error'
import { Authentication } from './typings'

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

		return await new Promise<Authentication.SessionResult>((resolve, reject) => {
			this._user.authenticateUser(authenticationDetails, {
				onSuccess: (session) => {
					resolve(session.getIdToken().decodePayload() as Authentication.SessionResult)
				},
				onFailure: reject,
				newPasswordRequired: (_, requiredAttributes: any) => {
					this._user.completeNewPasswordChallenge(password, requiredAttributes,
						{
							onSuccess: (session) => resolve(session as any),
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

	public async getSession () : Promise<Authentication.SessionResult> {
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

				if (!session.isValid()) {
					reject(new SessionError('invalid session'))
					return
				}

				resolve(session.getIdToken().decodePayload() as any)
			})
		})
	}

	public async getStudent (): Promise<Student> {
		const session = await this.getSession()
		return new Student(session['cognito:username'], session.email)
	}

	public getStudentSync (session: Authentication.SessionResult): Student {
		return new Student(
			session['cognito:username'],
			session.email
		)
	}
}
