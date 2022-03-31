import React, { useEffect, useMemo } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

import CommentSection from './CommentSection'

import { getProduct, getProductsBySearch } from '../../redux/actions/products'

import useStyles from './styles'

const ProductDetail = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const { id } = useParams()
    const { product, products, isLoading } = useSelector((state) => state.products)

    useEffect(() => {
        if (id) {
            dispatch(getProduct(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (!!product) {
            dispatch(getProductsBySearch({ search: 'none', tags: product?.tags.join(',') }))
        }
    }, [dispatch, product])

    const recommendedPosts = useMemo(() => {
        if (!!products && !!product) {
            return products.filter(({ _id }) => _id !== product._id)
        }
        return []
    }, [product, products])

    const handlerOpenProduct = (id) => {
        dispatch(getProduct(id))
    }

    if (!product) return null

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.paper} sx={{ display: 'flex', height: '39vh', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={'7em'} />
            </Paper>
        )
    }

    return (
        <Paper
            className={classes.paper}
            elevation={6}
        >
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{product.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{product.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{product.message}</Typography>
                    <Typography variant="h6">Created by: {product.name}</Typography>
                    <Typography variant="body1">{moment(product.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection product={product} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={product.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={product.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedOuterPosts}>
                        <div className={classes.recommendedInnerPosts}>
                            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => handlerOpenProduct(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                    <img src={selectedFile} alt='selectedFile' width="200px" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default ProductDetail