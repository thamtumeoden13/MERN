import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { routes } from '../../../constants/routers';
import useStyles from './styles'

const NavBarMenu = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuActived, setMenuActived] = useState(-1);


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


    const handleRouteMenu = (route) => {
        navigate(`/${route.toLowerCase()}`)
    }

    return (
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', }, }}>
            {routes.map((route) => (
                <Box key={`NavBarMenu-${route.id}`} >
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
                        id={'primary-search-account-menu'}
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuActived === route.id}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {route.child && route.child.map((routeChild) => (
                            <MenuItem key={`NavBarMenuItem-${routeChild.id}`} onClick={() => handleClose(routeChild)}>{routeChild.name}</MenuItem>
                        ))}
                    </Menu>
                </Box>
            ))}
        </Box>
    )
}

export default NavBarMenu