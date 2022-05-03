import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grow from '@mui/material/Grow'

import ProjectComponent from '../../components/Projects'
import BreadcrumbComponent from '../../components/Breadcrumbs'
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import { getProjects } from '../../redux/actions/projects'
import { useTitle } from '../../utils';

const ProjectPage = () => {

    useTitle('Art-Sunday | Dự Án');

    const dispatch = useDispatch()

    const { projects, isLoading } = useSelector((state) => state.projects)

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    console.log('[ProjectPage]', projects)

    return (
        <Box sx={{ pt: 10 }}>
            <NavBar />
            <Grow in>
                <Container sx={{ marginY: 5, }} maxWidth={'xl'}>
                    <Box sx={{ mb: 2 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <ProjectComponent />
                </Container>
            </Grow>
            <AppFooter />
        </Box>
    )
}

export default ProjectPage