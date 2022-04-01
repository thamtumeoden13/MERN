import React from 'react'
import Box from '@mui/material/Box'

import ProjectDetailComponent from '../../../components/ProjectDetail'
import BreadcrumbComponent from '../../../components/Breadcrumbs'

const ProjectDetail = () => {
    return (
        <Box sx={{ mt: 15 }}>
            <Box sx={{ mt: 2, mb: 2 }}>
                <BreadcrumbComponent />
            </Box>
            <Box sx={{ mt: 2, minHeight: '100vh' }}>
                <ProjectDetailComponent />
            </Box>
        </Box>
    )
}

export default ProjectDetail