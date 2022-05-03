import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { css } from '@emotion/css'

import imageLogo_Green from '../../../assets/imageLogo_Green.jpeg'
import logo_artsunday from '../../../assets/logo-artsunday-1.png'

import useStyles from './styles'

const MenuLogoComponent = ({ }) => {
    const classes = useStyles()

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Link to="/" className={classes.brandContainer} >
                <Paper
                    sx={{
                        display: 'block',
                        mr: 1,
                        backgroundColor: 'transparent'
                    }}
                    elevation={0}
                >
                    <img
                        src={logo_artsunday}
                        className={css`
                            display: block;
                            max-width: 200px;
                            max-height: 10em;
                            `
                        }
                    />
                </Paper>
            </Link>
        </Box >
    )
}

export default MenuLogoComponent