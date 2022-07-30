import React, { Suspense } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const LazyVideoPlayer = React.lazy(() => import('./player'))

export const Lesson = () => {
	return (
		<Box display={'block'} width="100%" height="100%">
			<Suspense fallback={<CircularProgress size={32} color="primary" />}>
				<LazyVideoPlayer />
			</Suspense>
		</Box>
	)
}
