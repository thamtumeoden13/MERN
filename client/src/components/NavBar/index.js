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
            // console.log('[routesNav]', routesNav)
            setRoutesNav(routesCopy)
        }
    }, [routes])
    console.log('[routes]', routes)
    const handleLogout = useCallback(() => {
        dispatch({ type: LOGOUT })

        navigate('/')
        setUser(null)
    }, [navigate, dispatch])

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const handleSearch = (search) => {
        navigate(`/tim-kiem?searchQuery=${search}`)
    }

    return (
        <ElevationScroll {...props}>
            <AppBar position="fixed" className={classes.appBar} color='inherit' sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar className={classes.toolbar}>
                    <NavBarMenuIconComponent toggleDrawer={toggleDrawer} />
                    <NavBarLogoComponent />
                    <NavBarDrawerMobile routes={routesNav} drawer={drawer} toggleDrawer={toggleDrawer} />
                    <NavBarMenuMobile />
                    <NavBarMenu routes={routesNav} />
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    {/* <Box sx={{
                        justifyContent: 'center',
                        display: { xs: 'none', sm: 'none', md: 'flex' }
                    }}>
                        <SearchAppBar onSearch={handleSearch} />
                    </Box> */}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default NavBar