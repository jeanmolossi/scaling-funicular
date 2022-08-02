import { Http } from '@/data/protocols/http/typings'
import { Course } from '@/domain/courses'
import { CoursesUseCases } from '@/domain/courses/usecase'

interface CourseResponse {
	data: Array<{
		course_description: string
		course_id: string
		course_published: boolean
		course_thumbnail: string
		course_title: string
	}>
	meta: Http.Meta
}

export class GetCourses implements CoursesUseCases.GetCourses {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (fields = [], pagination: Http.Pagination = {}): Promise<Course[]> {
		const urlSearch = new URLSearchParams()

		if (fields.length > 0) {
			urlSearch.set('fields', fields.join(','))
		}
		urlSearch.set('page', `${pagination.page ?? 1}`)
		urlSearch.set('items_per_page', `${pagination.items_per_page ?? 10}`)

		const url = `/course?${urlSearch.toString()}`

		const { data: response } = await this.httpClient.request<CourseResponse>({
			method: 'GET',
			url
		})

		const { data: courses } = response

		return courses.map(course => {
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
