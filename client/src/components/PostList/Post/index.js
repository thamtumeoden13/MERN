import React from "react";
import moment from 'moment'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'

import useStyles from './styles'

export default function Post({ post }) {

    const classes = useStyles()

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>A</Avatar>}
                title={post.author}
                subheader={moment(post.updatedAt).format('HH:MM MMM DD, YYYY')}
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <CardMedia image={post.attachment} title="title" className={classes.media} />
            <CardContent>
                <Typography variant="h5" color="textPrimary">
                    {post.title}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <FavoriteIcon />
                    <Typography component="span" color="textSecondary">
                        {post.likeCount}
                    </Typography>
                </IconButton>
            </CardActions>
        </Card>
    )
}