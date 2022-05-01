import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import Grow from '@mui/material/Grow'

import ProjectListComponent from '../../components/Projects/ProjectList'
import BreadcrumbComponent from '../../components/Breadcrumbs';

import { getProjects } from '../../redux/actions/projects'

import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

const ProjectListPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [state, setState] = useState({
        title: 'Danh Sách Dự Án'
    })

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    useEffect(() => {

        if (!!location && !!location.state) {
            console.log('[location.state]', location.state)
            const title = location.state.title || state.title
            console.log('[title]', title)
            setState({ ...state, title: `${title}` })
        }
    }, [location])

    const handleViewDetail = (item) => {
        console.log('[ProjectListPage-item]', item)
        navigate(`/danh-sach-du-an/${item._id}`, { state: { title: item.title } })
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
                        <ProjectListComponent onViewDetail={handleViewDetail} />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box >
    )
}

export default ProjectListPage
