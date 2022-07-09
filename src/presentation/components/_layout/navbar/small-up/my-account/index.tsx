import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material'
import RenderIf from '@/presentation/components/helpers/render-if'
import { useAuth } from '@/presentation/providers'
import { MenuProps } from '../..'

interface MyAccountProps {
	anchorEl: HTMLElement | null
	onClose: () =>void;
	mySection: MenuProps['mySection']
}

const MyAccount = ({ anchorEl, onClose, mySection }: MyAccountProps) => {
	const { signout } = useAuth()
	const open = Boolean(anchorEl)

	return (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			onClose={onClose}
			onClick={onClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0
					}
				}
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<MenuItem component={Link} to="/dados-pessoais">
				<Avatar /> Dados pessoais
			</MenuItem>

			{mySection.map(({ to, label, icon: Icon, dividerBefore }, index) => (
				<MenuItem component={Link} to={to} key={index}>
					<RenderIf condition={!!dividerBefore}><Divider /></RenderIf>
					<ListItemIcon>
						<Icon />
					</ListItemIcon>
					{label}
				</MenuItem>
			))}

			<MenuItem onClick={signout}>
				<ListItemIcon>
					<Logout />
				</ListItemIcon>
				Sair
			</MenuItem>
		</Menu>
	)
}

export default MyAccount
