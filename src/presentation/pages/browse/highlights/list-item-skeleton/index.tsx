import * as React from 'react'
import { Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Skeleton from '@mui/material/Skeleton'

export function ListItemSkeleton () {
	return (
		<Paper>
			<ImageListItem >
				<Skeleton
					sx={{ width: '100%', height: 164 }}
					variant="rectangular"
					animation="wave"
				/>

				<ImageListItemBar
					title={<Skeleton animation="wave" variant="text" />}
					subtitle={<Skeleton animation="wave" variant="text" />}
					position='bottom'
					actionIcon={
						<IconButton>
							<Skeleton animation="wave" variant='circular' width={40} height={40} />
						</IconButton>
					}
					actionPosition="left"
				/>
			</ImageListItem>

		</Paper>
	)
}
