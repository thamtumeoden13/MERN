import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import Grow from '@mui/material/Grow'

import ProjectListComponent from '../../components/Projects/ProjectList'
import BreadcrumbComponent from '../../components/Breadcrumbs';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import { getPortfolios } from '../../redux/actions/portfolios'
import { getProjects } from '../../redux/actions/projects'

import { useTitle } from '../../utils';

const ProjectListPage = () => {

    useTitle('Art-Sunday | Danh Sách Dự Án');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = useParams()


    useEffect(() => {
        dispatch(getPortfolios())
        dispatch(getProjects())
    }, [dispatch])


    const handleViewDetail = (item) => {
        // console.log('[ProjectListPage-item]', item)
        navigate(`/danh-sach-du-an/${item._id}`)
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
                        <ProjectListComponent onViewDetail={handleViewDetail} />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box >
    )
}

export default ProjectListPage
