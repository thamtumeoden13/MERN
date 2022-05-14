import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import useStyles from './styles'

const CardItem = ({ item, onClick }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const handleClickItem = () => {
        if (onClick) {
            onClick(item)
        }
    }

    return (
        <Card className={classes.cardContainer} elevation={0} onClick={handleClickItem}>
            <Box className={classes.card}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                        component='img'
                        className={classes.cardImage}
                        image={item.thumbnail}
                        alt='portfolio image'
                    />
                </Box>
                <Box className={classes.cardContent}>
                    <CardContent sx={{ padding: 1, mb: -3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' component='p'>
                            {item.title}
                        </Typography>
                        <Typography variant='body2' color="text.secondary" component="p">
                            {moment(new Date(item.createdAt)).format('HH:MM MMM DD, YYYY')}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    )
}

export default CardItem