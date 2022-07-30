import { HttpClient } from '@/data/protocols/http/http-client'
import { GetModulesFromCourse } from '@/data/usecases/modules/get-modules-from-course'

export const makeGetModulesFromCourse = () => new GetModulesFromCourse(
	new HttpClient(process.env.BASE_API!)
)
