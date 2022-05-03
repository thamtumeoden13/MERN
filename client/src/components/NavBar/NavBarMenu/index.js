import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { selectedRoute } from '../../../redux/actions/routes';

import useStyles from './styles'

const NavBarMenu = ({ routes }) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuActived, setMenuActived] = useState(-1);

    const handleClick = (event, menu) => {
        console.log('[handleClick-NavBarMenu]', menu)
        if (!!menu.child && menu.child.length > 0) {
            setAnchorEl(event.currentTarget);
            setMenuActived(menu._id)
        }
        if (!!menu.route) {
            handleRouteMenu(menu)
        }
    };

    const handleClose = (routeMenuChild) => {
        console.log('routeMenuChild', routeMenuChild)
        setAnchorEl(null);
        setMenuActived(-1)
        if (!!routeMenuChild && !!routeMenuChild.route) {
            handleRouteMenu(routeMenuChild)
        }
    };

    const handleRouteMenu = (item) => {
        navigate(`/${item.route.toLowerCase()}`)
        dispatch(selectedRoute(item))
    }

    return (
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', }, height: '100%' }}>
            {routes.map((route) => (
                <Box key={`NavBarMenu-${route._id}`} sx={{ mr: 1 }} >
                    <Button
                        id="fade-button"
                        className={classes.menu}
                        sx={{
                            background: menuActived === route._id ? 'linear-gradient(45deg, #f37121 30%, #f37121 90%)' : null,
                            boxShadow: menuActived === route._id ? '0 3px 5px 2px rgba(33, 203, 243, .3)' : null,
                            height: '100%'
                        }}
                        aria-controls={menuActived === route._id ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuActived === route._id ? 'true' : undefined}
                        endIcon={
                            !!route.child && route.child.length > 0
                                ? menuActived === route._id ? <KeyboardArrowUpIcon />
                                    : <KeyboardArrowDownIcon /> : null
                        }
                        onClick={(e) => handleClick(e, route)}
                    >
                        {route.title}
                    </Button>
                    <Menu
                        id={'primary-search-account-menu'}
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuActived === route._id}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {!!route.child && route.child.map((routeChild, index) => (
                            <Grow
                                in={true}
                                style={{ transformOrigin: '0 0 0' }}
                                {... { timeout: 500 + index * 500 }}
                            >
                                <MenuItem
                                    key={`NavBarMenuItem-${routeChild._id}`}
                                    onClick={() => handleClose(routeChild)}
                                >
                                    {routeChild.title}
                                </MenuItem>
                            </Grow>
                        ))}
                    </Menu>
                </Box>
            ))}
        </Box>
    )
}

export default NavBarMenu