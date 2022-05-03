import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Container, Grid, Typography } from '@mui/material'
import Grow from '@mui/material/Grow'

import PorfolioListComponent from '../../components/Portfolios/PorfolioList'
import BreadcrumbComponent from '../../components/Breadcrumbs';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import { getPortfolios } from '../../redux/actions/portfolios'

import { useTitle } from '../../utils';

const PorfolioListPage = () => {

    useTitle('Art-Sunday | Danh Sách Hạn Mục Dự Án');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPortfolios())
    }, [dispatch])

    const handleViewDetail = (item) => {
        navigate(`/danh-sach-han-muc-du-an/${item._id}`, { state: { title: item.title } })
    }

    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Grow in>
                <Container maxWidth={'xl'} sx={{ minHeight: '100vh' }}>
                    <Box sx={{ marginY: 4 }}>
                        <BreadcrumbComponent />
                    </Box>
                    <Box>
                        <PorfolioListComponent onViewDetail={handleViewDetail} />
                    </Box>
                </Container>
            </Grow>
            <AppFooter />
        </Box >
    )
}

export default PorfolioListPage
