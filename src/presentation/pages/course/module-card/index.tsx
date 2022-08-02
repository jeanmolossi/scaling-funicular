import * as React from 'react'
import { Link } from 'react-router-dom'
import { Videocam } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Module } from '@/domain/modules'

interface ModuleCardProps {
  module: Module
}

export default function ModuleCard ({ module }: ModuleCardProps) {
	return (
		<Card sx={{ width: 345, marginInline: 1, height: '100%' }}>
			<CardHeader
				title={module.title}
				action={
					<Button
						component={Link}
						variant="contained"
						color="primary"
						to={`/courses/${module.course_id}/module/${module.id}`}
					>
						<Videocam /> Abrir
					</Button>
				}
			/>
			<CardMedia
				component="img"
				height="194"
				image={module.thumbnail}
				alt={module.title}
			/>
			<CardContent sx={{ flex: 1 }}>
				<Typography variant="body2" color="text.secondary">
					{module.description} {module.id}
				</Typography>
			</CardContent>
		</Card>
	)
}
