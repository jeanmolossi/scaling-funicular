import React from 'react'
import Grid from '@mui/material/Grid'
import { Navbar } from '@/presentation/components/_layout/navbar'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Grid container paddingTop={{ xs: 7, sm: 0 }}>
			<Navbar />

			{children}
		</Grid>
	)
}
