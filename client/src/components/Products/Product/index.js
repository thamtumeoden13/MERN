import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { deleteProduct, likeProduct } from '../../../redux/actions/products'

import useStyles from './styles'

const Product = ({ product, handleCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [likes, setLikes] = useState(product?.likes)

    const userId = useMemo(() => { return (user?.result?.googleId || user?.result?._id) }, [user?.result?.googleId, user?.result?._id])
    const hasLikedProduct = useMemo(() => {
        return product?.likes.find((like) => like === userId) || false
    }, [product?.likes, userId])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id))
    }, [dispatch])

    const handleLike = useCallback((id) => {
        dispatch(likeProduct(id))
        if (hasLikedProduct) {
            setLikes(product.likes.filter((id) => id !== userId))
        } else {
            setLikes([...product.likes, userId])
        }
    }, [dispatch, hasLikedProduct, userId])

    const handleOpenDetail = () => {
        navigate(`/products/${product._id}`)
    }

    const Likes = () => {
        let render
        if (likes.length > 0) {
            render = likes.find((like) => like === userId)
                ? (
                    <>
                        <ThumbUpAltIcon fontSize='small' />
                        <div className={classes.likeContent} >
                            &nbsp; {likes.length > 2 ? `Your and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                        </div>
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlinedIcon fontSize='small' />
                        <div className={classes.likeContent}>
                            &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                        </div>
                    </>
                )
        } else {
            render = (
                <>
                    <ThumbUpAltOutlinedIcon fontSize='small' />
                    <div className={classes.likeContent}>
                        &nbsp; {`Like`}
                    </div>
                </>)
        }
        return render
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