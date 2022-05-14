import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'

import CardItem from './CardItem'

import useStyles from './styles'
import ListTitle from '../ListTitle';

const CardListVertical = ({ title, data, subData, itemCount = 4, onViewDetail, onViewSubDetail }) => {
    const classes = useStyles()

    const handleClickItem = (item) => {
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    const handleClickSubItem = (item) => {
        if (onViewSubDetail) {
            onViewSubDetail(item)
        }
    }

    if (!data.length) return null

    return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', }}>
            {!!title &&
                <Box sx={{ mb: 2, width: '100%', }}>
                    <Typography
                        variant="h5" component="div"
                        sx={{ paddingY: 1, color: 'black', }}
                    >
                        {title}
                    </Typography>
                    <Divider light sx={{ width: 160, height: 1, backgroundColor: 'orange' }} />
                </Box>
            }
            <ListTitle data={subData} onClick={handleClickSubItem} />
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                {data.map((item, index) => {
                    return (
                        <Grid item key={`item-${index}`}>
                            <LazyLoad placeholder={<CircularProgress />} offset={100} once>
                                <CardItem item={item} onClick={handleClickItem} />
                            </LazyLoad>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default CardListVertical