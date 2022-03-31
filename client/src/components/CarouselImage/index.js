import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Container, Typography, Grid, Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import useStyle from './styles'

const images = [
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
]

const CarouselImage = () => {
    const classes = useStyle()

    return (
        <Carousel
            className={classes.carousel}
            animation="fade"
            navButtonsAlwaysVisible
            stopAutoPlayOnHover
            autoPlay={true}
            NextIcon={<ArrowForwardIosIcon fontSize="large" />}
            PrevIcon={<ArrowBackIosNewIcon fontSize="large" />}
        >
            {
                images.map((item, i) => (
                    <Box key={i} elevation={6} className={classes.carouselPaper}>
                        <img
                            src={item}
                            alt=""
                            className={classes.image}
                        />
                    </Box>
                ))
            }
        </Carousel>
    );
}

export default CarouselImage