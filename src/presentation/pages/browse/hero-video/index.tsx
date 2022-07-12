import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Info, PlayCircle } from '@mui/icons-material'
import AspectRatio from '@mui/joy/AspectRatio'
import { CssVarsProvider } from '@mui/joy/styles'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useModal } from '@/presentation/hooks/use-modal'
import { MoreInfoOverlay, VideoWrapper } from './styles'
import fallbackvideo from 'assets/videos/with-sound.mp4'

const HeroVideo = () => {
	const { onClick } = useModal({ to: '/browse/about/1' })

	return (
		<VideoWrapper>
			<CssVarsProvider>
				<AspectRatio ratio="16/9" objectFit='cover' maxHeight={window.innerHeight - 48}>
					<Suspense fallback={'loading'}>
						<video
							src={fallbackvideo}
							muted
							autoPlay
							loop
						/>
					</Suspense>
				</AspectRatio>
			</CssVarsProvider>

			<MoreInfoOverlay>
				<Typography
					variant={'h1'}
					fontWeight={'bold'}
					fontSize={{
						md: '3rem',
						lg: '4rem',
						xl: '5rem'
					}}
					display={{
						xs: 'none',
						md: 'block'
					}}
					color="AppWorkspace"
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						textShadow: '0 4px 4px black'
					}}
				>
					#5 - Javascript e o this.
				</Typography>
				<Typography
					variant='h3'
					color="Highlight"
					fontSize={'2rem'}
					display={{
						xs: 'none',
						md: 'block'
					}}
					sx={{ textShadow: '0 2px 4px black' }}
				>
					Nesta aula, vamos aprender como utilizar o this em Javascript.
				</Typography>

				<Box display={{ xs: 'none', md: 'flex' }} gap={1}>
					<Button
						size="large"
						variant='contained'
						startIcon={<PlayCircle />}
						component={Link}
						to="/course/1/lesson/1"
						sx={{ backgroundColor: 'grey.800' }}
					>Continuar</Button>
					<Button
						size="large"
						variant='contained'
						startIcon={<Info />}
						component={'a'}
						onClick={onClick}
						sx={{ backgroundColor: 'grey.800' }}
					>Mais detalhes</Button>
				</Box>
			</MoreInfoOverlay>
		</VideoWrapper>
	)
}

export default HeroVideo
