import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStorage } from '@/presentation/hooks/use-storage'

interface AuthContextType {
	student: any;
	signin: (email: string, password: string, action?: () => void) => void;
	signout: (action?: () => void) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
	const [remember] = useStorage('remember')
	let [student, setStudent] = useState<any>(null)

	if (remember) {
		[student, setStudent] = useStorage('student')
	}

	const signin = async (email: string, password: string, action?: () => void) => {
		try {
			setStudent({ id: '1' })
			action?.()
		} catch (e) {}
	}

	const signout = async (action?: () => void) => {
		try {
			setStudent(null!)
			action?.()
		} catch (e) {}
	}

	return <AuthContext.Provider value={{
		student,
		signin,
		signout
	}}>{children}</AuthContext.Provider>
}

export function RequireAuth ({ children }: { children: JSX.Element }) {
	const auth = useAuth()
	const location = useLocation()

	if (!auth.student) {
		return <Navigate to="/" replace state={{ from: location }} />
	}

	return children
}

export function useAuth () {
	return React.useContext(AuthContext)
}
