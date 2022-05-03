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

const CardList = ({ title, data, subData, itemCount = 3, onViewDetail, onViewSubDetail }) => {

    const [state, setState] = useState({ xs: 12, sm: 12, md: 6, lg: 4 })

    useEffect(() => {
        const baseSize = 12 / itemCount
        const size = { xs: baseSize * 4, sm: baseSize * 3, md: baseSize * 2, lg: baseSize }
        console.log('[size]', size)
        setState(size)
    }, [itemCount])

    const handleClickItem = (item) => {
        console.log('handleClickItem', item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    const handleClickSubItem = (item) => {
        console.log('handleClickSubItem', item)
        if (onViewSubDetail) {
            onViewSubDetail(item)
        }
    }

    if (!data.length) return null

    return (
        <Box sx={{ mb: 2 }}>
            {!!title &&
                <Box sx={{ mb: 2 }}>
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
            <Grid container spacing={2}>
                {data.map((item, index) => {
                    return (
                        <Grid item key={`item-${index}`} xs={12} sm={state.sm} md={state.md} lg={state.lg} >
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

export default CardList