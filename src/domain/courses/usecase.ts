import { Course } from './'

export namespace CoursesUseCases {
	export interface GetCourseByID {
		execute (id: string): Promise<Course>
	}
}
