import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import HomePage from './pages/HomePage'
import Products from './components/Products';
import Form from './components/Form';

import { getProducts } from './redux/actions/products'

import useStyles from './styles'

function App() {

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
    <Container maxWidth="lg">
      {/* <HomePage /> */}
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Products</Typography>
        <img
          className={classes.image}
          src={'https://images.pexels.com/photos/11319741/pexels-photo-11319741.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
          alt='products' height='60'
        />
      </AppBar>
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
    </Container>
  );
}

export default App;
