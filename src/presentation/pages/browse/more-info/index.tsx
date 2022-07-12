import React from 'react'
import { Fade, useMediaQuery, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import { TransitionProps } from '@mui/material/transitions'
import { useModal } from '@/presentation/hooks/use-modal'

export const MoreInfo = () => {
	const theme = useTheme()
	const { onClose } = useModal({ to: '/browse' })
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Dialog
			open
			scroll="paper"
			onClose={onClose}
			PaperComponent={Paper}
			TransitionComponent={Transition}
			fullScreen={fullScreen}
			aria-labelledby="Mais detalhes sobre o módulo"
			aria-describedby="Confira as aulas do módulo"
		>
			<DialogTitle id="Mais detalhes sobre o módulo">Mais detalhes</DialogTitle>

			<DialogContent dividers>
				<DialogContentText
					id="Confira as aulas do módulo"
					tabIndex={-1}
				>
					Videos listing
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} variant='outlined' color="inherit">Fechar</Button>
				<Button onClick={onClose} variant='contained' color="primary">Ver modulo</Button>
			</DialogActions>
		</Dialog>
	)
}

const Transition = React.forwardRef(function Transition (
	props: TransitionProps & { children: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Fade ref={ref} {...props} />
})
