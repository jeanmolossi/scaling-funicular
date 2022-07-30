import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AuthLayout } from '@/presentation/components'

const LazyHeroVideo = React.lazy(() => import('./hero-video'))
const LazyHighlights = React.lazy(() => import('./highlights'))

export const Browse = () => {
	return (
		<AuthLayout>
			<Box display={'block'} width="100%" height="100%">
				<Suspense fallback={<CircularProgress size={32} color="primary" />}>
					<LazyHeroVideo />
				</Suspense>
			</Box>

			<Box display={'block'} width="100%" minHeight="100%" marginTop={{ xs: -16, md: -8, lg: -16 }} paddingX={9} zIndex={1}>
				<Typography variant="h1">Browse</Typography>

				<Suspense fallback={<CircularProgress size={32} color="primary" />}>
					<LazyHighlights />
				</Suspense>
			</Box>

			<Outlet />
		</AuthLayout>
	)
}
