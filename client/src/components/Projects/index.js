import React from 'react'
import { useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import ProjectItem from './Project'

import projectData from '../../constants/favourite.json'

import useStyles from './styles'


const Projects = () => {

    return (
        <Grid container spacing={2}>
            {projectData.map((project, index) => {
                return (
                    <Grid item key={`item-${index}`} xs={12} sm={12} md={6} lg={3} >
                        <LazyLoad placeholder={<CircularProgress />} offset={100} once>
                            <ProjectItem project={project} />
                        </LazyLoad>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Projects