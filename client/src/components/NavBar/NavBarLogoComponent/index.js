import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import imageLogo_Green from '../../../assets/imageLogo_Green.jpeg'

import useStyles from './styles'

const MenuLogoComponent = ({}) => {
    const classes = useStyles()

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <Link to="/" className={classes.brandContainer} >
                <Paper
                    elevation={4}
                    sx={{
                        display: { xs: 'none', md: 'block', sm: 'block' },
                        mr: 1,
                        width: {
                            sm: 48, // theme.breakpoints.up('sm')
                            md: 64, // theme.breakpoints.up('md')
                        },
                        height: {
                            sm: 48, // theme.breakpoints.up('sm')
                            md: 64, // theme.breakpoints.up('md')
                        },
                        borderRadius: 5
                    }}
                >
                    <img src={imageLogo_Green} alt="iconLogo" height="100%" style={{ borderRadius: 5 }} />
                </Paper>
            </Link>
            <Typography
                variant="h6"
                component="h5"
                noWrap
                sx={{ display: { xs: 'none', md: 'block' }, color: '#56BBF1' }}
            >
                {`SUNDAY-TV`}
            </Typography>
        </Box>
    )
}

export default MenuLogoComponent