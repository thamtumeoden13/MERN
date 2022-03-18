import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { deleteProduct, likeProduct } from '../../../redux/actions/products'

import useStyles from './styles'

const Product = ({ product, handleCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id))
    }, [dispatch])

    const handleLike = useCallback((id) => {
        dispatch(likeProduct(id))
    }, [dispatch])

    const handleOpenDetail = () => {
        navigate(`/products/${product._id}`)
    }

    const Likes = () => {
        if (product.likes.length > 0) {
            return product.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <>
                        <ThumbUpAltIcon fontSize='small' />&nbsp; {product.likes.length > 2 ? `Your and ${product.likes.length - 1} others` : `${product.likes.length} like${product.likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlinedIcon fontSize='small' />&nbsp; {product.likes.length} {product.likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                )
        }
        return <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp; {`Like`}</>
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} component="span" onClick={handleOpenDetail}>
                <CardMedia
                    className={classes.media}
                    image={product.selectedFile || 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    title={product.title}
                />
                <div className={classes.overlay}  >
                    <Typography variant='h6'>{product.name}</Typography>
                    <Typography variant='body2'>{moment(product.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === product.creator || user?.result?._id === product.creator) &&
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: 'white', }}
                            size='small'
                            onClick={() => handleCurrentId(product._id)}
                        >
                            <MoreHorizIcon fontSize='medium' />
                        </Button>
                    </div>
                }
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
                        variant='body2'
                        gutterBottom
                        color='textSecondary'
                        component='p'
                    >
                        {product.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button
                    size='small'
                    color='primary'
                    disabled={!user?.result}
                    onClick={() => handleLike(product._id)}
                >
                    <Likes />
                </Button>
                {(user?.result?.googleId === product.creator || user?.result?._id === product.creator) &&
                    <Button size='small' color='secondary' onClick={() => handleDelete(product._id)} >
                        <DeleteIcon fontSize='small' />
                        {`Delete`}
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Product