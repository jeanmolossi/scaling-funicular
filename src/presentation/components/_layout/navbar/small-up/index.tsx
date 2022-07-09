import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Button, LinearProgress } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { MenuProps } from '..'

const LazyMyAccount = React.lazy(() => import('./my-account'))

const SmallUp = ({ courses, mySection }: MenuProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Grid container item display={{ xs: 'column', sm: 'row' }}>
			<Grid item>
				<h1>Logo</h1>
			</Grid>

			<Grid
				item
				flex={1}
				display={'flex'}
				justifyContent={'space-around'}
				alignItems={'center'}
				textAlign={'center'}
			>
				<Button sx={{ minWidth: 100, color: 'white' }} component={Link} to="/browse">
					Início
				</Button>

				{courses.map((course) => (
					<Button
						sx={{ minWidth: 100, color: 'white' }}
						component={Link}
						to={course.to}
						key={course.id}
					>{course.title}</Button>
				))}
			</Grid>

			<Grid item flex={0.15}>
				<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
					<Tooltip title="Minha conta">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup
						>
							<Avatar sx={{ width: 32, height: 32 }}>
								<img src="https://via.placeholder.com/32x32" alt="avatar" />
							</Avatar>
						</IconButton>
					</Tooltip>
				</Box>

				<Suspense fallback={<LinearProgress sx={{ top: 0, left: 0, right: 0, position: 'fixed', opacity: 0.5 }} />}>
					<LazyMyAccount anchorEl={anchorEl} onClose={handleClose} mySection={mySection} />
				</Suspense>
			</Grid>
		</Grid>
	)
}

export default SmallUp
