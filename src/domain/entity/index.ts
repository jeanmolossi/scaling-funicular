export class BaseEntity<T = string> {
	constructor (protected readonly _id: T) {}

	get id (): T {
		return this._id
	}
}
