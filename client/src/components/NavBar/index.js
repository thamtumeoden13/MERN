import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode'

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

import useStyles from './styles'

const NavBar = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { portfolios, isLoading: portfoliosLoading } = useSelector((state) => state.portfolios)
    const { projects, isLoading: projectsLoading } = useSelector((state) => state.projects)

    const [user, setUser] = useState(null)
    const [drawer, setDrawer] = useState(false);
    const [routes, setRoutes] = useState([])

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
        console.log('[router-navbar]', projects, portfolios)
        if (!!projects && !!portfolios) {
            const portfoliosCopy = JSON.parse(JSON.stringify(portfolios))
            const routes = portfoliosCopy.reduce((r, a) => {
                const projectsChild = projects.filter(e => e.portfolioID === a._id)
                a.route = !!projectsChild && projectsChild.length > 0 ? '' : `han-muc-du-an/tim-kiem?portfolioName=${a.name}`
                const child = projectsChild.map(e => {
                    return {
                        ...e,
                        route: `han-muc-du-an/tim-kiem?projectname=${e.name}`
                    }
                })
                a.child = [...child]
                r = [...r || [], a]
                return r
            }, [])
            console.log('[router-navbar-2]', routes)
            setRoutes(routes)
        }

    }, [portfolios, projects])

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

    return (
        <HideOnScroll {...props}>
            <AppBar position="fixed" className={classes.appBar} color='inherit' sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar className={classes.toolbar}>
                    <NavBarMenuIconComponent toggleDrawer={toggleDrawer} />
                    <NavBarLogoComponent />
                    <NavBarMenuMobile />
                    <NavBarMenu routes={routes} />
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