import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LazyLoad from 'react-lazyload'
import moment from 'moment'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ProjectAlbums = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)

    const [state, setState] = useState({
        dataVilla: [],
        dataTownHouse: [],
        dataFurniture: [],
    })

    useEffect(() => {
        if (!!projectDetails) {
            // console.log('[projectDetails]', projectDetails)
            const dataVilla = projectDetails.filter(e => e.portfolioName == 'biet-thu')
            const dataTownHouse = projectDetails.filter(e => e.portfolioName == 'nha-pho')
            const dataFurniture = projectDetails.filter(e => e.portfolioName == 'noi-that')

            const dataVillaSlice = dataVilla.slice(0, 5)
            const dataTownHouseSlice = dataTownHouse.slice(0, 5)
            const dataFurnitureSlice = dataFurniture.slice(0, 5)

            // console.log('[dataVilla,dataTownHouse,dataFurniture]', dataVilla, dataTownHouse, dataFurniture)
            // console.log('[dataVillaSlice,dataTownHouseSlice,dataFurnitureSlice]', dataVillaSlice, dataTownHouseSlice, dataFurnitureSlice)
            setState(prev => {
                return {
                    ...prev,
                    dataVilla: dataVillaSlice,
                    dataTownHouse: dataTownHouseSlice,
                    dataFurniture: dataFurnitureSlice,
                }
            })
        }
    }, [projectDetails])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    // console.log('[ProjectAlbum-state]', state)

    if (!!isLoading) return null

    return (
        <Container >
            <Grid container >
                {!!state.dataVilla &&
                    <Box sx={{ mb: 10 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 1, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Biệt Thự`}
                        </Typography>
                        {state.dataVilla.map((item, index) => (
                            <Grid item xs={12} key={`dataVillaItem-${index}`} sx={{ mb: 1 }}>
                                <LazyLoad placeholder={<CircularProgress />} offset={100} once>
                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {... { timeout: 500 + index * 500 }}
                                    >
                                        <Card sx={{ display: 'flex' }} onClick={() => handleViewDetail(item)}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 120, }}
                                                image={item.thumbnail}
                                                alt="thumbnail"
                                            />
                                            <Box sx={{
                                                display: 'flex', flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}>
                                                <CardContent sx={{
                                                    display: 'flex', flexDirection: 'column',
                                                    flex: '1 0', justifyContent: 'space-between',
                                                }}>
                                                    <Typography component="div" variant="body1" sx={{ maxHeight: 70, overflow: 'hidden' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                        {moment(new Date(item.createdAt)).format('HH:MM MMM DD, YYYY')}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ paddingY: 0, display: 'flex', justifyContent: 'flex-end' }}   >
                                                    <IconButton aria-label="add to favorites" style={{ padding: '0 0' }}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grow>
                                </LazyLoad>
                            </Grid>
                        ))}
                    </Box>
                }
                {!!state.dataFurniture &&
                    <Box sx={{ mb: 10 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 1, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Nội Thất`}
                        </Typography>
                        {state.dataFurniture.map((item, index) => (
                            <Grid item xs={12} key={`dataFurniture-${index}`} spacing={2} sx={{ mb: 1 }}>
                                <LazyLoad placeholder={<CircularProgress />} offset={100} once>
                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {... { timeout: 500 + index * 500 }}
                                    >
                                        <Card sx={{ display: 'flex' }} onClick={() => handleViewDetail(item)}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 120, }}
                                                image={item.thumbnail}
                                                alt="thumbnail"
                                            />
                                            <Box sx={{
                                                display: 'flex', flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}>
                                                <CardContent sx={{
                                                    display: 'flex', flexDirection: 'column',
                                                    flex: '1 0', justifyContent: 'space-between',
                                                }}>
                                                    <Typography component="div" variant="body1" sx={{ maxHeight: 70, overflow: 'hidden' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                        {moment(new Date(item.createdAt)).format('HH:MM MMM DD, YYYY')}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ paddingY: 0, display: 'flex', justifyContent: 'flex-end' }}   >
                                                    <IconButton aria-label="add to favorites" style={{ padding: '0 0' }}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grow>
                                </LazyLoad>
                            </Grid>
                        ))}
                    </Box>
                }
                {!!state.dataTownHouse &&
                    <Box sx={{ mb: 10 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 1, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Nhà Phố`}
                        </Typography>
                        {state.dataTownHouse.map((item, index) => (
                            <Grid item xs={12} key={`dataTownHouse-${index}`} spacing={2} sx={{ mb: 1 }}>
                                <LazyLoad placeholder={<CircularProgress />} offset={100} once>
                                    <Grow
                                        in={true}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {... { timeout: 500 + index * 500 }}
                                    >
                                        <Card sx={{ display: 'flex' }} onClick={() => handleViewDetail(item)}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 120, }}
                                                image={item.thumbnail}
                                                alt="thumbnail"
                                            />
                                            <Box sx={{
                                                display: 'flex', flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}>
                                                <CardContent sx={{
                                                    display: 'flex', flexDirection: 'column',
                                                    flex: '1 0', justifyContent: 'space-between',
                                                }}>
                                                    <Typography component="div" variant="body1" sx={{ maxHeight: 70, overflow: 'hidden' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" component="div" >
                                                        {moment(new Date(item.createdAt)).format('HH:MM MMM DD, YYYY')}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{ paddingY: 0, display: 'flex', justifyContent: 'flex-end' }}   >
                                                    <IconButton aria-label="add to favorites" style={{ padding: '0 0' }}>
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grow>
                                </LazyLoad>
                            </Grid>
                        ))}
                    </Box>
                }
            </Grid>
        </Container>
    )
}

export default ProjectAlbums