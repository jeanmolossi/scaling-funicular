import React from 'react'
import { ModulesUseCases } from '@/domain/modules/usecase'

interface ModulesContextType {
	getModulesFromCourse: ModulesUseCases.GetModulesFromCourse
	getModuleByID: ModulesUseCases.GetModuleByID
}

interface WithChildrenProps extends ModulesContextType {
	children: React.ReactNode
}

const ModulesContext = React.createContext<ModulesContextType>(null!)

export function ModulesProvider ({ children, getModulesFromCourse, getModuleByID }: WithChildrenProps) {
	return <ModulesContext.Provider value={{
		getModulesFromCourse,
		getModuleByID
	}}>{children}</ModulesContext.Provider>
}

export function useModules () {
	return React.useContext(ModulesContext)
}
