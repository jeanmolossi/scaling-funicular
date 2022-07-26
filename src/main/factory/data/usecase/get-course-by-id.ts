import { HttpClient } from '@/data/protocols/http/http-client'
import { GetCourseByID } from '@/data/usecases/get-course-by-id'

export const makeGetCourseById = () => new GetCourseByID(
	new HttpClient(process.env.BASE_API!)
)
