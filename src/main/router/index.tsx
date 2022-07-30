import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { RequireAuth } from '@/presentation/providers'
import { WithRouterProvider } from '../factory/providers/main-provider'

const MakeLoginFactory = React.lazy(() => import('../factory/pages/login'))
const MakeRecoverPasswordFactory = React.lazy(() => import('../factory/pages/recover-password'))
const MakeResetPasswordFactory = React.lazy(() => import('../factory/pages/reset-password'))
const MakeBrowseFactory = React.lazy(() => import('../factory/pages/browse'))
const MakeBrowseMoreInfoFactory = React.lazy(() => import('../factory/pages/browse-more-info'))
const MakeCourse = React.lazy(() => import('../factory/pages/course'))
const MakeLesson = React.lazy(() => import('../factory/pages/lesson'))

export function Router () {
	return (
		<BrowserRouter>
			<WithRouterProvider>
				<Suspense fallback={<CircularProgress size={32} />}>
					<Routes>
						<Route
							index
							element={
								<MakeLoginFactory />
							}
						/>

						<Route
							path='/recuperar-senha'
							element={
								<MakeRecoverPasswordFactory />
							}
						/>

						<Route
							path='/resetar-senha/:token'
							element={
								<MakeResetPasswordFactory />
							}
						/>

						<Route
							path="/browse"
							element={
								<RequireAuth>
									<MakeBrowseFactory />
								</RequireAuth>
							}
						>
							<Route
								path="/browse/about/:id"
								element={
									<RequireAuth>
										<MakeBrowseMoreInfoFactory />
									</RequireAuth>
								}
							/>
						</Route>

						<Route
							path="/courses/:course_id"
							element={
								<RequireAuth>
									<MakeCourse />
								</RequireAuth>
							}
						>
							<Route
								path="/courses/:course_id/lessons/:lesson_id"
								element={
									<RequireAuth>
										<MakeLesson />
									</RequireAuth>
								}
							/>
						</Route>

						<Route
							path="*"
							element={
								<Navigate to={'/'} />
							}
						/>
					</Routes>
				</Suspense>
			</WithRouterProvider>
		</BrowserRouter>
	)
}
