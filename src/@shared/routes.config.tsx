import React from 'react'
import { IconType } from 'react-icons'
import { Home, QuestionMarkRounded, ShoppingCart, SvgIconComponent } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'

export namespace RouteConf {
	export interface User {
		id: string;
		label: string;
		to: string;
		icon: IconType | SvgIconComponent | React.ElementType;
	}

	export interface App extends User{}
}

export const appRoutes: RouteConf.App[] = [
	{
		id: window.crypto.randomUUID(),
		label: 'Início',
		to: '/browse',
		icon: Home
	}
]

export const sizedAvatar = (props: any) => <Avatar sx={{ width: 32, height: 32 }} {...props} />
export const userRoutes: RouteConf.User[] = [
	{
		id: window.crypto.randomUUID(),
		label: 'Dados pessoais',
		to: '/minha-conta/dados-pessoais',
		icon: sizedAvatar
	},
	{
		id: window.crypto.randomUUID(),
		label: 'Minhas compras',
		to: '/minha-conta/minhas-compras',
		icon: ShoppingCart
	},
	{
		id: window.crypto.randomUUID(),
		label: 'Ajuda',
		to: '/minha-conta/ajuda',
		icon: QuestionMarkRounded
	}
]
