import React, { Suspense, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, LinearProgress } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { RouteConf } from '@/@shared/routes.config'
import { MenuProps } from '..'

const LazyMyAccount = React.lazy(() => import('./my-account'))

const SmallUp = ({ app, courses, mySection }: MenuProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement>(null!)

	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null!)
	}

	return (
		<Grid container item display={{ xs: 'column', sm: 'row' }} paddingX={2}>
			<Grid item>
				<h1>Logo</h1>
			</Grid>

			<Grid
				item
				flex={1}
				display={'flex'}
				flexWrap={'wrap'}
				gap={1}
				p={1}
				justifyContent={'strech'}
				alignItems={'center'}
				textAlign={'center'}
				maxHeight={'48px'}
				sx={{
					overflowY: 'hidden'
				}}
			>
				{LinksHandler([...app, ...courses])}
			</Grid>

			<Grid item display={'flex'} justifyContent={'stretch'}>
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

interface LinksHandlerConfig {
	maxButtons?: number;
}

function LinksHandler (links: RouteConf.App[], config: LinksHandlerConfig = {}) {
	const { maxButtons = 99 } = config

	const filterExcess = (_: RouteConf.App, i: number) => i < maxButtons

	const filtered = useMemo(() => links.filter(filterExcess), [links])

	return (
		<>
			{filtered.map((link) => (
				<Button
					sx={{ minWidth: 100, color: 'white' }}
					component={Link}
					to={link.to}
					key={link.id}
				>{link.label}</Button>
			))}
		</>
	)
}

export default SmallUp
