import { BaseEntity } from '../entity'
import { Lesson } from '../lessons'

export class Section extends BaseEntity<string> {
	private _lessons: Lesson[] = []

	constructor (
		protected _id: string,
		private _course_id: string,
		private _module_id: string,
		private _title: string,
		private _index: number,
		private _published: boolean
	) {
		super(_id)
	}

	get title (): string {
		return this._title
	}

	attachLesson (lesson: Lesson): void {
		this._lessons.push(lesson)
	}

	attachLessons (lessons: Lesson[]): void {
		this._lessons.push(...lessons)
	}

	get lessons (): Lesson[] {
		return this._lessons
	}
}
