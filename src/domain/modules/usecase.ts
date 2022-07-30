import { Http } from '@/data/protocols/http/typings'
import { Module } from '.'

export namespace ModulesUseCases {
	export interface GetModulesFromCourse {
		execute(courseID: string, fields?: string[], pagination?: Http.Pagination): Promise<Module[]>
	}
}
