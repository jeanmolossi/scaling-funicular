import React, { useCallback, useEffect, useMemo } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Authenticator } from '@/data/auth'
import { useSession, useStorage } from '@/presentation/hooks/use-storage'

interface AuthContextType {
	student: any;
	signin: (email: string, password: string, action?: () => void) => Promise<void>;
	signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
	const [remember] = useStorage<boolean>('remember')
	let [student, setStudent] = useSession<any>('student')

	// if remember me is checked, try to get the student from local storage
	if (remember) {
		[student, setStudent] = useStorage('student')
	}

	const authenticator = useMemo(() => new Authenticator(), [])

	const signin = useCallback(async (email: string, password: string, action?: () => void) => {
		try {
			const session = await authenticator.signIn(email, password)
			setStudent(session)
			action?.()
		} catch (e) {
			console.error(e)
		}
	}, [authenticator])

	const signout = useCallback(async () => {
		try {
			setStudent(null!)
			await authenticator.signOut()
		} catch (e) {
			console.error(e)
		}
	}, [authenticator])

	const navigate = useNavigate()

	useEffect(() => {
		if (!!student && ['/', '/recuperar-conta', '/resetar-senha'].includes(location.pathname)) {
			navigate((location as any).state?.from.pathname || '/browse', { replace: true })
		}
	}, [student, location.pathname])

	return <AuthContext.Provider value={{
		student,
		signin,
		signout
	}}>
		{children}
	</AuthContext.Provider>
}

// RequireAuth checks if the user is authenticated and redirects to the login page if not
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
