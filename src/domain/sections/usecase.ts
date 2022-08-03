import { Http } from '@/data/protocols/http/typings'
import { Lesson } from '@/domain/lessons'
import { Section } from '.'

export namespace SectionUseCases {
	export interface GetSectionsFromModule {
		execute(moduleID: string, fields?: string[], pagination?: Http.Pagination): Promise<Section[]>
	}

	export interface GetLessonsFromSection {
		execute(sectionID: string, fields?: string[], pagination?: Http.Pagination): Promise<Lesson[]>
	}
}
