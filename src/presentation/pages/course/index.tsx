import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { AuthLayout } from '@/presentation/components'
import { useModules } from '@/presentation/providers/modules'

export const Course = () => {
	const { course_id } = useParams()
	const { getModulesFromCourse } = useModules()

	useEffect(() => {
		if (course_id) {
			getModulesFromCourse.execute(course_id)
				.then(console.log)
		}
	}, [])

	return (
		<AuthLayout>
			<Outlet />

			<Typography variant='h3' component={'h1'}>
				Escolha uma aula
			</Typography>
		</AuthLayout>
	)
}
