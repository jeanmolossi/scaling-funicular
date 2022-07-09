import React from 'react'
import { useAuth } from '@/presentation/providers'

export const Browse = () => {
	const { signout } = useAuth()

	return (
		<div>
			<button onClick={signout}>Signout</button>
			<h1>Protected page</h1>
		</div>
	)
}
