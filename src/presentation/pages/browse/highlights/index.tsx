import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import ImageList from '@mui/material/ImageList'
import { Course } from '@/domain/courses'
import RenderIf from '@/presentation/components/helpers/render-if'
import { useDebouce } from '@/presentation/hooks/use-debounce'
import { useWidthFrom } from '@/presentation/hooks/use-width-from'
import { useCourses } from '@/presentation/providers'
import { arrayMap, setupCourses, setupDimensions } from './behavior'
import { MAX_COLUMNS } from './constants'
import ListItem from './list-item'
import { ListItemSkeleton } from './list-item-skeleton'

export interface Dimensions {
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

	const [thisIsMounted, setThisIsMounted] = useState(false)
	const [loading, setLoading] = useState(true)
	const [courses, setCourses] = useState<Course[]>([])

	// dimensions of the every course item
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: 150,
		height: 100
	})

	const debouncedMount = useDebouce(() => setThisIsMounted(true), 5)

	useEffect(() => {
		if (imageListRef.current) {
			const containerWidth = imageListRef.current.clientWidth
			lazyCalc(containerWidth)
			// that will debounce and only calls after the component is mounted
			debouncedMount()
		}
	}, [columns])

	useEffect(() => {
		if (imageListRef.current && thisIsMounted) {
			const containerWidth = imageListRef.current.clientWidth

			getCourses.execute(undefined, { items_per_page: columns })
				.then(
					setupCourses(setCourses, containerWidth, columns)
				).then(
					setupDimensions(setDimensions)
				).finally(() => setLoading(false))
		}
		// depends on thisIsMounted to be true
		// it grants only single call to getCourses
	}, [thisIsMounted])

	return (
		<ImageList
			ref={imageListRef}
			sx={{ width: '100%', transform: 'translateZ(0)', marginBottom: 2 }}
			gap={1}
			cols={columns}
		>
			<RenderIf condition={loading}>
				{arrayMap(columns, <ListItemSkeleton />)}
			</RenderIf>

			<RenderIf condition={!loading}>
				<Suspense fallback={<CircularProgress size={32} />}>
					{courses.map((course) => (
						<ListItem
							key={course.id}
							course={course}
							dimensions={dimensions}
						/>
					))}
				</Suspense>
			</RenderIf>
		</ImageList>
	)
}

export default Highlights
