import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import Products from '../Products';
import Form from '../Form';

import { getProducts } from '../../redux/actions/products'

import useStyles from './styles'

function Home() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getProducts())
    }, [currentId, dispatch])

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Products handleCurrentId={handleCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} handleCurrentId={handleCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
