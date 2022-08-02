import { Http } from '@/data/protocols/http/typings'
import { Section } from '@/domain/sections'
import { SectionUseCases } from '@/domain/sections/usecase'

interface SectionFromModule {
	data: Array<{
		course_id: string
		module_id: string
		section_id: string
		section_title: string
		section_index: number
		section_published: boolean
	}>
}

export class GetSectionsFromModule implements SectionUseCases.GetSectionsFromModule {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (moduleID: string, fields: string[] = [], pagination?: Http.Pagination | undefined): Promise<Section[]> {
		const query = new URLSearchParams()

		if (fields.length > 0) {
			query.set('fields', fields.join(','))
		}

		query.set('page', `${pagination?.page ?? 1}`)
		query.set('items_per_page', `${pagination?.items_per_page ?? 10}`)

		const { data: { data: sections } } = await this.httpClient.request<SectionFromModule>({
			method: 'GET',
			url: `/module/${moduleID}/sections?${query.toString()}`
		})

		return sections.map((section, i) => new Section(
			section.section_id,
			section.course_id,
			section.module_id,
			section.section_title,
			i + 1,
			section.section_published
		))
	}
}
