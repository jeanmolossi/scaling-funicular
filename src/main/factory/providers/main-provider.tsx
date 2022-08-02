import React from 'react'
import { makeGetCourses } from '@/main/factory/data/usecase/courses/get-courses'
import { makeGetModuleByID } from '@/main/factory/data/usecase/modules/get-module-by-id'
import { makeGetModulesFromCourse } from '@/main/factory/data/usecase/modules/get-modules-from-course'
import { AuthProvider, CoursesProvider } from '@/presentation/providers'
import { ModulesProvider } from '@/presentation/providers/modules'
import { SectionsProvider } from '@/presentation/providers/sections'
import { makeGetSectionsFromModule } from '../data/usecase/sections/get-sections-from-module'

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
	const getModuleByID = makeGetModuleByID()

	const modulesFactory = {
		getModulesFromCourse,
		getModuleByID
	}

	const getSectionsFromModule = makeGetSectionsFromModule()

	const sectionsFactory = {
		getSectionsFromModule
	}

	return (
		<AuthProvider>
			<CoursesProvider {...coursesFactory}>
				<ModulesProvider {...modulesFactory}>
					<SectionsProvider {...sectionsFactory}>
						{children}
					</SectionsProvider>
				</ModulesProvider>
			</CoursesProvider>
		</AuthProvider>
	)
}
