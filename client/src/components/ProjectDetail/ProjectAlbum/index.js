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

import CardListVertical from '../../CardListVertical';

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
                    <Box sx={{ mb: 4 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 2, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Biệt Thự`}
                        </Typography>
                        <Box>
                            <CardListVertical
                                data={state.dataVilla}
                                onViewDetail={handleViewDetail}
                            />
                        </Box>
                    </Box>
                }
                {!!state.dataFurniture &&
                    <Box sx={{ mb: 4 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 2, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Nội Thất`}
                        </Typography>
                        <Box>
                            <CardListVertical
                                data={state.dataFurniture}
                                onViewDetail={handleViewDetail}
                            />
                        </Box>
                    </Box>
                }
                {!!state.dataTownHouse &&
                    <Box sx={{ mb: 4 }}>
                        <Typography variant={'h5'} component={'div'}
                            sx={{ mb: 2, pl: 1, borderLeft: '5px solid orange' }}
                        >
                            {`Nhà Phố`}
                        </Typography>
                        <Box>
                            <CardListVertical
                                data={state.dataTownHouse}
                                onViewDetail={handleViewDetail}
                            />
                        </Box>
                    </Box>
                }
            </Grid>
        </Container>
    )
}

export default ProjectAlbums