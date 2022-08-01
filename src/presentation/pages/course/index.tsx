import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material'
import { Card, CardActions, CardContent, Hidden, IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Module } from '@/domain/modules'
import { AuthLayout } from '@/presentation/components'
import RenderIf from '@/presentation/components/helpers/render-if'
import { useLazyMount } from '@/presentation/hooks/use-lazy-mount'
import { useWidthFrom } from '@/presentation/hooks/use-width-from'
import { useModules } from '@/presentation/providers/modules'
import { MAX_COLUMNS } from './constants'
import ModuleCard from './module-card'

export const Course = () => {
	const { course_id } = useParams()
	const { getModulesFromCourse } = useModules()
	const slideWrapperRef = useRef<HTMLElement>(null!)
	const sliderRef = useRef<Slider>(null!)

	const [withSlider, setWithSlider] = useState(false)
	const [modules, setModules] = useState<Module[]>([])
	const [, breakpoints, lazyCalc] = useWidthFrom(0)
	const { isMounted, debouncedMount } = useLazyMount()

	const { columns, toSlide } = useMemo(() => {
		const maxColumns = MAX_COLUMNS[breakpoints]
		const columns = Math.min(maxColumns, modules.length)
		const toSlide = columns - 1 > 0 ? columns - 1 : columns

		if (columns === maxColumns) {
			setWithSlider(true)
		}

		return { columns, toSlide }
	}, [breakpoints, modules])

	const sliderControls = useMemo(() => modules.length > 0 && withSlider, [modules, withSlider])

	const handleNext = useCallback(() => sliderRef.current?.slickNext(), [sliderRef.current])
	const handlePrev = useCallback(() => sliderRef.current?.slickPrev(), [sliderRef.current])

	useEffect(() => {
		if (slideWrapperRef.current) {
			const containerWidth = slideWrapperRef.current.clientWidth
			lazyCalc(containerWidth)
			debouncedMount()
		}
	}, [columns])

	useEffect(() => {
		if (course_id && isMounted) {
			getModulesFromCourse.execute(course_id)
				.then(setModules)
		}
	}, [isMounted, course_id])

	return (
		<AuthLayout>
			<Outlet />

			<Typography variant='h3' component={'h1'}>
				Veja os modulos do curso
			</Typography>

			<Stack ref={slideWrapperRef} width="100%" p={4} gap={2} alignItems={'stretch'}>
				<Card>
					<Stack direction="row" spacing={2}>
						<CardContent sx={{ flex: 1 }}>
							<Typography variant='h6' component="h2">
							Navege pelos modulos do curso
							</Typography>
						</CardContent>

						<RenderIf condition={sliderControls}>
							<CardActions>
								<IconButton onClick={handlePrev}><ChevronLeftOutlined /></IconButton>
								<IconButton onClick={handleNext}><ChevronRightOutlined /></IconButton>
							</CardActions>
						</RenderIf>
					</Stack>
				</Card>

				<RenderIf condition={sliderControls}>
					<Slider
						ref={sliderRef}
						dots={false}
						infinite
						speed={500}
						slidesToShow={columns}
						slidesToScroll={toSlide}
						lazyLoad="ondemand"
						nextArrow={<Hidden />}
						prevArrow={<Hidden />}
					>
						{modules.map(module => (
							<ModuleCard key={module.id} module={module} />
						))}
					</Slider>
				</RenderIf>

				<RenderIf condition={modules.length > 0 && !withSlider}>
					<Stack direction={'row'} alignItems={'stretch'} alignContent={'stretch'}>
						{modules.map(module => (
							<ModuleCard key={module.id} module={module} />
						))}
					</Stack>
				</RenderIf>
			</Stack>
		</AuthLayout>
	)
}
