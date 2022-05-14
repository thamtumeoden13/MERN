import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { css } from '@emotion/css'

import logo_round_artsunday from '../../../assets/logo-round-artsunday.png'
import logo_artsunday from '../../../assets/logo-artsunday-1.png'

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const NavBarDrawerMobile = ({ routes = [], drawer = false, toggleDrawer }) => {
    const theme = useTheme();
    const navigate = useNavigate()

    const [open, setOpen] = useState({})

    const handleClick = (item) => {
        if (!!item.child && item.child.length > 0) {
            setOpen(prev => { return { ...prev, [item._id]: !prev[item._id] } })
            return
        }
        handleRouteMenu(item)
        // navigate(`/han-muc-du-an/tim-kiem?portfolioname=${item.name}`)
        toggleDrawer()
    };

    const handleSubClick = (subItem) => {
        handleRouteMenu(subItem)
        // navigate(`/han-muc-du-an/tim-kiem?projectname=${subItem.name}`)
        toggleDrawer()
    };

    const handleRouteMenu = (item) => {
        navigate(`/${item.route.toLowerCase()}`)
    }


    return (
        <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#202530',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawer}
            >
                <DrawerHeader>
                    <img
                        src={logo_artsunday}
                        className={css`
                            display: block;
                            max-width: 120px;
                            max-height: 10em;
                            `
                        }
                    />
                    <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {routes.map((item, index) => (
                        <Box key={item._id}>
                            <ListItemButton onClick={() => handleClick(item)}>
                                {/* <ListItemIcon sx={{ color: 'white' }}>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon> */}
                                <ListItemText primary={item.title} sx={{ color: 'white', fontSize: 14 }} />
                                {item.child.length > 0 &&
                                    <>
                                        {!!open && open[item._id] ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
                                    </>
                                }
                            </ListItemButton>
                            {item.child.length > 0 &&
                                <Collapse in={!!open[item._id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.child.map((item2, index2) => (
                                            <ListItem key={item2._id}>
                                                <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubClick(item2)}>
                                                    {/* <ListItemIcon sx={{ color: 'white' }}>
                                                        <StarBorder />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary={item2.title} sx={{ color: 'white', fontSize: 12 }} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            }
                        </Box>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flex: 1, mb: 2 }}>
                    <img
                        src={logo_round_artsunday}
                        style={{
                            width: '100%',
                            maxWidth: '80px',
                        }}
                    />
                </Box>
            </Drawer>
        </Box>
    );
}

export default NavBarDrawerMobile