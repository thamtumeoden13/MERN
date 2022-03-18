import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../../../redux/actions/products';

import useStyles from './styles'

const Paginate = ({ page }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { numberOfPages } = useSelector((state) => state.products)

    useEffect(() => {
        if (page) {
            dispatch(getProducts(page))
        }
    }, [page])

    return (
        <Pagination
            className={classes.ul}
            count={numberOfPages}
            page={Number(page)}
            variant='outlined'
            color='primary'
            renderItem={(item) => {
                return (
                    <PaginationItem
                        {...item}
                        component={Link}
                        to={`/products?page=${item.page}`}
                    />
                )
            }}
        />
    )
}

export default Paginate;