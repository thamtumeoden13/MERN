import React from 'react'
import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
                <CardMedia
                    component='img'
                    height='194'
                    image={item.thumbnail}
                    alt='portfolio image'
                />
                <Box className={classes.cardContent}>
                    <CardContent>
                        {/* <Typography variant='body1' color={'text.secondary'}>
                            {item.name}
                        </Typography> */}
                        <Typography variant='body2' component='p' paragraph>
                            {item.title}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    )
}

export default CardItem