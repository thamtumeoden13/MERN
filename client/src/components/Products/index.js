import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

import Product from './Product'

import useStyles from './styles'

const Products = ({ handleCurrentId }) => {
    const classes = useStyles()
    const { data } = useSelector((state) => state.products)

    console.log('[products]', data)

    return (
        !data.length ? <CircularProgress /> : (
            <Grid
                className={classes.mainContainer}
                container
                alignItems='stretch'
                spacing={3}
            >
                {data.map((product) => (
                    <Grid key={product._id} item xs={12} sm={6} >
                        <Product product={product}
                            handleCurrentId={handleCurrentId}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Products