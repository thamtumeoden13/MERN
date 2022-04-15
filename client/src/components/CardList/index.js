import React from 'react'
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import CardItem from './CardItem'

import useStyles from './styles'

const CardList = ({ data, onClickItem }) => {

    console.log('CardList', data)

    const handleClickItem = (item) => {
        console.log('handleClickItem', item)
        if (onClickItem) {
            onClickItem(item)
        }
    }

    if (!data.length) return null

    return (
        <Container>
            <Grid container spacing={2}>
                {data.map((item, index) => {
                    return (
                        <Grid item key={`item-${index}`} xs={12} sm={12} md={6} lg={4} >
                            <CardItem item={item} onClick={handleClickItem} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container >
    )
}

export default CardList