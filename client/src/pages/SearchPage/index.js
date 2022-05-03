import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import Grow from '@mui/material/Grow'

import BreadcrumbComponent from '../../components/Breadcrumbs';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';
import SearchList from '../../components/SearchList';

import { getProjectDetailSearchByName } from '../../redux/actions/projectDetails'

import { useQuery, useTitle } from '../../utils';

const ProjectDetailListPage = () => {

    useTitle('Art-Sunday | Danh Sách Chi Tiết Dự Án');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    useEffect(() => {
        if (!!searchQuery) {
            dispatch(getProjectDetailSearchByName(searchQuery))
        }
    }, [dispatch, searchQuery])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Grow in>
                <Container maxWidth={'xl'} sx={{ minHeight: '100vh' }}>
                    <Box sx={{ marginY: 4 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Box>
                        <SearchList onViewDetail={handleViewDetail} />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box >
    )
}

export default ProjectDetailListPage
