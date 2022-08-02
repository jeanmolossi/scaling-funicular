import { Http } from '@/data/protocols/http/typings'
import { Course } from '@/domain/courses'
import { CoursesUseCases } from '@/domain/courses/usecase'

interface CourseResponse {
	course_description: string
	course_id: string
	course_published: boolean
	course_thumbnail: string
	course_title: string
}

export class GetCourseByID implements CoursesUseCases.GetCourseByID {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (id: string): Promise<Course> {
		const { data: response } = await this.httpClient.request<CourseResponse>({
			method: 'GET',
			url: `/courses/${id}`
		})

		const {
			course_id,
			course_description,
			course_published,
			course_thumbnail,
			course_title
		} = response

		return new Course(
			course_id,
			course_description,
			course_published,
			course_thumbnail,
			course_title
		)
	}
}
