import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useTheme } from '@mui/material/styles';

const ProjectAlbums = () => {
    const theme = useTheme();
    const navigate = useNavigate()

    const { projectDetails, projectDetailsByProjectID, projectDetailsByPortfolioID, isLoading } = useSelector((state) => state.projectDetails)
    const { project } = useSelector((state) => state.projects)
    const { portfolio } = useSelector((state) => state.portfolios)

    const [state, setState] = useState({
        title: '',
        data: []
    })

    console.log('[ProjectAlbums-projectDetailsByProjectID]', projectDetailsByProjectID)
    console.log('[ProjectAlbums-project]', project)

    useEffect(() => {
        if (!!project && !!projectDetailsByProjectID && projectDetailsByProjectID.length > 0) {
            setState({
                title: project.title,
                data: projectDetailsByProjectID
            })
            return
        }
        if (!!portfolio && !!projectDetailsByPortfolioID && projectDetailsByPortfolioID.length > 0) {
            setState({
                title: portfolio.title,
                data: projectDetailsByPortfolioID
            })
            return
        }
    }, [project, portfolio, projectDetails, projectDetailsByProjectID, projectDetailsByPortfolioID])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    if (!!isLoading) return null

    return (
        <>
            <Typography component={'div'} variant={'h6'}
                sx={{ m: 2, pl: 1, borderLeft: '5px solid orange' }}
            >
                {state.title}
            </Typography>
            <Container maxWidth='sm'>
                <Grid container spacing={1}>
                    {state.data.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <LazyLoad placeholder={<CircularProgress />} offset={100} once>
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
                            </LazyLoad>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default ProjectAlbums