import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { RequireAuth } from '@/presentation/providers'

const MakeLoginFactory = React.lazy(() => import('../factory/pages/login'))
const MakeRecoverPasswordFactory = React.lazy(() => import('../factory/pages/recover-password'))
const MakeResetPasswordFactory = React.lazy(() => import('../factory/pages/reset-password'))

export function Router () {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<Suspense fallback={<CircularProgress size={32} />}>
							<MakeLoginFactory />
						</Suspense>
					}
				/>

				<Route
					path='/recuperar-senha'
					element={
						<Suspense fallback={<CircularProgress size={32} />}>
							<MakeRecoverPasswordFactory />
						</Suspense>
					}
				/>

				<Route
					path='/resetar-senha/:token'
					element={
						<Suspense fallback={<CircularProgress size={32} />}>
							<MakeResetPasswordFactory />
						</Suspense>
					}
				/>

				<Route
					path="/browse"
					element={
						<RequireAuth>
							<Suspense fallback={<CircularProgress size={32} />}>
								<h1>Protected</h1>
							</Suspense>
						</RequireAuth>
					}
				/>

				<Route
					path="*"
					element={
						<Navigate to={'/'} />
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
