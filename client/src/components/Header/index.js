import React from "react";
import Box from '@mui/material/Box'

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