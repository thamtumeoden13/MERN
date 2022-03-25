import React from 'react'
import Box from '@mui/material/Box'

import Tours from '../../components/Tours'
import Container from '@mui/material/Container'

const TourPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <Container maxWidth='xl'> */}
            <Tours />
            {/* </Container> */}
        </Box>
    )
}

export default TourPage