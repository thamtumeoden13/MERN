import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import ElevationScroll from '../ElevationScroll'
import NavBarAuthComponent from '../NavBarAuthComponent'
import NavBarLogoComponent from '../NavBarLogoComponent';

import { LOGOUT } from '../../../redux/constants/actionType';

import useStyles from './styles'

const NavBar = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)

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

        navigate('/auth')
        setUser(null)
    }, [navigate, dispatch])

    return (
        <ElevationScroll {...props}>
            <AppBar position="fixed" className={classes.appBar} color='inherit' sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar className={classes.toolbar}>
                    <NavBarLogoComponent />
                    <NavBarAuthComponent user={user} handleLogout={handleLogout} />
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default NavBar