import React from 'react'
import { CoursesUseCases } from '@/domain/courses/usecase'

interface CoursesContextType {
	getCourses: CoursesUseCases.GetCourses
}

interface WithChildrenProps extends CoursesContextType {
	children: React.ReactNode
}

const CoursesContext = React.createContext<CoursesContextType>(null!)

export function CoursesProvider ({ children, getCourses }: WithChildrenProps) {
	return <CoursesContext.Provider value={{
		getCourses
	}}>{children}</CoursesContext.Provider>
}

export function useCourses () {
	return React.useContext(CoursesContext)
}
