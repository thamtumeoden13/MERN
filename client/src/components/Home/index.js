import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Products from '../Products';
import Form from '../Form';
import Pagination from '../common/Pagination';
import ChipInput from '../common/ChipInput';

import { getProducts, getProductsBySearch } from '../../redux/actions/products'

import useStyles from './styles'
import SlateEditor from '../common/SlateEditor';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const query = useQuery()

    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [currentId, setCurrentId] = useState(0)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    // useEffect(() => {
    //     dispatch(getProducts())
    // }, [currentId, dispatch])

    const handleSearch = () => {
        if (search.trim() || tags) {
            dispatch(getProductsBySearch({ search, tags: tags.join(',') }))
            navigate(`/products/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }
    const handleKeyPress = (e) => {
        if (e.keyCOde === 13) {
            handleSearch()
        }
    }

    const handleChangeValue = (values) => {
        setTags(values)
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9} >
                        <Products handleCurrentId={handleCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Products'
                                type={'search'}
                                fullWidth
                                value={search}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                label={'Search Tags'}
                                placeholder={'tags...'}
                                onChangeValue={handleChangeValue}
                            />
                            <Button
                                className={classes.searchButton}
                                onClick={handleSearch}
                                color='primary'
                                variant='contained'
                            // disabled={!search && !tags.length}
                            >
                                {`Search`}
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} handleCurrentId={handleCurrentId} />
                        {(!searchQuery && !tags.length) &&
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination
                                    page={page}
                                />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
