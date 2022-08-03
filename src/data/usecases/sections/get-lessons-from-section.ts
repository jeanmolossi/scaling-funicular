import { Http } from '@/data/protocols/http/typings'
import { Lesson } from '@/domain/lessons'
import { SectionUseCases } from '@/domain/sections/usecase'

interface SectionLessonsResponse {
	data: Array<{
		lesson_id: string
		lesson_title: string
		lesson_thumbnail: string
		lesson_description: string
		lesson_published: boolean
	}>
}

export class GetLessonsFromSection implements SectionUseCases.GetLessonsFromSection {
	constructor (private readonly httpClient: Http.Client) {}

	async execute (sectionID: string, fields: string[] = [], pagination: Http.Pagination = {}): Promise<Lesson[]> {
		const query = new URLSearchParams()

		if (fields.length > 0) {
			query.set('fields', fields.join(','))
		}

		query.set('page', `${pagination.page ?? 1}`)
		query.set('items_per_page', `${pagination.items_per_page ?? 10}`)

		const { data: { data: lessons } } = await this.httpClient.request<SectionLessonsResponse>({
			method: 'GET',
			url: `/section/${sectionID}/lessons`
		})

		return lessons.map(lesson => new Lesson(
			lesson.lesson_id,
			sectionID,
			lesson.lesson_title,
			lesson.lesson_description,
			lesson.lesson_thumbnail,
			lesson.lesson_published
		))
	}
}
