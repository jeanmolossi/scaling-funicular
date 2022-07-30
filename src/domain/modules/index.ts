import { BaseEntity } from '../entity'

export class Module extends BaseEntity<string> {
	constructor (
		protected _id: string,
		private _course_id: string,
		private _title: string,
		private _description: string,
		private _thumbnail: string,
		private _published: boolean
	) {
		super(_id)
	}

	get course_id (): string {
		return this._course_id
	}

	get title (): string {
		return this._title
	}

	get description (): string {
		return this._description
	}

	get thumbnail (): string {
		return this._thumbnail
	}

	get published (): boolean {
		return this._published
	}
}
