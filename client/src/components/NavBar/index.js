import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';

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

    const [user, setUser] = useState(null)
    const [drawer, setDrawer] = useState(false);

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
        <>
            <HideOnScroll {...props}>
                <AppBar position="fixed" className={classes.appBar} color='inherit' sx={{ top: 0, bottom: 'auto' }}>
                    <Toolbar className={classes.toolbar}>
                        <NavBarMenuIconComponent toggleDrawer={toggleDrawer} />
                        <NavBarLogoComponent />
                        <NavBarMenuMobile />
                        <NavBarMenu />
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
            {/* <HideOnScroll {...props}>
                <AppBar position="fixed" className={classes.appBar2} color='inherit' sx={{ height: 48 }} elevation={0}>
                    <Box sx={{ paddingX: 4, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, }}>
                            <Typography variant='body2' component='div' color={'gray'}>
                                {`Hotline: 093710 0202 / 0906 10 0202 Email: info@neohouse.vn / tuvan@neohouse.vn`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, }}>
                            <IconButton size='small' aria-label="facebook" href='https://mui.com/material-ui/api/icon-button'>
                                <FacebookIcon fontSize="12px" sx={{ ml: 2, color: 'gray' }} />
                            </IconButton>
                            <IconButton size='small' aria-label="twitter">
                                <TwitterIcon fontSize="12px" sx={{ ml: 2, color: 'gray' }} />
                            </IconButton>
                            <IconButton size='small' aria-label="google">
                                <GoogleIcon fontSize="12px" sx={{ ml: 2, color: 'gray' }} />
                            </IconButton>
                            <IconButton size='small' aria-label="youtube">
                                <YouTubeIcon fontSize="12px" sx={{ ml: 2, color: 'gray' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </AppBar>
            </HideOnScroll> */}
        </>
    )
}

export default NavBar