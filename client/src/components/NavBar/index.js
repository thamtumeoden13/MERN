import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import useStyles from './styles'
import { LOGOUT } from '../../redux/constants/actionType';


const NavBar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)

    console.log({ user })

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        const token = user?.token
        console.log({ token })
    }, [user])

    const handleLogout = () => {
        dispatch({ type: LOGOUT })

        navigate('/')
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography
                    className={classes.heading}
                    variant='h2' align='center'
                    component={Link}
                    to='/'
                >
                    {`Products`}
                </Typography>
                <img
                    className={classes.image}
                    src={'https://images.pexels.com/photos/11319741/pexels-photo-11319741.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
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