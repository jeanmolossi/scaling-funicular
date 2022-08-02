import { HttpClient } from '@/data/protocols/http/http-client'
import { GetModuleByID } from '@/data/usecases/modules/get-module-by-id'
import { ModulesUseCases } from '@/domain/modules/usecase'

export const makeGetModuleByID = (): ModulesUseCases.GetModuleByID => new GetModuleByID(
	new HttpClient(process.env.BASE_API!)
)
