import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import PortfolioItem from './Portfolio'

import projectData from '../../constants/favourite.json'

import useStyles from './styles'

const Portfolios = () => {

    return (
        <Container>
            <Grid container spacing={2}>
                {projectData.map((project, index) => {
                    return (
                        <Grid item key={`item-${index}`} xs={12} sm={12} md={6} lg={4} >
                            <PortfolioItem project={project} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container >
    )
}

export default Portfolios