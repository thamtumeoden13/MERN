import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import useStyles from './styles'

const ProjectDetailList = ({ onViewDetail }) => {

    const { id } = useParams()

    const { projects } = useSelector((state) => state.projects)
    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)

    const [data, setData] = useState([])

    console.log('ProjectDetailList', projectDetails)
    console.log('projects', projects)

    useEffect(() => {

        let data = []
        if (!!projects && !!projectDetails) {
            if (!!id) {
                const filter = projects.filter(e => e._id === id)
                data = filter.map(e => {
                    const child = projectDetails.filter(f => f.projectID === e._id)
                    return {
                        ...e,
                        child
                    }
                })
            } else {
                data = projects.map(e => {
                    const child = projectDetails.filter(f => f.projectID === e._id)
                    return {
                        ...e,
                        child
                    }
                })
            }
        }
        setData(data)

    }, [projects, projectDetails, id])

    const handleViewDetail = (item) => {
        console.log('[item]', item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    console.log('data', data)
    if (!isLoading && (!data.length || !data.find(e => e.child.length > 0))) {
        return (
            <SearchNotFound
                searchQuery={data.length > 0 ? data[0].name : ''}
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
                        itemCount={4}
                        onViewDetail={handleViewDetail}
                    />
                </Box>
            ))}
        </Box>
    )
}

export default ProjectDetailList