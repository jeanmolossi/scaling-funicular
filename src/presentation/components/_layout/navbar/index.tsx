import React, { Suspense } from 'react'
import { IconType } from 'react-icons'
import { QuestionMarkRounded, School, ShoppingCartRounded, SvgIconComponent } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
import RenderIf from '@/presentation/components/helpers/render-if'
import { darkTheme } from '@/presentation/styles/theme'

const LazySmallUp = React.lazy(() => import('./small-up'))
const LazyDrawer = React.lazy(() => import('./drawer'))

export const Navbar = () => {
	const mediaMatch = useMediaQuery<typeof darkTheme>(
		(theme) => theme.breakpoints.up('sm')
	)

	return (
		<>
			<RenderIf condition={mediaMatch}>
				<Suspense>
					<LazySmallUp courses={courses} mySection={mySection} />
				</Suspense>
			</RenderIf>

			<RenderIf condition={!mediaMatch}>
				<Suspense>
					<LazyDrawer courses={courses} mySection={mySection} />
				</Suspense>
			</RenderIf>

		</>
	)
}

export type Section = {
	label: string;
	to: string;
	icon: IconType | SvgIconComponent;
	dividerBefore?: boolean
}

export const mySection: Section[] = [
	{
		label: 'Minhas compras',
		to: '/minhas-compras',
		icon: ShoppingCartRounded
	},
	{
		label: 'Ajuda',
		to: '/ajuda',
		icon: QuestionMarkRounded,
		dividerBefore: true
	}
]

export type Course = {
	id: string
	title: string
	to: string
	locked?: boolean
	icon: IconType | SvgIconComponent
}
const courses: Course[] = [
	{
		id: '1',
		to: '/course/1',
		title: 'Course 1',
		locked: false,
		icon: School
	},
	{
		id: '2',
		to: '/course/2',
		title: 'Course 2',
		locked: true,
		icon: School
	},
	{
		id: '3',
		to: '/course/3',
		title: 'Course 3',
		locked: true,
		icon: School
	},
	{
		id: '4',
		to: '/course/4',
		title: 'Course 4',
		locked: true,
		icon: School
	}
]

export interface MenuProps {
	mySection: Section[];
	courses: Course[];
}
