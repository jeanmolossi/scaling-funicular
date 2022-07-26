import React from 'react'
import Grid from '@mui/material/Grid'
import { Navbar } from '@/presentation/components/_layout/navbar'

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Grid container>
			<Navbar />

			{children}
		</Grid>
	)
}
