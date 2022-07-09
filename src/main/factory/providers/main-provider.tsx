import React from 'react'
import { AuthProvider } from '@/presentation/providers'

export function MainProvider ({ children }: { children: React.ReactNode}) {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}
