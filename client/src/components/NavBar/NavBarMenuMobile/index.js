import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import useStyles from './styles'
import { routes } from '../../../constants/routers';

const NavBarMenuMobile = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleClose = (routeMenuChild) => {
        if (!!routeMenuChild && !!routeMenuChild.route) {
            handleRouteMenu(routeMenuChild.route)
        }
    };


    const handleRouteMenu = (route) => {
        navigate(`/${route.toLowerCase()}`)
    }

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={'primary-search-account-menu-mobile'}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {routes.map((route) => (
                <MenuItem key={route.id} onClick={() => handleClose(route)}>{route.name}</MenuItem>
            ))}
        </Menu>
    )
}

export default NavBarMenuMobile