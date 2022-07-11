import { styled } from '@mui/material'
import Box from '@mui/material/Box'

export const VideoWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: 'calc(100% - 48px)'
}))

export const MoreInfoOverlay = styled(Box)(({ theme }) => ({
	position: 'absolute',
	left: theme.spacing(3),
	top: '50%',
	width: 'clamp(10vw, 100%, 55vw)',
	display: 'flex',
	flexDirection: 'column',
	rowGap: theme.spacing(2)
}))
