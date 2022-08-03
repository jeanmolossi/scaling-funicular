import { HttpClient } from '@/data/protocols/http/http-client'
import { GetLessonsFromSection } from '@/data/usecases/sections/get-lessons-from-section'
import { SectionUseCases } from '@/domain/sections/usecase'

export const makeGetLessonsFromSection = (): SectionUseCases.GetLessonsFromSection => new GetLessonsFromSection(
	new HttpClient(process.env.BASE_API!)
)
