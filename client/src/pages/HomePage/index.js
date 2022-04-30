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

import { getProjectDetails } from '../../redux/actions/projectDetails'

import { sortBy, useToggle, useInput, useTitle } from '../../utils'
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

const HomePage = () => {

    useTitle('Home | Valley');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)

    const [state, setState] = useState({
        dataVilla: [],
        dataTownHouse: [],
        datafurniture: [],
        subDataVilla: [
            {
                title: 'Biệt Thự Bán Cổ Điển'
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

    useEffect(() => {
        dispatch(getProjectDetails())
    }, [dispatch])

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

    const handleViewDetail = (id) => {
        navigate(`/chi-tiet-du-an/${id}`)
    }

    console.log('[projectDetails]-HOME', projectDetails, isLoading)

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
                        <>
                            {!!isLoading ?
                                <CircularProgress />
                                : <Typography variant='h3' component={'h2'}>
                                    {`Không có dữ liệu`}
                                </Typography>}
                        </>
                        :
                        <>
                            <CardList
                                title={'Thiết Kế Biệt Thự'}
                                itemCount={4}
                                data={state.dataVilla}
                                subData={state.subDataVilla}
                                onViewDetail={handleViewDetail}
                            />
                            <CardList
                                title={'Thiết Kế Nhà Phố'}
                                itemCount={4}
                                data={state.dataTownHouse}
                                subData={state.subDataTownHouse}
                                onViewDetail={handleViewDetail}
                            />
                            <CardList
                                title={'Thiết Kế Nội Thất'}
                                itemCount={4}
                                data={state.datafurniture}
                                subData={state.subDatafurniture}
                                onViewDetail={handleViewDetail}
                            />
                        </>
                    }
                </Box>
            </Container>
            <AppFooter />
        </Box >
    );
}

export default HomePage;
