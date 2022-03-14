import React, { useCallback } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { deleteProduct } from '../../../redux/actions/products'

import useStyles from './styles'

const Product = ({ product, handleCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id))
    }, [dispatch])

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={product.selectedFile}
                title={product.title}
            />
            <div className={classes.overlay}  >
                <Typography variant='h6'>{product.creator}</Typography>
                <Typography variant='body2'>{moment(product.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{ color: 'white', }}
                    size='small'
                    onClick={() => handleCurrentId(product._id)}
                >
                    <MoreHorizIcon fontSize='medium' />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    {product.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography
                className={classes.title}
                variant='h5'
                gutterBottom
            >
                {product.title}
            </Typography>
            <CardContent>
                <Typography
                    variant='h5'
                    gutterBottom
                >
                    {product.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => { }} >
                    <ThumbUpAltIcon fontSize='small' />
                    {`Like`}
                    {product.likeCount}
                </Button>
                <Button size='small' color='secondary' onClick={() => handleDelete(product._id)} >
                    <DeleteIcon fontSize='small' />
                    {`Delete`}
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product