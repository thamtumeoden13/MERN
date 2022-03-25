import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import { AppBar, Typography, Toolbar, Avatar, Button, Paper } from '@mui/material'

import SearchAppBar from '../SearchBar';

import { LOGOUT } from '../../redux/constants/actionType';

import imageLogo_Green from '../../assets/imageLogo_Green.jpeg'
import imageBackground from '../../assets/imageBackground.jpeg'
import useStyles from './styles'

const NavBar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)

    const handleLogout = useCallback(() => {
        dispatch({ type: LOGOUT })

        navigate('/')
        setUser(null)
    }, [navigate, dispatch])

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodeToken = decode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location, handleLogout, user?.token])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <Paper className={classes.imageLogo} elevation={4}>
                    <img component={Link} to="/" src={imageLogo_Green} alt="iconLogo" height="100%" />
                </Paper>
                <img className={classes.imageBackground} src={imageBackground} alt="iconBackground" height="60px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                <SearchAppBar />
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography
                            className={classes.userName}
                            variant='h6'
                        >
                            {user.result.name}
                        </Typography>
                        <Button
                            className={classes.logout}
                            variant='contained'
                            color='error'
                            onClick={handleLogout}
                        >
                            {`Logout`}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button
                            className={classes.SignIn}
                            color='primary'
                            variant='contained'
                            component={Link}
                            to='/auth'
                        >
                            {`Sign In`}
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )

}

export default NavBar