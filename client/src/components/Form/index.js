import React, { useCallback, useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { createProduct, updateProduct } from '../../redux/actions/products'

import useStyles from './styles'

const Form = ({ currentId, handleCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()

    const productSelected = useSelector((state) => currentId ? state.products.data.find((product) => currentId === product._id) : null)
    const [user, setUser] = useState(null)
    const [productData, setProductData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if (productSelected) setProductData(productSelected)
    }, [productSelected])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updateProduct(currentId, { ...productData, name: user?.result?.name }))
        } else {
            dispatch(createProduct({ ...productData, name: user?.result?.name }))
        }
        clear()
    }

    const clear = () => {
        handleCurrentId(null)
        setProductData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    {`Please Sign In to create your own products and like other's products.`}
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'>
                    {`${currentId ? 'Editing' : 'Creating'} a Memory`}
                </Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label="Title"
                    fullWidth
                    value={productData.title}
                    onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={productData.message}
                    onChange={(e) => setProductData({ ...productData, message: e.target.value })}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label="Tags"
                    fullWidth
                    value={productData.tags}
                    onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setProductData({ ...productData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form