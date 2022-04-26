import React from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import useStyles from './styles'

const TitleItem = ({ item = { title: 'hi!' }, onClick }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const handleClickItem = () => {
        if (onClick) {
            onClick(item)
        }
    }

    return (
        <Box className={classes.cardContainer} elevation={0} onClick={handleClickItem}>
            <Box className={classes.cardContent} sx={{ pb: 0 }}>
                <Typography variant='body2' component='p'>
                    {item.title}
                </Typography>
            </Box>
        </Box>
    )
}

export default TitleItem