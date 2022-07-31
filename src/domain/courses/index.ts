import { BaseEntity } from '../entity'
import { Module } from '../modules'

export class Course extends BaseEntity<string> {
	private _modules: Module[] = []

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

	public attachModule (module: Module): void {
		this._modules.push(module)
	}

	public attachModules (modules: Module[]): void {
		modules.forEach(this.attachModule.bind(this))
	}
}
