import { HttpClient } from '@/data/protocols/http/http-client'
import { GetSectionsFromModule } from '@/data/usecases/sections/get-sections-from-module'
import { SectionUseCases } from '@/domain/sections/usecase'

export const makeGetSectionsFromModule = (): SectionUseCases.GetSectionsFromModule =>
	new GetSectionsFromModule(
		new HttpClient(process.env.BASE_API!)
	)
