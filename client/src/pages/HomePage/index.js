import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'

import Header from '../../components/Header';
import Categories from '../../components/Categories';
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

    const [state, setState] = useState({
        dataVilla: [],
        dataTownHouse: [],
        datafurniture: [],
        subDataVilla: [
            {
                title: 'Biệt Thự Bán Cổ Điển',

            },
            {
                title: 'Biệt Thự Cổ Điển'
            },
            {
                title: 'Biệt Thự Hiện Đại'
            },
            {
                title: 'Biệt Thự Vườn Mái Thái'
            },
        ],
        subDataTownHouse: [
            {
                title: 'Nhà Phố Bán Cổ Điển'
            },
            {
                title: 'Nhà Phố Cổ Điển'
            },
            {
                title: 'Nhà Phố 2 Tầng'
            },
            {
                title: 'Nhà Phố 3 Tầng'
            },
        ],
        subDatafurniture: [
            {
                title: 'Nội Thất Bán Cổ Điển'
            },
            {
                title: 'Nội Thất Cổ Điển'
            },
            {
                title: 'Nội Thất Hiện Đại'
            },
            {
                title: 'Nội Thất Căn Hộ'
            },
        ],
    })

    const [data, setData] = useState({})

    useEffect(() => {
        Promise.all([dispatch(getPortfolios()), dispatch(getProjects()), dispatch(getProjectDetails())])
    }, [dispatch])

    useEffect(() => {

        if (!!projects && !!portfolios && !!projectDetails) {
            let data = projects.reduce((r, a) => {
                const find = portfolios.find(e => e._id === a.portfolioID)
                const childProjectDetails = projectDetails.filter(e => e.portfolioID == a.portfolioID)

                a.portfolioTitle = !!find && Object.keys(find).length > 0 ? find.title : ''
                a.child = childProjectDetails || []
                r[`${a.portfolioID}`] = [...r[`${a.portfolioID}`] || [], a];
                return r;
            }, {});
            console.log('[data]', data)
            setData(data)
        }

    }, [projects, portfolios, projectDetails])

    useEffect(() => {
        let dataVilla = []
        let dataTownHouse = []
        let datafurniture = []
        if (!!projectDetails && projectDetails.length > 0) {
            dataVilla = projectDetails.filter(e => { return e.portfolio === "62643d9ff47761c9f6bfec3b" })
            dataTownHouse = projectDetails.filter(e => { return e.portfolio === "62643dc6f47761c9f6bfec3d" })
            datafurniture = projectDetails.filter(e => { return e.portfolio === "62643dfbf47761c9f6bfec3f" })
        }
        setState(prev => { return { ...prev, dataVilla, dataTownHouse, datafurniture } })
    }, [projectDetails])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    console.log('[projectDetails]-HOME', projectDetails)

    return (
        <Box sx={{ pt: 10, backgroundColor: 'transparent' }}>
            <NavBar />
            <Header />
            <Container sx={{ paddingY: 0, mt: 5, minHeight: '100vh' }}>
                <Box sx={{
                    minHeight: '100vh',
                    flexDirection: 'column',
                    justifyContent: { sx: 'center' }
                }}>
                    {(!projectDetails || projectDetails.length <= 0) ?
                        <Box>
                            {!!projectDetailsLoading ?
                                <CircularProgress />
                                : <Typography variant='h3' component={'h2'}>
                                    {`Không có dữ liệu`}
                                </Typography>}
                        </Box>
                        :
                        <Box>
                            {Object.keys(data).map(function (key) {
                                return (
                                    <Box key={key}>
                                        < CardList
                                            title={`Thiết Kế ${data[key][0].portfolioTitle}`}
                                            itemCount={4}
                                            data={data[key][0].child}
                                            subData={data[key]}
                                            onViewDetail={handleViewDetail}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                    }
                </Box>
            </Container>
            <AppFooter />
        </Box >
    );
}

export default HomePage;
