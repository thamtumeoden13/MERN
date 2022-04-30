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

const ProjectPage = () => {

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
                <Container sx={{ marginY: 5, }}>
                    <Box sx={{ mb: 2 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {`Danh Sách Dự Án`}
                    </Typography>
                    <ProjectComponent />
                </Container>
            </Grow>
            <AppFooter />
        </Box>
    )
}

export default ProjectPage