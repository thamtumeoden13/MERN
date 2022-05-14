import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import useStyles from './styles'

const PorfolioList = ({ onViewDetail }) => {

    const { portfolios, isLoading } = useSelector((state) => state.portfolios)

    const [data, setData] = useState([])

    console.log('PorfolioList', portfolios)

    useEffect(() => {
        setData(portfolios || [])
    }, [portfolios])

    const handleViewDetail = (item) => {
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    if (!isLoading && !data.length) {
        return (
            <SearchNotFound
                searchQuery={'state.searchQuery'}
                sx={{ minHeight: '50vh' }}
            />
        )
    }

    return (
        <Box>
            <CardList
                data={data}
                itemCount={4}
                onViewDetail={handleViewDetail}
            />
        </Box>
    )
}

export default PorfolioList