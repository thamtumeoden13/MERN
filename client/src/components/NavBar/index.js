import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import PropTypes from 'prop-types';

import { AppBar, Typography, Toolbar, Avatar, Button, Paper, Box, Menu, MenuItem, Fade } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import SearchAppBar from '../SearchBar';

import { LOGOUT } from '../../redux/constants/actionType';

import imageLogo_Green from '../../assets/imageLogo_Green.jpeg'
import { routes } from '../../constants/routers';

import useStyles from './styles'

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
const NavBar = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuActived, setMenuActived] = useState(1);

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

    const handleClick = (event, menu) => {
        console.log(event.currentTarget, menu)
        if (!menu.route && !!menu.child && menu.child.length > 0) {
            setAnchorEl(event.currentTarget);
            setMenuActived(menu.id)
            return
        }
        if (!!menu.route) {
            handleRouteMenu(menu.route)
        }
    };
    const handleClose = (routeMenuChild) => {
        console.log('routeMenuChild', routeMenuChild)
        setAnchorEl(null);
        setMenuActived(-1)
        if (!!routeMenuChild && !!routeMenuChild.route) {
            handleRouteMenu(routeMenuChild.route)
        }
    };

    const handleLogout = useCallback(() => {
        dispatch({ type: LOGOUT })

        navigate('/')
        setUser(null)
    }, [navigate, dispatch])

    const handleRouteMenu = (route) => {
        navigate(`/${route.toLowerCase()}`)
    }

    return (
        <ElevationScroll {...props}>
            <AppBar className={classes.appBar} color='inherit'>
                <Link to="/" className={classes.brandContainer}>
                    <Paper className={classes.imageLogo} elevation={4}>
                        <img component={Link} to="/" src={imageLogo_Green} alt="iconLogo" height="100%" />
                    </Paper>
                    {/* <img className={classes.imageBackground} src={imageBackground} alt="iconBackground" height="60px" /> */}
                </Link>
                <Toolbar className={classes.toolbar}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Box
                            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}
                        >
                            {routes.map((route) => (
                                <div key={route.id}>
                                    <Button
                                        className={classes.menu}
                                        sx={{
                                            background: menuActived === route.id ? 'linear-gradient(45deg, #56BBF1 30%, #4D77FF 90%)' : null,
                                            boxShadow: menuActived === route.id ? '0 3px 5px 2px rgba(33, 203, 243, .3)' : null,
                                        }}
                                        id="fade-button"
                                        aria-controls={menuActived === route.id ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={menuActived === route.id ? 'true' : undefined}
                                        endIcon={
                                            !!route.child && route.child.length > 0
                                                ? menuActived === route.id ? <KeyboardArrowUpIcon />
                                                    : <KeyboardArrowDownIcon /> : null
                                        }
                                        onClick={(e) => handleClick(e, route)}
                                    >
                                        {route.name}
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={menuActived === route.id}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        {route.child && route.child.map((routeChild) => (
                                            <MenuItem key={routeChild.id} onClick={() => handleClose(routeChild)}>{routeChild.name}</MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            ))}
                        </Box>
                        <Box sx={{
                            width: '32ch',
                            display: 'flex', justifyContent: 'flex-end'
                        }}>
                            <SearchAppBar />
                        </Box>
                    </Box>
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
                                onClick={handleLogout}
                            >
                                {`Logout`}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                className={classes.signin}
                                variant='contained'
                                component={Link}
                                to='/auth'
                            >
                                {`Sign In`}
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar >
        </ElevationScroll >
    )
}

export default NavBar