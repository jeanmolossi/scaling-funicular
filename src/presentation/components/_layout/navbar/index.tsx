import React, { Suspense } from 'react'
import { School } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { appRoutes, RouteConf, userRoutes } from '@/@shared/routes.config'
import RenderIf from '@/presentation/components/helpers/render-if'
import { darkTheme } from '@/presentation/styles/theme'

const LazySmallUp = React.lazy(() => import('./small-up'))
const LazyDrawer = React.lazy(() => import('./drawer'))

// TODO: refactor this component
// Better option in
// 	https://mui.com/pt/material-ui/react-app-bar/#responsive-app-bar-with-drawer
export const Navbar = () => {
	const mediaMatch = useMediaQuery<typeof darkTheme>(
		(theme) => theme.breakpoints.up('sm')
	)

	return (
		<>
			<RenderIf condition={mediaMatch}>
				<Suspense>
					<LazySmallUp app={appRoutes} courses={courses} mySection={userRoutes} />
				</Suspense>
			</RenderIf>

			<RenderIf condition={!mediaMatch}>
				<Suspense>
					<LazyDrawer app={appRoutes} courses={courses} mySection={userRoutes} />
				</Suspense>
			</RenderIf>

		</>
	)
}

const courses: RouteConf.App[] = [
	{
		id: '1',
		to: '/course/1',
		label: 'Course 1',
		icon: School
	},
	{
		id: '2',
		to: '/course/2',
		label: 'Course 2',
		icon: School
	},
	{
		id: '3',
		to: '/course/3',
		label: 'Course 3',
		icon: School
	},
	{
		id: '4',
		to: '/course/4',
		label: 'Course 4',
		icon: School
	},
	{
		id: '5',
		to: '/course/5',
		label: 'Course 5',
		icon: School
	},
	{
		id: '6',
		to: '/course/6',
		label: 'Course 6',
		icon: School
	},
	{
		id: '7',
		to: '/course/7',
		label: 'Course 7',
		icon: School
	},
	{
		id: '8',
		to: '/course/8',
		label: 'Course 8',
		icon: School
	},
	{
		id: '9',
		to: '/course/9',
		label: 'Course 9',
		icon: School
	},
	{
		id: '10',
		to: '/course/10',
		label: 'Course 10',
		icon: School
	},
	{
		id: '11',
		to: '/course/11',
		label: 'Course 11',
		icon: School
	}
]

export interface MenuProps {
	app: RouteConf.App[];
	mySection: RouteConf.User[];
	courses: RouteConf.App[];
}
