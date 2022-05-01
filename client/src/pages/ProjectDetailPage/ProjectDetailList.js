import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import Grow from '@mui/material/Grow'

import ProjectDetailListComponent from '../../components/ProjectDetail/ProjectDetailList'
import BreadcrumbComponent from '../../components/Breadcrumbs';

import { getProjectDetails } from '../../redux/actions/projectDetails'

import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

const ProjectDetailListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [state, setState] = useState({
        title: 'Danh Sách Chi Tiết Dự Án'
    })

    useEffect(() => {
        dispatch(getProjectDetails())
    }, [dispatch])

    useEffect(() => {

        if (!!location && !!location.state) {
            console.log('[location.state]', location.state)
            const title = location.state.title || state.title
            console.log('[title]', title)
            setState({ ...state, title: `Danh Sách ${title}` })
        }
    }, [location])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Grow in>
                <Container maxWidth={'lg'} sx={{ minHeight: '100vh' }}>
                    <Box sx={{ marginY: 4 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            component="div"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {state.title}
                        </Typography>
                        <ProjectDetailListComponent onViewDetail={handleViewDetail} />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box >
    )
}

export default ProjectDetailListPage
