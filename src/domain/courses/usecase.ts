import { Course } from './'

export namespace CoursesUseCases {
	export interface GetCourses {
		execute(fields?: string[]): Promise<Course[]>
	}

	export interface GetCourseByID {
		execute (id: string): Promise<Course>
	}
}
