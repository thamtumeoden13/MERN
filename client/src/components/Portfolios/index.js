import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';

import useStyles from './styles'

const Portfolios = ({ onViewDetail }) => {

    const { id, id2, id3 } = useParams()
    const { projectDetails, projectDetailsByPortfolioID, projectDetailsByProjectID, isLoading } = useSelector((state) => state.projectDetails)

    const [data, setData] = useState([])

    console.log('PortfolioPage', projectDetails, projectDetailsByPortfolioID, projectDetailsByProjectID)

    useEffect(() => {
        if (!!id || !!id2 || !!id3) {
            switch (true) {
                case !!id:
                    setData([])
                    break;

                case !!id2:
                    setData(projectDetailsByPortfolioID || [])
                    break;

                case !!id3:
                    setData(projectDetailsByProjectID || [])
                    break;

            }
        } else {
            setData(projectDetails || [])
        }
    }, [id, id2, id3, projectDetails, projectDetailsByPortfolioID, projectDetailsByProjectID,])

    const handleViewDetail = (id) => {
        if (onViewDetail) {
            onViewDetail(id)
        }
    }

    if (!data.length && !isLoading) return null

    return (
        <Box>
            <CardList data={data} onViewDetail={handleViewDetail} />
        </Box>
    )
}

export default Portfolios