import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import ProjectDetailComponent from '../../components/ProjectDetail'
import BreadcrumbComponent from '../../components/Breadcrumbs'
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import { getProjectDetail, getProjectDetailsByProjectID, getProjectDetailsByPortfolioID } from '../../redux/actions/projectDetails'
import { getProject } from '../../redux/actions/projects'
import { getPortfolio } from '../../redux/actions/portfolios'

const ProjectDetail = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { projectDetail, isLoading } = useSelector((state) => state.projectDetails)
    console.log('[ProjectDetail-id]', id)
    useEffect(() => {
        if (id) {
            dispatch(getProjectDetail(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (!!projectDetail && Object.keys(projectDetail).length > 0) {

            dispatch(getProjectDetailsByPortfolioID(projectDetail.portfolio))
            dispatch(getPortfolio(projectDetail.portfolio))

            dispatch(getProjectDetailsByProjectID(projectDetail.project))
            dispatch(getProject(projectDetail.project))

        }
    }, [dispatch, projectDetail])
    console.log('[ProjectDetail-projectDetail]', projectDetail)

    return (
        <Box sx={{ pt: 10 }}>
            <NavBar />
            <Grow in>
                <Container maxWidth='xl' sx={{ pt: 2 }}>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Box sx={{ mt: 2, minHeight: '100vh' }}>
                        <ProjectDetailComponent />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box>
    )
}

export default ProjectDetail