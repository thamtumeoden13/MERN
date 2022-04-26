import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { useTheme } from '@mui/material/styles';

const ProjectAlbums = () => {
    const theme = useTheme();

    const { projectDetailsByProjectID, projectDetailsByPortfolioID, isLoading } = useSelector((state) => state.projectDetails)
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
    }, [project, portfolio, projectDetailsByProjectID, projectDetailsByPortfolioID])

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
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 120, resize: 'contain' }}
                                    // width='120'
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
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default ProjectAlbums