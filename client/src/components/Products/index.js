import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import Product from './Product'

import useStyles from './styles'

const Products = ({ handleCurrentId }) => {
    const classes = useStyles()

    const { products, isLoading } = useSelector((state) => state.products)
    console.log({ products })
    if (!products.length && !isLoading) return null

    return (
        <>
            {!!isLoading ? <CircularProgress /> : (
                <Grid
                    className={classes.mainContainer}
                    container
                    alignItems='stretch'
                    spacing={3}
                >
                    {products.map((product) => (
                        <Grid key={product._id} item xs={12} sm={12} md={6} lg={3} >
                            <Product product={product}
                                handleCurrentId={handleCurrentId}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default Products