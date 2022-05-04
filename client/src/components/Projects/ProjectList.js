import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import useStyles from './styles'

const ProjectList = ({ onViewDetail }) => {

    const { id } = useParams()

    const { portfolios } = useSelector((state) => state.portfolios)
    const { projects, isLoading } = useSelector((state) => state.projects)

    const [data, setData] = useState([])

    // console.log('ProjectList', projects, data)

    useEffect(() => {

        let data = []
        if (!!portfolios && !!projects) {
            if (!!id) {
                const filter = portfolios.filter(e => e._id === id)
                data = filter.map(e => {
                    const child = projects.filter(f => f.portfolioID === e._id)
                    return {
                        ...e,
                        child
                    }
                })
            } else {
                data = portfolios.map(e => {
                    const child = projects.filter(f => f.portfolioID === e._id)
                    return {
                        ...e,
                        child
                    }
                })
            }
        }
        setData(data)

    }, [portfolios, projects, id])

    const handleViewDetail = (item) => {
        // console.log('[item]', item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    if (!isLoading && (!data.length || !data.find(e => e.child.length > 0))) {
        return (
            <SearchNotFound
                searchQuery={'state.searchQuery'}
                sx={{ minHeight: '50vh' }}
            />
        )
    }

    return (
        <Box>
            {data.map(e => (
                <Box key={e._id}>
                    <CardList
                        data={e.child}
                        title={e.title}
                        onViewDetail={handleViewDetail}
                    />
                </Box>
            ))}
        </Box>
    )
}

export default ProjectList