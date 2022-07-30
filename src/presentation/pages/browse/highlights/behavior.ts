import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Course } from '@/domain/courses'
import { Dimensions } from '.'
import { THUMB_WIDTH, THUMB_HEIGHT } from './constants'

export function setupCourses (setCourses: Dispatch<SetStateAction<Course[]>>, containerWidth: number, maxColumns: number) {
	return (courses: Course[]): Dimensions => {
		setCourses(limitResponseToLength(courses, maxColumns))

		const columns = Math.min(courses.length, maxColumns)
		const columnWidth = containerWidth / columns

		return calcItemDimensionsFreezingRatio(columnWidth)
	}
}

export function limitResponseToLength<T> (response: T[], length: number = 5) {
	return response.slice(0, length)
}

export function setupDimensions (setDimensions: Dispatch<SetStateAction<Dimensions>>) {
	return (dimensions: Dimensions) => {
		setDimensions(dimensions)
	}
}

export function calcItemDimensionsFreezingRatio (columnWidth: number): Dimensions {
	const reductionRatio = columnWidth / THUMB_WIDTH

	const width = Math.floor(columnWidth)
	const height = Math.floor(THUMB_HEIGHT * reductionRatio)

	return {
		width,
		height
	}
}

export function arrayMap (length: number, children: ReactNode) {
	return Array.from({ length }, () => {
		if (children && typeof children === 'object') {
			const withKey = Object.create(children)
			Object.defineProperty(withKey, 'key', { value: Math.random().toString(16) })
			return withKey
		}

		return children
	})
}
