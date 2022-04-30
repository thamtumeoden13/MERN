import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import useStyles from './styles'

const NavBarAuthComponent = ({ user, handleLogout }) => {
    const classes = useStyles()

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1
        }}>
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
        </Box>
    )
}

export default NavBarAuthComponent