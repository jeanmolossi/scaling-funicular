import { BaseEntity } from '../entity'

export class Course extends BaseEntity<string> {
	constructor (
		protected _id: string,
		private _description: string,
		private _published: boolean,
		private _thumbnail: string,
		private _title: string
	) {
		super(_id)
	}

	get title (): string {
		return this._title
	}

	get thumb (): string {
		return this._thumbnail
	}

	get isPublished (): boolean {
		return this._published
	}
}
