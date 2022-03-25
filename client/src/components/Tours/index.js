import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import TourItem from './Tour'

import categories from '../../constants/tour.json'
import { Container } from '@mui/material'

const Tours = () => {

    return (
        <Container sx={{ marginY: 5 }}>
            {categories.map(category => {
                return (
                    <Box key={category.id}>
                        <Typography
                            variant='h4'
                            component='h2'
                            marginTop={5}
                            marginBottom={3}

                        >
                            {`Top ${category.name} Tours`}
                        </Typography>
                        <Grid container spacing={2}>
                            {category.tours.map(tour => {
                                return (
                                    <Grid key={tour.id} item xs={12} sm={12} md={6} lg={3} >
                                        <TourItem tour={tour} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                )
            })}
        </Container>
    )
}

export default Tours