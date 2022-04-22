import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grow from '@mui/material/Grow'

import ProjectComponent from '../../components/Projects'
import BreadcrumbComponent from '../../components/Breadcrumbs'

const Project = () => {
    return (
        <Box sx={{ mt: 15 }}>
            <Grow in>
                <Container sx={{ marginY: 5 }}>
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
                        {`Project List`}
                    </Typography>
                    <ProjectComponent />
                </Container>
            </Grow>
        </Box>
    )
}

export default Project