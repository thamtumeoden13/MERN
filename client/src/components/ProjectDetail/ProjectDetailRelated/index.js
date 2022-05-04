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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import CardList from '../../CardList';

const ProjectAlbums = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { projectDetails, projectDetailsByProjectID, projectDetailsByPortfolioID, isLoading } = useSelector((state) => state.projectDetails)
    const { project } = useSelector((state) => state.projects)
    const { portfolio } = useSelector((state) => state.portfolios)

    const [state, setState] = useState({
        title: '',
        dataRelated: [],
    })

    useEffect(() => {
        if (!!portfolio && !!projectDetailsByPortfolioID && projectDetailsByPortfolioID.length > 0) {
            const dataRelated = projectDetailsByPortfolioID.slice(0, 8)
            setState(prev => {
                return {
                    ...prev,
                    dataRelated: dataRelated
                }
            })
            return
        }
    }, [projectDetailsByPortfolioID])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }
    // console.log('[dataRelated]', state.dataRelated)

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant={'h5'} component={'div'}
                sx={{ mb: 2, pl: 1, borderLeft: '5px solid orange' }}
            >
                {`DỰ ÁN LIÊN QUAN`}
            </Typography>
            <CardList
                data={state.dataRelated}
                onViewDetail={handleViewDetail}
            />
        </Box>
    )
}

export default ProjectAlbums