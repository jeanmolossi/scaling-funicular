import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import Button from '@mui/joy/Button'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material'
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
	const { getSectionsFromModule } = useSections()

	const [currentModule, setCurrentModule] = useState<Module|null>(null)
	const [sections, setSections] = useState<Section[]>([])

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

	return (
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
									{lessons.length > 0
										? `${lessons.length} aulas`
										: 'Nenhuma aula até o momento'
									}
								</Typography>
							</AccordionSummary>

							<AccordionDetails>
								<Stack>
									{lessons.map(({ id: _id, title }) => (
										<Button key={_id}>{title}</Button>
									))}
								</Stack>
							</AccordionDetails>
						</Accordion>
					))}
				</Stack>
			</RenderIf>
		</Stack>
	)
}
