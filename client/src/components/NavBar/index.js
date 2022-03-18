import React, { useCallback, useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import useStyles from './styles'
import { LOGOUT } from '../../redux/constants/actionType';


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
            <div className={classes.brandContainer}>
                <Typography
                    className={classes.heading}
                    variant='h2' align='center'
                    component={Link}
                    to='/'
                >
                    {`MERN`}
                </Typography>
                <img
                    className={classes.image}
                    src={'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    alt='products' height='60'
                />
            </div>
            <Toolbar className={classes.toolbar}>
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
                            color='secondary'
                            onClick={handleLogout}
                        >
                            {`Logout`}
                        </Button>
                    </div>
                ) : (
                    <Button
                        className={classes.SignIn}
                        color='primary'
                        variant='contained'
                        component={Link}
                        to='/auth'
                    >
                        {`Sign In`}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )

}

export default NavBar