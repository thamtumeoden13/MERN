import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import Lazyload from 'react-lazyload';

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CircularProgress from '@mui/material/CircularProgress'
import FolderIcon from '@mui/icons-material/Folder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';

import { useTitle } from '../../../utils';
import useStyles from './styles'

const dataSource = [
	{
		name: 'investor',
		title: 'Chủ Đầu Tư',
	},
	{
		name: 'address',
		title: 'Địa Điểm',
	},
	{
		name: 'scale',
		title: 'Diện Tích',
	},
	{
		name: 'function',
		title: 'Quy Mô Dự Án',
	},
	{
		name: 'designTeam',
		title: 'Nhóm Thiết Kế',
	},
	{
		name: 'designYear',
		title: 'Năm Thiết Kế',
	},
	{
		name: 'estimatedTime',
		title: 'Thời Gian Hoàn Thiện',
	},
]

const ProjectGeneral = () => {
	const classes = useStyles()

	const { projectDetails, projectDetail, isLoading } = useSelector((state) => state.projectDetails)

	const [state, setState] = useState({
		title: '',
		createdAt: '',
		imageUrl: ''
	})
	const [data, setData] = useState([])

	console.log('[ProjectGeneral]', projectDetails, projectDetail)

	useTitle(projectDetail?.title || '');

	useEffect(() => {
		if (!!projectDetail && Object.keys(projectDetail).length > 0) {
			const data = dataSource.map(e => {
				return {
					name: e.name,
					title: e.title,
					value: projectDetail[e.name]
				}
			})
			// console.log('[data]', data)
			setData(data)
			setState({
				title: projectDetail.title,
				createdAt: moment(new Date(projectDetail.createdAt)).format('HH:MM MMM DD, YYYY'),
				imageUrl: projectDetail.imageUrl
			})
		}
	}, [projectDetail])

	if (!projectDetail || Object.keys(projectDetail).length <= 0) return null

	return (
		<Box>
			<Typography component='div' variant='h5' sx={{ mb: 2 }}>
				{state.title}
			</Typography>
			<Box sx={{ mt: 2, mb: 2 }}>
				<Breadcrumbs aria-label="breadcrumb" >
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ApartmentIcon fontSize='small' color='text.primary' sx={{ mr: 1 }} />
						<Typography color="text.primary">{`artsunday.vn`}</Typography>
					</Box>
					<Typography color="text.primary">{state.createdAt}</Typography>
					<Link
						underline="hover"
						sx={{ display: 'flex', alignItems: 'center' }}
						color="inherit"
						href="/"
					>
						<CommentIcon fontSize='small' color='primary' sx={{ mr: 1 }} />
						<Typography color="primary">{`Bình Luận`}</Typography>
					</Link>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<GroupIcon fontSize='small' color='text.primary' sx={{ mr: 1 }} />
						<Typography color="text.primary">{`100`}</Typography>
					</Box>
				</Breadcrumbs>
			</Box>
			<Box>
				<Card sx={{ display: 'flex', flexDirection: 'column', }}>
					<Lazyload placeholder={<CircularProgress />}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardMedia
								component='img'
								className={classes.cardImage}
								image={state.imageUrl}
								alt='portfolio image'
							/>
						</Box>
					</Lazyload>
					<Box sx={{
						display: 'flex', flexDirection: 'column',
						justifyContent: 'center',
					}}>
						<CardContent sx={{
							display: 'flex', flexDirection: 'column',
							flex: '1 0', justifyContent: 'space-between',
						}}>
							{data.map(e => {
								return (
									<Box key={e.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
										<Typography component="div" variant="subtitle1"
											sx={{ width: 160, fontWeight: 'bold' }}>
											{e.title}
										</Typography>
										<Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold' }} >
											&nbsp;{`:`}&nbsp;
										</Typography>
										<Typography variant="subtitle1" color="text.primary" component="div"
											sx={{ flex: 1, overflow: 'hidden', ml: 2 }}
										>
											{e.value}
										</Typography>
									</Box>
								)
							})}
						</CardContent>
					</Box>
				</Card>
			</Box>
		</Box>
	)
}

export default ProjectGeneral