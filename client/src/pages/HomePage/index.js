import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'

import Header from '../../components/Header';
import CardList from '../../components/CardList';

import { getPortfolios } from '../../redux/actions/portfolios'
import { getProjects } from '../../redux/actions/projects'
import { getProjectDetails } from '../../redux/actions/projectDetails'

import { sortBy, useToggle, useInput, useTitle } from '../../utils'
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

const HomePage = () => {

    useTitle('Art | Sunday');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { portfolios, isLoading: portfoliosLoading } = useSelector((state) => state.portfolios)
    const { projects, isLoading: projectsLoading } = useSelector((state) => state.projects)
    const { projectDetails, isLoading: projectDetailsLoading } = useSelector((state) => state.projectDetails)

    const [data, setData] = useState([])

    useEffect(() => {
        Promise.all([dispatch(getPortfolios()), dispatch(getProjects()), dispatch(getProjectDetails())])
    }, [dispatch])

    useEffect(() => {

        if (!!projects && !!portfolios && !!projectDetails) {
            const portfoliosCopy = JSON.parse(JSON.stringify(portfolios))
            const data = portfoliosCopy.reduce((r, a) => {
                const projectsChild = projects.filter(e => e.portfolioID === a._id)
                const projectDetailsChild = projectDetails.filter(e => e.portfolioID === a._id)
                a.child = [...projectsChild]
                a.childDetail = [...projectDetailsChild]
                r = [...r || [], a]
                return r
            }, [])
            setData(data)
        }

    }, [portfolios, projects, projectDetails])

    const handleViewProjectDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    const handleSearchProject = (item) => {
        navigate(`/danh-sach-du-an/${item._id}`)
    }

    return (
        <Box sx={{ pt: 10, backgroundColor: 'transparent' }}>
            <NavBar />
            <Header />
            <Container sx={{ paddingY: 0, mt: 10, minHeight: '100vh' }}>
                <Box sx={{
                    minHeight: '100vh',
                    flexDirection: 'column',
                    justifyContent: { sx: 'center' }
                }}>
                    {(!data || data.length <= 0) ?
                        <Box>
                            {(!!projectDetailsLoading || !!portfoliosLoading || !!projectsLoading) ?
                                <CircularProgress />
                                : <Typography variant='h3' component={'h2'}>
                                    {`Không có dữ liệu`}
                                </Typography>}
                        </Box>
                        :
                        <Box>
                            {data.map(e => (
                                <Box key={e._id}>
                                    <CardList
                                        title={`Thiết Kế ${e.title}`}
                                        itemCount={4}
                                        subData={e.child}
                                        data={e.childDetail}
                                        onViewDetail={handleViewProjectDetail}
                                        onViewSubDetail={handleSearchProject}
                                    />
                                </Box>
                            ))}
                        </Box>
                    }
                </Box>
            </Container>
            <AppFooter />
        </Box >
    );
}

export default HomePage;
