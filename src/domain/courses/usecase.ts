import { Http } from '@/data/protocols/http/typings'
import { Course } from './'

export namespace CoursesUseCases {
	export interface GetCourses {
		execute(fields?: string[], pagination?: Http.Pagination): Promise<Course[]>
	}

	export interface GetCourseByID {
		execute (id: string): Promise<Course>
	}
}
