import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { RequireAuth } from '@/presentation/providers'
import { WithRouterProvider } from '../factory/providers/main-provider'

const MakeLoginFactory = React.lazy(() => import('../factory/pages/login'))
const MakeRecoverPasswordFactory = React.lazy(() => import('../factory/pages/recover-password'))
const MakeResetPasswordFactory = React.lazy(() => import('../factory/pages/reset-password'))
const MakeBrowseFactory = React.lazy(() => import('../factory/pages/browse'))

export function Router () {
	return (
		<BrowserRouter>
			<WithRouterProvider>
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
									<MakeBrowseFactory />
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
			</WithRouterProvider>
		</BrowserRouter>
	)
}
