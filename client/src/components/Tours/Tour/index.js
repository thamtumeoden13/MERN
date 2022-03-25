import React, { useState } from 'react'
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

const Tour = ({ tour }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [expanded, setExpanded] = useState(false);

    const handleOpenDetail = () => {
        navigate(`/tours/${tour.id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleOpenDetail}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={tour.name}
                subheader={`${tour.duration} Hours`}
            />
            <CardMedia
                component="img"
                height="194"
                image={tour.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {tour.description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        // mt: 3,
                    }}
                >
                    <Rating name="half-rating" defaultValue={tour.rating} precision={0.5} size='small' />
                    <Typography variant='body2' component='p' marginLeft={2}>{tour.rating}</Typography>
                    <Typography variant='body3' component='p' marginLeft={2}>{`(${tour.numberOfReviews} reviews)`}</Typography>
                </Box>
                <Typography variant='h6' component='h4' marginTop={0}>
                    {`${tour.price}$`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Tour