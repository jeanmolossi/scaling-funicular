import { Http } from '@/data/protocols/http/typings'
import { Student } from '@/domain/student'
import { Authentication } from './typings'

export class Authenticator {
	constructor (private readonly httpClient: Http.Client) {}

	public async signIn (username: string, password: string): Promise<Authentication.MeStudentResult> {
		const { data } = await this.httpClient.request<Authentication.SessionResult>({
			method: 'POST',
			url: '/auth/login',
			body: {
				username,
				password
			}
		})

		const { data: student } = await this.httpClient.request<Authentication.MeStudentResult>({
			method: 'GET',
			url: '/students/me',
			headers: {
				Authorization: `${data.access_token}`
			}
		})

		return student
	}

	public async signOut (): Promise<string> {
		await this.httpClient.request<void>({
			method: 'POST',
			url: '/auth/logout'
		})

		return 'logged out'
	}

	public getStudentSync (session: Authentication.MeStudentResult): Student {
		return new Student(
			session.student_id,
			session.student_email
		)
	}
}
