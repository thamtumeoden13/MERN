import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import { useQuery, useTitle } from '../../utils';

const SearchList = ({ onViewDetail }) => {

    const query = useQuery()
    const searchQuery = query.get('searchQuery')

    const { projectDetailsBySearch, isLoading } = useSelector((state) => state.projectDetails)

    const [data, setData] = useState([])

    console.log('ProjectDetailList', projectDetailsBySearch)

    useEffect(() => {
        setData(projectDetailsBySearch || [])
    }, [projectDetailsBySearch])

    const handleViewDetail = (item) => {
        console.log('[item]', item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    if (!isLoading && !data.length) {
        return (
            <SearchNotFound
                searchQuery={searchQuery || ''}
                sx={{ minHeight: '50vh' }}
            />
        )
    }

    return (
        <Box>
            <CardList
                data={data}
                // title={e.title}
                itemCount={4}
                onViewDetail={handleViewDetail}
            />
        </Box>
    )
}

export default SearchList