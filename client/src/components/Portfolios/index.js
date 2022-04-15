import React from 'react'
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';

import useStyles from './styles'

const Portfolios = () => {

    const { portfolios, isLoading } = useSelector((state) => state.portfolios)
    const { projects } = useSelector((state) => state.projects)

    console.log('PortfolioPage', portfolios)

    if (!portfolios.length && !isLoading) return null

    return (
        <Box>
            <CardList data={projects} />
        </Box>
    )
}

export default Portfolios