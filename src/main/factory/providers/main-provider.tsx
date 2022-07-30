import React from 'react'
import { AuthProvider, CoursesProvider } from '@/presentation/providers'
import { ModulesProvider } from '@/presentation/providers/modules'
import { makeGetCourses } from '../data/usecase/get-courses'
import { makeGetModulesFromCourse } from '../data/usecase/modules/get-modules-from-course'

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

	const getModulesFromCourse = makeGetModulesFromCourse()

	const modulesFactory = {
		getModulesFromCourse
	}

	return (
		<AuthProvider>
			<CoursesProvider {...coursesFactory}>
				<ModulesProvider {...modulesFactory}>
					{children}
				</ModulesProvider>
			</CoursesProvider>
		</AuthProvider>
	)
}
