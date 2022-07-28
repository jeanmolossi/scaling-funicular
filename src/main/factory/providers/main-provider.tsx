import React from 'react'
import { AuthProvider, CoursesProvider } from '@/presentation/providers'
import { makeGetCourses } from '../data/usecase/get-courses'

// MainProvider are wrapping all the application's providers
export function MainProvider ({ children }: { children: React.ReactNode}) {
	return (
		<>
			{children}
		</>
	)
}

// WithRouterProvider are wrapping all the application's providers but its
// runs inside the router. Enabling use Router context. Example useNavigate()
export function WithRouterProvider ({ children }: { children: React.ReactNode}) {
	const getCourses = makeGetCourses()

	const coursesFactory = {
		getCourses
	}

	return (
		<AuthProvider>
			<CoursesProvider {...coursesFactory}>
				{children}
			</CoursesProvider>
		</AuthProvider>
	)
}
