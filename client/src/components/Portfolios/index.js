import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';

import { useQuery } from '../../utils';
import useStyles from './styles'

const Portfolios = ({ onViewDetail }) => {

    const { id, projectID, projectDetailID } = useParams()
    const { projectDetails, projectDetailsBySearch, projectDetailsByPortfolioID, projectDetailsByProjectID, isLoading } = useSelector((state) => state.projectDetails)

    const query = useQuery()
    const searchQueryPortfolioName = query.get('portfolioName')
    const searchQueryprojectName = query.get('projectName')

    console.log('[searchQueryPortfolioName]', searchQueryPortfolioName)
    console.log('[searchQueryprojectName]', searchQueryprojectName)
    const [data, setData] = useState([])

    console.log('PortfolioPage', projectDetails, projectDetailsByPortfolioID, projectDetailsByProjectID)

    useEffect(() => {
        if (!!id || !!projectID || !!projectDetailID) {
            switch (true) {
                case !!id:
                    setData([])
                    break;

                case !!projectID:
                    setData(projectDetailsByPortfolioID || [])
                    break;

                case !!projectDetailID:
                    setData(projectDetailsByProjectID || [])
                    break;

            }
        }
    }, [id, projectID, projectDetailID, projectDetails, projectDetailsByPortfolioID, projectDetailsByProjectID,])

    useEffect(() => {
        if (!!searchQueryPortfolioName || !!searchQueryprojectName) {
            setData(projectDetailsBySearch || [])
            return
        }
        setData(projectDetails || [])
    }, [searchQueryPortfolioName, searchQueryprojectName, projectDetailsBySearch, projectDetails])

    const handleViewDetail = (item) => {
        if (onViewDetail) {
            onViewDetail(item)
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