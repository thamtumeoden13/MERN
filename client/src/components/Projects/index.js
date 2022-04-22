import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import ProjectItem from './Project'

import projectData from '../../constants/favourite.json'

import useStyles from './styles'


const Projects = () => {

    return (
        <Grid container spacing={2}>
            {projectData.map((project, index) => {
                return (
                    <Grid item key={`item-${index}`} xs={12} sm={12} md={6} lg={3} >
                        <ProjectItem project={project} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Projects