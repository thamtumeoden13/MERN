import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';

import useStyles from './styles'

const ProjectList = ({ onViewDetail }) => {

    const { id } = useParams()

    const { projects, isLoading } = useSelector((state) => state.projects)

    const [data, setData] = useState({})

    console.log('ProjectList', projects)

    useEffect(() => {

        let data = {}
        if (!!projects) {
            if (!!id) {
                const filter = projects.filter(e => e.portfolioID == id)
                data = filter.reduce((r, a) => {
                    r[`${a.portfolioID}`] = [...r[`${a.portfolioID}`] || [], a];
                    return r;
                }, {});
            } else {
                data = projects.reduce((r, a) => {
                    r[`${a.portfolioID}`] = [...r[`${a.portfolioID}`] || [], a];
                    return r;
                }, {});
            }
        }
        setData(data)

    }, [projects, id])

    const handleViewDetail = (item) => {
        console.log('[item]', item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    if (!data && !isLoading) return null

    return (
        <Box>
            {Object.keys(data).map(function (key) {
                return (
                    <Box key={key}>
                        <CardList
                            data={data[key]}
                            // title={data[key][0].portfolioName}
                            itemCount={4}
                            onViewDetail={handleViewDetail}
                        />
                    </Box>
                )
            })
            }
        </Box>
    )
}

export default ProjectList