import React from 'react'
import { Outlet } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { AuthLayout } from '@/presentation/components'

export const Course = () => {
	return (
		<AuthLayout>
			<Outlet />

			<Typography variant='h3' component={'h1'}>
				Escolha uma aula
			</Typography>
		</AuthLayout>
	)
}
