import { BaseEntity } from '../entity'

export class Lesson extends BaseEntity<string> {
	constructor (
		protected _id: string,
		private _section_id: string,
		private _title: string,
		private _description: string,
		private _thumbnail: string,
		private _video_preview: string = '',
		private _video: string = '',
		private _published: boolean = false
	) {
		super(_id)
	}

	get section_id (): string {
		return this._section_id
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

	get preview (): string {
		return this._video_preview
	}

	get video (): string {
		return this._video
	}

	get hasVideo (): boolean {
		return !!this._video
	}

	get published (): boolean {
		return this._published
	}
}
