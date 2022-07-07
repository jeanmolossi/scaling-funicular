import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

export function Reset ({ children }: { children: React.ReactNode }) {
  return (
		<>
			<CssBaseline />
			{children}
		</>
  )
}
