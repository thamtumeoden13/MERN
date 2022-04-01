import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import ProjectComponent from '../../components/Projects'
import BreadcrumbComponent from '../../components/Breadcrumbs'

const Project = () => {
    return (
        <Box sx={{ mt: '100px' }}>
            <Box sx={{ pl: 2, mt: 2, mb: 2 }}>
                <BreadcrumbComponent />
            </Box>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                {`Project List`}
            </Typography>
            <ProjectComponent />
        </Box>
    )
}

export default Project