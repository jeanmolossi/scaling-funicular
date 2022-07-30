import React from 'react'
import { ModulesUseCases } from '@/domain/modules/usecase'

interface ModulesContextType {
	getModulesFromCourse: ModulesUseCases.GetModulesFromCourse
}

interface WithChildrenProps extends ModulesContextType {
	children: React.ReactNode
}

const ModulesContext = React.createContext<ModulesContextType>(null!)

export function ModulesProvider ({ children, getModulesFromCourse }: WithChildrenProps) {
	return <ModulesContext.Provider value={{
		getModulesFromCourse
	}}>{children}</ModulesContext.Provider>
}

export function useModules () {
	return React.useContext(ModulesContext)
}
