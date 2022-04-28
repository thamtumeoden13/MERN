import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Container, Typography, Grid, Box, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
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
            NextIcon={<ArrowForwardIosIcon fontSize="large" />}
            PrevIcon={<ArrowBackIosNewIcon fontSize="large" />}
            className={classes.carousel}
            animation="fade"
            navButtonsAlwaysVisible
            stopAutoPlayOnHover
            autoPlay={true}
            fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: 'transparent',
                    borderRadius: 0
                }
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',
                    color: 'gray'
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: 'orange'
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '-50px',
                    textAlign: 'right',
                    zIndex: 10,
                    position: 'absolute'
                }
            }}
        >
            {images.map((item, i) => (
                <Box key={i} elevation={6} className={classes.carouselPaper}>
                    <img
                        src={item}
                        alt=""
                        className={classes.image}
                    />
                </Box>
            ))}
        </Carousel>
    );
}

export default CarouselImage