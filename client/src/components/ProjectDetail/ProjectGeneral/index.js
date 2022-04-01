import React from 'react'
import moment from 'moment';

import  Card from '@mui/material/Card'
import  CardContent from '@mui/material/CardContent'
import  CardMedia from '@mui/material/CardMedia'
import  Box from '@mui/material/Box'
import  Typography from '@mui/material/Typography'
import  Link from '@mui/material/Link'
import  Breadcrumbs from '@mui/material/Breadcrumbs'
import FolderIcon from '@mui/icons-material/Folder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';

const ProjectGeneral = () => {
	return (
		<>
			<Typography component='div' variant='h5' sx={{ mb: 2 }}>
				{`Mẫu Thiết Kế Nhà Phố 4x16m 3 Tầng Hiện Đại Tại Tp. Hồ Chí Minh – NP04`}
			</Typography>

			<Breadcrumbs aria-label="breadcrumb" >
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<FolderIcon fontSize='small' color='primary' sx={{ mr: 1 }} />
					<Typography color="primary">{`Thiết Kế Nhà Phố`}</Typography>
				</Box>
				<Typography color="primary">{`Nhà Phố 3 Tầng`}</Typography>
				<Typography color="primary">{`Nhà Phố Hiện Đại`}</Typography>
			</Breadcrumbs>
			<Box sx={{ mt: 2, mb: 2 }}>
				<Breadcrumbs aria-label="breadcrumb" >
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ApartmentIcon fontSize='small' color='text.primary' sx={{ mr: 1 }} />
						<Typography color="text.primary">{`SundayTV.vn`}</Typography>
					</Box>
					<Typography color="text.primary">{moment(new Date()).format('HH:MM MMM DD, YYYY')}</Typography>
					<Link
						underline="hover"
						sx={{ display: 'flex', alignItems: 'center' }}
						color="inherit"
						href="/"
					>
						<CommentIcon fontSize='small' color='primary' sx={{ mr: 1 }} />
						<Typography color="primary">Breadcrumbs</Typography>
					</Link>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<GroupIcon fontSize='small' color='text.primary' sx={{ mr: 1 }} />
						<Typography color="text.primary">Breadcrumbs</Typography>
					</Box>
				</Breadcrumbs>
			</Box>
			<Box>
				<Card sx={{ display: 'flex', flexDirection: 'column', }}>
					<CardMedia
						component='img'
						height='500'
						image='https://images.pexels.com/photos/7363949/pexels-photo-7363949.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt='image'
					/>
					<Box sx={{
						display: 'flex', flexDirection: 'column',
						justifyContent: 'center',
					}}>
						<CardContent sx={{
							display: 'flex', flexDirection: 'column',
							flex: '1 0', justifyContent: 'space-between',
						}}>
							{
								[1, 2, 3, 4, 5, 6, 7].map(e => (
									<Box key={e} sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography component="div" variant="subtitle1"
											sx={{ width: 160, fontWeight: 'bold' }}>
											{`Địa điểm`}
										</Typography>
										<Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }} >
											&nbsp;{`:`}&nbsp;
										</Typography>
										<Typography variant="subtitle1" color="text.secondary" component="div"
											sx={{ flex: 1, overflow: 'hidden' }} >
											{` ${moment(new Date()).format('HH:MM MMM DD, YYYY')}`}
										</Typography>
									</Box>
								))
							}
						</CardContent>
					</Box>
				</Card>
			</Box>
		</>
	)
}

export default ProjectGeneral