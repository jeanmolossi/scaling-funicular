import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dehaze, Home, Logout } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useAuth } from '@/presentation/providers'
import ListItemText from '@mui/material/ListItemText'
import { MenuProps } from '..'

const DrawerMenu = ({ courses, mySection }: MenuProps) => {
	const { signout } = useAuth()
	const [open, setOpen] = useState(false)

	const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
			(event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}

		setOpen(!open)
	}

	return (
		<React.Fragment>
			<Button onClick={toggleDrawer}>
				<Dehaze sx={{ color: 'whitesmoke' }} />
			</Button>
			<Drawer
				anchor={'right'}
				open={open}
				onClose={toggleDrawer}
			>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer}
					onKeyDown={toggleDrawer}
				>
					<List>
						<ListItem disablePadding>
							<ListItemButton LinkComponent={Link} href={'/browse'}>
								<ListItemIcon><Home /></ListItemIcon>
								<ListItemText primary={'Inicio'} />
							</ListItemButton>
						</ListItem>
					</List>

					<Divider />

					<List>
						{courses.map(({ id, title, icon: Icon }) => (
							<ListItem key={id} disablePadding>
								<ListItemButton>
									<ListItemIcon><Icon /></ListItemIcon>
									<ListItemText primary={title} />
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Divider />

					<List>
						<ListItem disablePadding>
							<ListItemButton component={Link} to={'/dados-pessoais'}>
								<ListItemIcon><Avatar sx={{ width: 32, height: 32 }} /></ListItemIcon>
								<ListItemText primary={'Dados pessoais'} />
							</ListItemButton>
						</ListItem>

						{mySection.map(({ to, label, icon: Icon }, index) => (
							<ListItem key={index} disablePadding>
								<ListItemButton LinkComponent={Link} href={to}>
									<ListItemIcon><Icon /></ListItemIcon>
									<ListItemText primary={label} />
								</ListItemButton>
							</ListItem>
						))}

						<ListItem disablePadding>
							<ListItemButton onClick={signout}>
								<ListItemIcon><Logout /></ListItemIcon>
								<ListItemText primary={'Sair'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</React.Fragment>
	)
}

export default DrawerMenu
