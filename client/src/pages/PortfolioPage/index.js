import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Portfolios from '../../components/Portfolios'
import QuiltedImageList from '../../components/common/Imagelist/ImageQuilted'
import BreadcrumbComponent from '../../components/Breadcrumbs';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import {
    getProjectDetails, getProjectDetail,
    getProjectDetailsByPortfolioID, getProjectDetailsByProjectID,
    getProjectDetailSearchByPortfolioName,
    getProjectDetailSearchByProjectName
} from '../../redux/actions/projectDetails'

import { useQuery } from '../../utils';

const PortfolioPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const searchQueryPortfolioName = query.get('portfolioname')
    const searchQueryprojectName = query.get('projectname')

    const { id, projectID, projectDetailID } = useParams()
    console.log('[id, projectID, projectDetailID]', id, projectID, projectDetailID)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!!id) {
            dispatch(getProjectDetail(id))
            return
        }

        if (!!projectID) {
            dispatch(getProjectDetailsByPortfolioID(projectID))
            return
        }

        if (!!projectDetailID) {
            dispatch(getProjectDetailsByProjectID(projectDetailID))
            return
        }
    }, [dispatch, id, projectID, projectDetailID])

    useEffect(() => {
        if (!!searchQueryPortfolioName) {
            dispatch(getProjectDetailSearchByPortfolioName(searchQueryPortfolioName))
            return
        }
        if (!!searchQueryprojectName) {
            dispatch(getProjectDetailSearchByProjectName(searchQueryprojectName))
            return
        }
        dispatch(getProjectDetails())
    }, [dispatch, searchQueryPortfolioName, searchQueryprojectName])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    const handleChangeValue = (event) => {
        console.log('[handleChangeValue]', event.target.value)
        setSearch(event.target.value)
    }

    const handleSearch = () => {
        console.log('[handleSearch]')
    }

    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Container maxWidth={'lg'} sx={{ minHeight: '100vh' }}>
                <Box>
                    <QuiltedImageList data={data} />
                </Box>
                <Box sx={{ marginY: 4 }}>
                    <BreadcrumbComponent />
                </Box>
                <Box>
                    <Grid container spacing={3} sx={{ minHeight: '100vh' }}>
                        <Box sx={{
                            display: { xs: 'none', sm: 'none', md: 'flex' }, flexDirection: 'column',
                            padding: 2,
                        }}>
                            <Grid item md={3}>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">{`Tìm kiếm`}</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={search}
                                        onChange={handleChangeValue}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleSearch}
                                                    edge="end"
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Tìm kiếm..."
                                        placeholder='Nhập tên dự án...'
                                    />
                                </FormControl>
                            </Grid>
                        </Box>
                        <Grid item xs={12} sm={12} md={9}>
                            <Portfolios onViewDetail={handleViewDetail} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <AppFooter />
        </Box >
    )
}

export default PortfolioPage

const data = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];