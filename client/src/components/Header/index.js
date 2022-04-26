import React from "react";
import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow';

import CarouselImage from '../CarouselImage'

import useStyle from './styles'
import MusicPlayerSlider from "../Musicplayer";

function Header() {

    const classes = useStyle()

    return (
        <Box className={classes.container}>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...{ timeout: 2000 }}
            >
                <Box style={{ position: 'absolute', left: 50, bottom: 50, zIndex: 20 }}>
                    <MusicPlayerSlider />
                </Box>
            </Grow>

            <CarouselImage />
        </Box>
    )
}

export default Header