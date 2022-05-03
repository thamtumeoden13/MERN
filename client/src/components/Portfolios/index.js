import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import { useQuery, useTitle } from '../../utils';
import useStyles from './styles'

const Portfolios = ({ onViewDetail }) => {

    const { id, projectID, projectDetailID } = useParams()
    const { projectDetails, projectDetailsBySearch, projectDetailsByPortfolioID, projectDetailsByProjectID, isLoading } = useSelector((state) => state.projectDetails)

    const { selectedRoute } = useSelector((state) => state.routes)

    const query = useQuery()
    const searchQueryPortfolioName = query.get('portfolioname')
    const searchQueryprojectName = query.get('projectname')

    const [data, setData] = useState([])
    const [state, setState] = useState({
        title: '',
        searchQuery: ''
    })

    useTitle(`Art-Sunday | ${selectedRoute.title || ''}`);

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
            console.log('[projectDetailsBySearch]', projectDetailsBySearch, projectDetails)
            setData(projectDetailsBySearch || [])
            return
        }
        setData(projectDetails || [])
    }, [searchQueryPortfolioName, searchQueryprojectName, projectDetailsBySearch, projectDetails])

    useEffect(() => {
        setState(prev => {
            return {
                ...prev,
                title: selectedRoute?.title || '',
                searchQuery: !!searchQueryPortfolioName ? searchQueryPortfolioName : !!searchQueryprojectName ? searchQueryprojectName : ''
            }
        })
    }, [selectedRoute, searchQueryPortfolioName, searchQueryprojectName])

    const handleViewDetail = (item) => {
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    console.log('[selectedRoute]', selectedRoute)
    console.log('[state.title]', state.title)

    if (!isLoading && !data.length) {
        return (
            <SearchNotFound
                searchQuery={state.searchQuery}
                sx={{ minHeight: '50vh' }}
            />
        )
    }

    return (
        <Box>
            <LazyLoad placeholder={<CircularProgress />} once>
                <CardList
                    title={state.title}
                    data={data}
                    onViewDetail={handleViewDetail}
                />
            </LazyLoad>
        </Box>
    )
}

export default Portfolios