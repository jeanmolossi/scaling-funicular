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

export class GetModuleByID implements ModulesUseCases.GetModuleByID {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (moduleID: string): Promise<Module> {
		const { data } = await this.httpClient.request<CourseModule>({
			url: `/module/${moduleID}`,
			method: 'GET'
		})

		return new Module(
			data.module_id,
			data.course_id,
			data.module_title,
			data.module_description,
			data.module_thumbnail,
			data.module_published
		)
	}
}
