import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload'

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'

import CardList from '../CardList';
import SearchNotFound from '../SearchNotFound';

import { useQuery, useTitle } from '../../utils';

import useStyles from './styles'

const Portfolios = ({ onViewDetail }) => {

    const { id, projectID, projectDetailID } = useParams()
    const { projectDetails, projectDetailsBySearch, projectDetailsByPortfolioID, projectDetailsByProjectID, isLoading } = useSelector((state) => state.projectDetails)
    const { projects, } = useSelector((state) => state.projects)

    const query = useQuery()
    const searchQueryPortfolioName = query.get('portfolioname')
    const searchQueryprojectName = query.get('projectname')

    const [data, setData] = useState([])
    const [state, setState] = useState({
        title: '',
        searchQuery: ''
    })

    useTitle(`Art-Sunday | ${state.title || ''}`);

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

    useEffect(() => {
        setState(prev => {
            return {
                ...prev,
                searchQuery: !!searchQueryPortfolioName ? searchQueryPortfolioName : !!searchQueryprojectName ? searchQueryprojectName : ''
            }
        })
    }, [searchQueryPortfolioName, searchQueryprojectName])

    useEffect(() => {
        if (!!searchQueryprojectName && !!projects) {
            const find = projects.find(e => e.name === searchQueryprojectName)
            setState(prev => {
                return {
                    ...prev,
                    title: find?.title || '',
                }
            })
        }
    }, [searchQueryprojectName, projects])

    const handleViewDetail = (item) => {
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

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
            <CardList
                title={state.title}
                data={data}
                onViewDetail={handleViewDetail}
            />
        </Box>
    )
}

export default Portfolios