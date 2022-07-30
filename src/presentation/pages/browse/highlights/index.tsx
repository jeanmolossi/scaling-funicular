import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { PlayCircleFilled } from '@mui/icons-material'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Course } from '@/domain/courses'
import { useWidthFrom } from '@/presentation/hooks/use-width-from'
import { useCourses } from '@/presentation/providers'
import { MAX_COLUMNS, THUMB_WIDTH,	THUMB_HEIGHT } from './constants'

interface Dimensions {
	width: number
	height: number
}

const Highlights = () => {
	const { getCourses } = useCourses()

	const imageListRef = useRef<HTMLUListElement>(null!)

	// init with zero value and use lazyCalc to calculate the value after
	// the component is mounted
	const [, breakpoint, lazyCalc] = useWidthFrom(0)

	// set columns on component by breakpoint
	const columns = useMemo(() => MAX_COLUMNS[breakpoint], [breakpoint])

	const [courses, setCourses] = useState<Course[]>([])

	// dimensions of the every course item
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: 100,
		height: 100
	})

	useEffect(() => {
		if (imageListRef.current) {
			const containerWidth = imageListRef.current.clientWidth
			lazyCalc(containerWidth)

			getCourses.execute()
				.then(
					setupCourses(setCourses, containerWidth, columns)
				).then(
					setupDimensions(setDimensions)
				)
		}
	}, [breakpoint])

	return (
		<ImageList
			ref={imageListRef}
			sx={{ width: '100%', transform: 'translateZ(0)' }}
			gap={1}
			cols={columns}
		>
			{courses.map((course) => (
				<ImageListItem key={course.id}>
					<img
						{...srcset(course.thumb, dimensions.width, dimensions.height, 1, 1)}
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
			))}
		</ImageList>
	)
}

export default Highlights

function srcset (image: string, width: number, height: number, rows = 1, cols = 1) {
	const wCols = width * cols
	const hRows = height * rows

	return {
		src: `${image}?w=${wCols}&h=${hRows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${wCols}&h=${hRows}&fit=crop&auto=format&dpr=2 2x`
	}
}

function setupCourses (setCourses: Dispatch<SetStateAction<Course[]>>, containerWidth: number, maxColumns: number) {
	return (courses: Course[]): Dimensions => {
		setCourses(limitResponseToLength(courses, maxColumns))

		const columns = Math.min(courses.length, maxColumns)
		const columnWidth = containerWidth / columns

		return calcItemDimensionsFreezingRatio(columnWidth)
	}
}

function limitResponseToLength<T> (response: T[], length: number = 5) {
	return response.slice(0, length)
}

function setupDimensions (setDimensions: Dispatch<SetStateAction<Dimensions>>) {
	return (dimensions: Dimensions) => {
		setDimensions(dimensions)
	}
}

function calcItemDimensionsFreezingRatio (columnWidth: number): Dimensions {
	const reductionRatio = columnWidth / THUMB_WIDTH

	const width = Math.floor(columnWidth)
	const height = Math.floor(THUMB_HEIGHT * reductionRatio)

	return {
		width,
		height
	}
}
