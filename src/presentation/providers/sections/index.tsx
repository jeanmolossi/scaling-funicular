import React from 'react'
import { SectionUseCases } from '@/domain/sections/usecase'

interface SectionsContextType {
	getSectionsFromModule: SectionUseCases.GetSectionsFromModule
}

interface WithChildrenProps extends SectionsContextType {
	children: React.ReactNode
}

const SectionsContext = React.createContext<SectionsContextType>(null!)

export function SectionsProvider ({ children, getSectionsFromModule }: WithChildrenProps) {
	return <SectionsContext.Provider value={{
		getSectionsFromModule
	}}>{children}</SectionsContext.Provider>
}

export function useSections () {
	return React.useContext(SectionsContext)
}
