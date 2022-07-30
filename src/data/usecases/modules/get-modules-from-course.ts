import { Http } from '@/data/protocols/http/typings'
import { Module } from '@/domain/modules'
import { ModulesUseCases } from '@/domain/modules/usecase'

interface CourseModule {
	course_id: string
	module_id: string
	module_title: string
	module_description: string
	module_thumbnail: string
	module_published: boolean
}

// interface ModulesResponse {
// 	data: Array<CourseModule>
// 	meta: Http.Meta
// }

export class GetModulesFromCourse implements ModulesUseCases.GetModulesFromCourse {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (courseID: string, fields: string[] = [], pagination: Http.Pagination = {}): Promise<Module[]> {
		const urlSearch = new URLSearchParams()

		if (fields.length > 0) {
			urlSearch.set('fields', fields.join(','))
		}

		urlSearch.set('page', `${pagination.page ?? 1}`)
		urlSearch.set('items_per_page', `${pagination.items_per_page ?? 10}`)

		const { data: modules } = await this.httpClient.request<Array<CourseModule>>({
			method: 'GET',
			url: `/course/${courseID}/modules?${urlSearch.toString()}`
		})

		// const { data: modules } = response

		return modules.map(courseModule => {
			const {
				module_id = '',
				module_title = '',
				module_description = '',
				module_thumbnail = '',
				module_published = false
			} = courseModule

			return new Module(
				module_id,
				courseID,
				module_title,
				module_description,
				module_thumbnail,
				module_published
			)
		})
	}
}
