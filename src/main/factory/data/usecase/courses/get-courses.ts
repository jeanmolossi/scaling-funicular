import { HttpClient } from '@/data/protocols/http/http-client'
import { GetCourses } from '@/data/usecases/courses/get-courses'

export const makeGetCourses = () => new GetCourses(
	new HttpClient(process.env.BASE_API!)
)
