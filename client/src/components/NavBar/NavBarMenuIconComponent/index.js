import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MenuIconComponent = ({ toggleDrawer }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <IconButton
                size="xlarge"
                edge="start"
                aria-label="open drawer"
                sx={{ display: { xs: 'block', md: 'none' }, mr: 1, color: 'white' }}
                onClick={(e) => toggleDrawer(true, e)}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    )
}

export default MenuIconComponent