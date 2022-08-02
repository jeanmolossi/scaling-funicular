import { Http } from '@/data/protocols/http/typings'
import { Section } from '.'

export namespace SectionUseCases {
	export interface GetSectionsFromModule {
		execute(moduleID: string, fields?: string[], pagination?: Http.Pagination): Promise<Section[]>
	}
}
