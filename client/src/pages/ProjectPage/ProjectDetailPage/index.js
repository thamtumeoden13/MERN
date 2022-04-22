import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import ProjectDetailComponent from '../../../components/ProjectDetail'
import BreadcrumbComponent from '../../../components/Breadcrumbs'

const ProjectDetail = () => {
    return (
        <Box sx={{ mt: 15 }}>
            <Grow in>
                <Container maxWidth='xl'>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Box sx={{ mt: 2, minHeight: '100vh' }}>
                        <ProjectDetailComponent />
                    </Box>
                </Container>
            </Grow>
        </Box>
    )
}

export default ProjectDetail