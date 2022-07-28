import { Course } from '@/domain/courses'
import { CoursesUseCases } from '@/domain/courses/usecase'
import { Http } from '../protocols/http/typings'

interface CourseResponse {
	course_description: string
	course_id: string
	course_published: boolean
	course_thumbnail: string
	course_title: string
}

export class GetCourses implements CoursesUseCases.GetCourses {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (fields = []): Promise<Course[]> {
		let url = '/course'
		if (fields.length > 0) {
			url += '?fields=' + fields.join(',')
		}

		const { data: response } = await this.httpClient.request<CourseResponse[]>({
			method: 'GET',
			url
		})

		return response.map(course => {
			const {
				course_id = '',
				course_description = '',
				course_published = false,
				course_thumbnail = '',
				course_title = ''
			} = course

			return new Course(
				course_id,
				course_description,
				course_published,
				course_thumbnail,
				course_title
			)
		})
	}
}
