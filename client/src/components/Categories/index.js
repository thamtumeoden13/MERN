import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import TourItem from './Category'

import categories from '../../constants/tour.json'

const Tours = () => {

    return (
        <Box>
            {categories.map(category => {
                return (
                    <Box key={category.id}>
                        <Typography
                            variant='h4'
                            component='h2'
                            marginBottom={2}
                        >
                            {`Top ${category.name} Tours`}
                        </Typography>
                        <Grid container spacing={2}>
                            {category.tours.map(tour => {
                                return (
                                    <Grid
                                        key={tour.id}
                                        item xs={12} sm={12} md={6} lg={3}
                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        <TourItem tour={tour} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                )
            })}
        </Box>
    )
}

export default Tours