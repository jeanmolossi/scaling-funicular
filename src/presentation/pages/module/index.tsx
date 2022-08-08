import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiLock, FiVideo } from 'react-icons/fi'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Module } from '@/domain/modules'
import { Section } from '@/domain/sections'
import RenderIf from '@/presentation/components/helpers/render-if'
import { useLazyMount } from '@/presentation/hooks/use-lazy-mount'
import { useModules } from '@/presentation/providers/modules'
import { useSections } from '@/presentation/providers/sections'

export const ModulePage = () => {
	const { module_id } = useParams()
	const { getModuleByID } = useModules()
	const { getSectionsFromModule, getLessonsFromSection } = useSections()

	const [currentModule, setCurrentModule] = useState<Module|null>(null)
	const [sections, setSections] = useState<Section[]>([])
	const [lessonsLoaded, setLessonsLoaded] = useState<boolean>(false)
	const [loading, setLoading] = useState(false)

	const { isMounted, debouncedMount } = useLazyMount()

	useEffect(() => {
		debouncedMount()
	}, [])

	useEffect(() => {
		if (isMounted && module_id) {
			getModuleByID.execute(module_id)
				.then(setCurrentModule)

			getSectionsFromModule.execute(module_id)
				.then(setSections)
		}
	}, [isMounted])

	useEffect(() => {
		if (sections.length > 0 && !lessonsLoaded) {
			const promises = sections.map(section =>
				getLessonsFromSection.execute(section.id)
			)

			setLoading(true)
			Promise.all(promises)
				.then((sectionsLessons) =>
					sectionsLessons.map((lessons, i) => {
						const sectionID = lessons[0]?.section_id
						const section = sections[i]

						if (section && section.id === sectionID) {
							section.attachLessons(lessons)
						}

						return section
					})
				)
				.then((updated) => {
					setSections(updated)
					setLessonsLoaded(true)
				})
				.finally(() => setLoading(false))
		}
	}, [sections, lessonsLoaded])

	return (
		<>
			<Outlet />
			<Stack p={2}>

				<RenderIf condition={!isMounted}>
					<CircularProgress />
				</RenderIf>

				<RenderIf condition={isMounted}>
					<Typography
						gutterBottom
						variant="h4"
						color="textSecondary"
					>
						{currentModule?.title}
					</Typography>

					<Stack>
						{sections.map(({ id, title, lessons }) => (
							<Accordion key={id}>
								<AccordionSummary expandIcon={<FiChevronDown />}>
									<Typography sx={{ width: '33%', flexShrink: 0 }} >{title}</Typography>
									<Typography sx={{ color: 'text.secondary' }}>
										<RenderIf condition={!loading}>
											{lessons.length > 0
												? `${lessons.length} aulas`
												: 'Nenhuma aula até o momento'
											}
										</RenderIf>

										<RenderIf condition={loading}>
											<CircularProgress />
										</RenderIf>
									</Typography>
								</AccordionSummary>

								<AccordionDetails>
									<Stack>
										{lessons.map(({ id: _id, title, hasVideo }) => {
											return (
												<Button
													key={_id}
													variant="contained"
													startIcon={!hasVideo ? <FiLock /> : <FiVideo />}
													component={Link}
													to={`lesson/${_id}`}
													disabled={!hasVideo}
												>
													{title}
												</Button>
											)
										})}
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
					</Stack>
				</RenderIf>
			</Stack>
		</>
	)
}
