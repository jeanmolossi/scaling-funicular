import React from 'react'
import { PlayCircleFilled } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { Course } from '@/domain/courses'
import { Dimensions } from '..'

interface ListItemProps {
	course: Course
	dimensions: Dimensions
}

const ListItem = ({ course, dimensions }: ListItemProps) => {
	return (
		<ImageListItem>
			<img
				{...srcset(course.thumb, dimensions.width, dimensions.height)}
				alt={`${course.title} thumbnail`}
				loading='lazy'
			/>

			<ImageListItemBar
				title={course.title}
				subtitle="Descrição do curso"
				position='bottom'
				actionIcon={
					<IconButton>
						<PlayCircleFilled />
					</IconButton>
				}
				actionPosition="left"
			/>
		</ImageListItem>
	)
}

function srcset (image: string, width: number, height: number, rows = 1, cols = 1) {
	const wCols = width * cols
	const hRows = height * rows

	return {
		src: `${image}?w=${wCols}&h=${hRows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${wCols}&h=${hRows}&fit=crop&auto=format&dpr=2 2x`
	}
}

export default ListItem
