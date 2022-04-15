import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import { getPortfolios, createPortfolio, updatePortfolio } from '../../redux/actions/portfolios'

// import Products from '../Products';
import Form from './Form';
import PortfolioTableList from './PortfolioTableList'

import useStyles from './styles'
import SlateEditor from '../../components/common/SlateEditor';

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }],
    },
    {
        type: 'image',
        url: 'https://source.unsplash.com/kFrdX5IeQzI',
        children: [{ text: '' }],
    },
]

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const PortfolioAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const query = useQuery()

    const page = query.get('page') || 1

    const { portfolios, isLoading } = useSelector((state) => state.portfolios)

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {
        dispatch(getPortfolios())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }

    const handlePortfolioDetail = (id) => {
        navigate(`/portfolios/${id}`)
    }

    const handleSubmitForm = (data) => {
        console.log(data)
        if (!!currentId) {
            dispatch(updatePortfolio(currentId, { ...data, description: description, createdByName: user?.result?.name }))
        } else {
            dispatch(createPortfolio({ ...data, description: description, createdByName: user?.result?.name }, navigate))
        }
    }

    const handleChangeDescription = (description) => {
        console.log('handleChangeDescription', description)
        setDescription(description)
    }

    return (
        <Grow in>
            <Container maxWidth='xl' sx={{ mt: 15 }}>
                <Grid container display='flex' flexDirection='column' spacing={3}>
                    <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={8} >
                            <PortfolioTableList
                                data={portfolios}
                                onViewDetail={handlePortfolioDetail}
                                onEdit={handleCurrentId}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form currentId={currentId} handleCurrentId={handleCurrentId} onSubmit={handleSubmitForm} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}
                    sx={{
                        minHeight: '100vh',
                        margin: '10px 0',
                        backgroundColor: 'white',
                        boxShadow: '2px 4px 10px #888888'
                    }}
                >
                    <SlateEditor initialValue={initialValue} onChange={handleChangeDescription} />
                </Grid>
            </Container>
        </Grow>
    );
}

export default PortfolioAdmin;