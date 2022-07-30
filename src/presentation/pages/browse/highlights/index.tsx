import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { PlayCircleFilled } from '@mui/icons-material'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Course } from '@/domain/courses'
import { useWidthFrom } from '@/presentation/hooks/use-width-from'
import { useCourses } from '@/presentation/providers'
import { MAX_COLUMNS } from './constants'

interface Dimensions {
	columns: number
	width: number
	height: number
}

const THUMB_WIDTH = 1280
const THUMB_HEIGHT = 720

const Highlights = () => {
	const { getCourses } = useCourses()

	const imageListRef = useRef<HTMLUListElement>(null!)

	const [, breakpoint, lazyCalc] = useWidthFrom(0)

	const [courses, setCourses] = useState<Course[]>([])
	const [dimensions, setDimensions] = useState<Dimensions>({
		columns: MAX_COLUMNS[breakpoint],
		width: 100,
		height: 100
	})

	useEffect(() => {
		if (imageListRef.current) {
			const containerWidth = imageListRef.current.clientWidth
			lazyCalc(containerWidth)

			getCourses.execute()
				.then(
					setupCourses(setCourses, containerWidth, MAX_COLUMNS[breakpoint])
				).then(
					setupDimensions(setDimensions)
				)
		}
	}, [breakpoint])

	return (
		<>
			<h1>Destaques</h1>

			<ImageList
				ref={imageListRef}
				sx={{ width: '100%', transform: 'translateZ(0)' }}
				gap={1}
				cols={dimensions.columns}
			>
				{courses.map((course) => (
					<ImageListItem key={course.id}>
						<img
							{...srcset(course.thumb, dimensions.width, dimensions.height, 1, 1)}
							alt="Placeholder"
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
		</>
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
	return (courses: Course[]) => {
		setCourses(limitResponseLenght(courses, maxColumns))

		const columns = Math.min(courses.length, maxColumns)
		const columnWidth = containerWidth / columns

		const itemDimensions = calcRatio(columnWidth)

		return {
			columns,
			...itemDimensions
		}
	}
}

function limitResponseLenght<T> (response: T[], length: number = 5) {
	return response.slice(0, length)
}

function setupDimensions (setDimensions: Dispatch<SetStateAction<Dimensions>>) {
	return (dimensions: Dimensions) => {
		setDimensions(dimensions)
	}
}

function calcRatio (columnWidth: number) {
	const reductionRatio = columnWidth / THUMB_WIDTH

	const width = Math.floor(columnWidth)
	const height = Math.floor(THUMB_HEIGHT * reductionRatio)

	return {
		width,
		height
	}
}
