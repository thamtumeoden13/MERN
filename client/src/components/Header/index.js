import React from "react";
import { Typography, Box } from '@mui/material'

import CarouselImage from '../CarouselImage'

import useStyle from './styles'

function Header() {

    const classes = useStyle()

    return (
        <Box className={classes.container}>
            {/* <Typography variant="h1" component='h1' align="center" >
                Blog
            </Typography> */}
            <CarouselImage />
        </Box>
    )
}

export default Header