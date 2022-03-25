import React from 'react'
import { Container, Typography, Box, Grid } from '@mui/material'

import ImageQuilted from '../../../components/Tours/ImageQuilted'
import ControlledAccordions from '../../../components/Tours/ControlledAccordion'

const TourDetailPage = () => {

    return (
        <Container maxWidth='xl'>
            <Typography variant='h3' component='h1' marginTop={3}>
                {`Top Niagara Falls Tours`}
            </Typography>
            {/* <Box marginTop={3} sx={{ display: 'flex', alignItems: 'center' }}> */}
            <Grid container alignItems='center' spacing={1}>
                <Grid item xs={12} md={8} sm={6}>
                    <img
                        src='https://tcproduction.blob.core.windows.net/media/%7B240f8b72-1159-4fd3-a150-0a837f50ba4a%7D.2573758641_297d6d19fa_o.jpg'
                        alt=''
                        height={325}
                        width={'100%'}
                    />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    <ImageQuilted />
                </Grid>
            </Grid>
            {/* </Box> */}
            <Box>
                <Typography variant='h6' component='h4' marginTop={3}>
                    {`About this ticket`}
                </Typography>

                <Typography variant='paragraph' component='p' marginTop={3}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, ratione commodi voluptate vitae obcaecati consectetur molestias quaerat quod doloribus. Neque consequuntur accusantium voluptas! Nisi porro consectetur fuga maiores asperiores nulla.
                </Typography>
            </Box>
            <Box>
                <Typography variant='h6' component='h4' marginTop={3}>
                    {`Freequently Asked Question`}
                </Typography>

                <ControlledAccordions />
            </Box>
        </Container>
    )
}

export default TourDetailPage