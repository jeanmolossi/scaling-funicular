import React, { Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { AuthLayout } from '@/presentation/components'

const LazyHeroVideo = React.lazy(() => import('./hero-video'))

export const Browse = () => {
	return (
		<AuthLayout>
			<Box display={'block'} width="100%" height="100%">
				<Suspense fallback={<CircularProgress size={32} color="primary" />}>
					<LazyHeroVideo />
				</Suspense>
			</Box>
		</AuthLayout>
	)
}
