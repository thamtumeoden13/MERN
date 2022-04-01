import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { commentProduct } from '../../redux/actions/products'

import useStyles from './styles'

const CommentSection = ({ product }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))

    const commentsRef = useRef()

    const [comments, setComments] = useState(product?.comments)
    const [comment, setComment] = useState('')

    useEffect(() => {
        setComments(product?.comments)
    }, [product?.comments])

    const handleAddComment = async () => {
        const finalComment = `${user?.result.name}: ${comment}`
        const newProduccts = await dispatch(commentProduct(finalComment, product._id))

        setComments(newProduccts)
        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commnetsInnerContainer}>
                    <Typography gutterBottom variant='h6'>
                        {`COMMENT`}
                    </Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(':')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name &&
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            disabled={!comment}
                            variant='contained'
                            onClick={handleAddComment}
                        >
                            {`Comment`}
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentSection