import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode'
import { v4 as uuidv4 } from 'uuid';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import HideOnScroll from './HideOnScroll'
import ElevationScroll from './ElevationScroll'
import SearchAppBar from '../SearchBar';
import NavBarMenuIconComponent from './NavBarMenuIconComponent'
import NavBarLogoComponent from './NavBarLogoComponent';
import NavBarAuthComponent from './NavBarAuthComponent'
import NavBarMenu from './NavBarMenu'
import NavBarMenuMobile from './NavBarMenuMobile';
import NavBarDrawerMobile from './NavBarDrawerMobile'

import { LOGOUT } from '../../redux/constants/actionType';
import { getRoutes } from '../../redux/actions/routes';

import useStyles from './styles'

const NavBar = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { routes, isLoading } = useSelector((state) => state.routes)

    const [user, setUser] = useState(null)
    const [routesNav, setRoutesNav] = useState([])
    const [drawer, setDrawer] = useState(false);

    useEffect(() => {
        dispatch(getRoutes())
    }, [dispatch])

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodeToken = decode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location, user?.token])

    useEffect(() => {
        if (!!routes) {
            let routesCopy = JSON.parse(JSON.stringify(routes))
            const routesNav =
                [
                    {
                        _id: uuidv4(),
                        title: 'Giới Thiêu',
                        name: 'gioi-thieu',
                        // route: 'gioi-thieu',
                        child: [
                            {
                                _id: uuidv4(),
                                title: 'Giới Thiêu',
                                name: 'gioi-thieu',
                                route: 'gioi-thieu',
                            },
                            {
                                _id: uuidv4(),
                                title: 'Nhân Sự',
                                name: 'nhan-su',
                                route: 'nhan-su',
                            },
                            {
                                _id: uuidv4(),
                                title: 'Văn Phòng',
                                name: 'van-phong',
                                route: 'van-phong',
                            },
                            {
                                id: 4,
                                title: 'Liên Hệ',
                                name: 'lien-he',
                                route: 'lien-he',
                            },
                        ]
                    },
                    ...routesCopy,
                    {
                        _id: uuidv4(),
                        title: 'Tin Tức',
                        name: 'tin-tuc',
                        // route: 'tin-tuc',
                        child: [
                            {
                                _id: uuidv4(),
                                title: 'Tin Tức',
                                name: 'tin-tuc',
                                route: 'tin-tuc',
                            },
                            {
                                _id: uuidv4(),
                                title: 'Cẩm nang xây nhà',
                                name: 'cam-nang-xay-nha',
                                route: 'cam-nang-xay-nha',
                            },
                            {
                                _id: uuidv4(),
                                title: 'Hoạt động-Sự kiện',
                                name: 'hoat-dong-su-kien',
                                route: 'hoat-dong-su-kien',
                            },
                            {
                                _id: uuidv4(),
                                title: 'Tuyển Dụng',
                                name: 'tuyen-dung',
                                route: 'tuyen-dung',
                            },
                        ]
                    }
                ]

            console.log('[routesNav]', routesNav)
            setRoutesNav(routesNav)
        }
    }, [routes])

    const handleLogout = useCallback(() => {
        dispatch({ type: LOGOUT })

        navigate('/')
        setUser(null)
    }, [navigate, dispatch])

    const toggleDrawer = (open, event) => {
        // if (
        //     event &&
        //     event.type === 'keydown' &&
        //     (event.key === 'Tab' || event.key === 'Shift')
        // ) {
        //     return;
        // }
        // console.log('[toggleDrawer]', open, event)
        // setDrawer(open, event);
    };

    console.log('[routesNav]', routesNav)

    return (
        <HideOnScroll {...props}>
            <AppBar position="fixed" className={classes.appBar} color='inherit' sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar className={classes.toolbar}>
                    <NavBarMenuIconComponent toggleDrawer={toggleDrawer} />
                    <NavBarLogoComponent />
                    <NavBarMenuMobile />
                    <NavBarMenu routes={routesNav} />
                    <NavBarDrawerMobile drawer={drawer} toggleDrawer={toggleDrawer} />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{
                        justifyContent: 'center',
                        display: { xs: 'none', sm: 'flex', md: 'flex' }
                    }}>
                        <SearchAppBar />
                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

export default NavBar