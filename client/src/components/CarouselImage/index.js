import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import useStyle from './styles'

import CardAnimation from '../CardAnimation'

const CarouselImage = ({ data = [], onViewDetail }) => {
    const classes = useStyle()

    const [state, setState] = useState({
        data: [],
        itemSelected: null,
    })

    useEffect(() => {
        setState(prev => {
            return {
                ...prev,
                data: data || [],
                itemSelected: !!data && data.length > 0 ? data[0] : null
            }
        })
    }, [data])

    const handleChange = (now, previous) => {
        console.log('[handlechange-image]', now, previous)
        setState(prev => { return { ...prev, itemSelected: null } })
        setTimeout(() => {
            setState(prev => { return { ...prev, itemSelected: state.data[now] } })
        }, 500);
    }

    const handleViewDetail = (route) => {
        if (onViewDetail) {
            onViewDetail(route)
        }
    }

    const renderItem = () => {

        return (
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...{ timeout: 1000 }}
            >
                <Box style={{ position: 'absolute', zIndex: 20 }}
                    sx={{
                        left: { xs: 0, sm: 20, md: 50, lg: 50 },
                        bottom: { xs: 0, sm: 20, md: 60, lg: 80 },
                    }}
                >
                    <CardAnimation
                        title={state.itemSelected.title}
                        description={state.itemSelected.description}
                        route={state.itemSelected.route}
                        onClick={handleViewDetail}
                    />
                </Box>
            </Grow>
        )
    }

    return (
        <Carousel
            NextIcon={<ArrowForwardIosIcon fontSize="large" />}
            PrevIcon={<ArrowBackIosNewIcon fontSize="large" />}
            className={classes.carousel}
            animation="fade"
            navButtonsAlwaysVisible
            stopAutoPlayOnHover
            interval={5000}
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
                    marginTop: -40,
                    textAlign: 'right',
                    zIndex: 10,
                    position: 'absolute'
                }
            }}
            onChange={(now, previous) => handleChange(now, previous)}
        >
            {state.data.map((item, i) => (
                <Box key={i} elevation={6} className={classes.carouselPaper}>
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={classes.image}
                    />
                    {!!state.itemSelected && renderItem()}
                </Box>
            ))}
        </Carousel>
    );
}

export default CarouselImage