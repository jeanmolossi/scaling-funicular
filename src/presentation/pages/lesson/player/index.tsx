import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider'
import Box from '@mui/material/Box'
import fallbackvideo from 'assets/videos/with-sound.mp4'

const Player = () => {
	return (
		<Box sx={{ position: 'relative', width: '100%', height: 'calc(100%-48px)' }}>
			<CssVarsProvider>
				<AspectRatio ratio="16/9" objectFit='cover' maxHeight={window.innerHeight - 48}>
					<video
						src={fallbackvideo}
						controls
						controlsList='nodownload'
					/>
				</AspectRatio>
			</CssVarsProvider>
		</Box>
	)
}

export default Player
