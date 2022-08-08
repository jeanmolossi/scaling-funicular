import { Http } from '@/data/protocols/http/typings'
import { Lesson } from '@/domain/lessons'
import { SectionUseCases } from '@/domain/sections/usecase'

interface SectionLessonsResponse {
	data: Array<{
		id: string
		title: string
		thumbnail: string
		video_preview?: string
		video?: string
		description: string
		published: boolean
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
			lesson.id,
			sectionID,
			lesson.title,
			lesson.description,
			lesson.thumbnail,
			lesson.video_preview,
			lesson.video,
			lesson.published
		))
	}
}
