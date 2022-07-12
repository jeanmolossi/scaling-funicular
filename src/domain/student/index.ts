import { BaseEntity } from '../entity'

export class Student extends BaseEntity<string> {
	constructor (
		protected _id: string,
		private _email: string
	) {
		super(_id)
	}

	get email (): string {
		return this._email
	}
}
