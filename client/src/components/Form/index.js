import React, { useCallback, useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { createProduct, updateProduct } from '../../redux/actions/products'

import useStyles from './styles'

const initErrors = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
}

const Form = ({ currentId, handleCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const productSelected = useSelector((state) => currentId ? state.products.products.find((product) => currentId === product._id) : null)
    const [user, setUser] = useState(null)
    const [productData, setProductData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const [state, setState] = useState({
        isValidate: false
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (productSelected) setProductData(productSelected)
    }, [productSelected])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleChangeValue = (name, value) => {
        setProductData({ ...productData, [name]: value })
        setState({ ...state, isValidate: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setState({ ...state, isValidate: true })

        if (!valiDateFormInput()) return

        if (!!currentId) {
            dispatch(updateProduct(currentId, { ...productData, name: user?.result?.name }))
        } else {
            dispatch(createProduct({ ...productData, name: user?.result?.name }, navigate))
        }
        clear()
    }

    const valiDateFormInput = () => {
        const errors = {}
        switch (true) {
            case !productData?.title || productData?.title.length === 0:
                errors.title = 'Please Input Title!'
                break;
            case !productData?.message || productData?.message.length === 0:
                errors.message = 'Please Input Message!'
                break;
            case !productData?.tags || productData.tags.length === 0:
                errors.tags = 'Please Input At Least One Tags!'
                break;
            case !productData?.selectedFile || productData?.selectedFile.length === 0:
                errors.selectedFile = 'Please Chosse A Image!'
                break;
        }

        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return false
        }
        return true
    }

    const clear = () => {
        handleCurrentId(null)
        setProductData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
        setState({ ...state, isValidate: false })
        setErrors({})
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={3}>
                <Typography variant='h6' align='center'>
                    {`Please Sign In to create your own products and like other's products.`}
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
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
                    required
                    error={(!!state.isValidate && !!errors.title)}
                    helperText={errors.title || ''}
                    value={productData.title}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    error={!!state.isValidate && !!errors.message}
                    helperText={errors.message || ''}
                    value={productData.message}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label="Tags"
                    fullWidth
                    required
                    error={!!state.isValidate && !!errors.tags}
                    helperText={errors.tags || ''}
                    value={productData.tags}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value.trim().length > 0 ? e.target.value.trim().split(',') : [])}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        name='selectedFile'
                        multiple={false}
                        onDone={({ base64 }) => handleChangeValue('selectedFile', base64)}
                    />
                    {!!errors.selectedFile &&
                        <div className={classes.errorFileInput}>
                            {errors.selectedFile}
                        </div>
                    }
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                    disabled={!productData.title && !productData.message && !productData.tags.length}
                >
                    {`Submit`}
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    size='small'
                    fullWidth
                    onClick={clear}
                >
                    {`Clear`}
                </Button>
            </form>
        </Paper>
    )
}

export default Form