import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const MakeLoginFactory = React.lazy(() => import('../factory/pages/login'))

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
			</Routes>
		</BrowserRouter>
	)
}
