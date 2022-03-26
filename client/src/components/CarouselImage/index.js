import React, { useState } from "react";
import { Paper, Container, Typography, Grid, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import useStyle from './styles'

const images = [
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
]

export default function Test3() {

    const classes = useStyle()

    return (
        <Carousel
            className={classes.carousel}
            animation="fade"
            navButtonsAlwaysVisible
            autoPlay={true}
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