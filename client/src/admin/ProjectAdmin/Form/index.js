import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import FileBase64 from 'react-file-base64'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'


import useStyles from './styles'

const initErrors = {
    name: '',
    title: '',
    tags: '',
    thumbnail: '',
    imageUrl: '',
}

const Form = ({ currentId, handleCurrentId, onSubmit }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const projectSelected = useSelector((state) => currentId ? state.projects.projects.find((project) => currentId === project._id) : null)
    const [user, setUser] = useState(null)
    const [projectData, setProjectData] = useState({
        name: 'Khách Sạn Và (+)',
        title: 'Mẫu Thiết Kế Trạm Dừng Chân 13x20m Đơn Giản Tiết Kiệm Chi Phí',
        thumbnail: 'https://images.pexels.com/photos/5841924/pexels-photo-5841924.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        imageUrl: 'https://images.pexels.com/photos/10027186/pexels-photo-10027186.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        tags: '',
    })
    const [state, setState] = useState({
        isValidate: false
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (projectSelected) setProjectData(projectSelected)
    }, [projectSelected])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleChangeValue = (name, value) => {
        setProjectData({ ...projectData, [name]: value })
        setState({ ...state, isValidate: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setState({ ...state, isValidate: true })

        if (!valiDateFormInput()) return

        if (onSubmit) {
            onSubmit({ ...projectData })
        }

        clear()
    }

    const valiDateFormInput = () => {
        const errors = {}
        switch (true) {
            case !projectData?.name || projectData?.name.length === 0:
                errors.name = 'Please Input Name!'
                break;
            case !projectData?.title || projectData?.title.length === 0:
                errors.title = 'Please Input Title!'
                break;
            case !projectData?.tags || projectData.tags.length === 0:
                errors.tags = 'Please Input At Least One Tags!'
                break;
            case !projectData?.thumbnail || projectData?.thumbnail.length === 0:
                errors.thumbnail = 'Please Chosse A Image!'
                break;
            case !projectData?.imageUrl || projectData?.imageUrl.length === 0:
                errors.imageUrl = 'Please Chosse A Image!'
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
        setProjectData({
            name: '',
            title: '',
            message: '',
            tags: '',
            thumbnail: '',
            imageUrl: '',
        })
        setState({ ...state, isValidate: false })
        setErrors({})
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={3}>
                <Typography variant='h6' align='center'>
                    {`Please Sign In to create your own projects and like other's projects.`}
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
                    {`${currentId ? 'Editing' : 'Creating'} a Portfolio`}
                </Typography>
                <TextField
                    name='name'
                    variant='outlined'
                    label="Name"
                    fullWidth
                    required
                    error={(!!state.isValidate && !!errors.name)}
                    helperText={errors.name || ''}
                    value={projectData.name}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='title'
                    variant='outlined'
                    label="Title"
                    fullWidth
                    required
                    error={(!!state.isValidate && !!errors.title)}
                    helperText={errors.title || ''}
                    value={projectData.title}
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
                    value={projectData.tags}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value.trim().length > 0 ? e.target.value.trim().split(',') : [])}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        name='thumbnail'
                        multiple={false}
                        onDone={({ base64 }) => handleChangeValue('thumbnail', base64)}
                    />
                    {!!errors.thumbnail &&
                        <div className={classes.errorFileInput}>
                            {errors.thumbnail}
                        </div>
                    }
                </div>
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        name='imageUrl'
                        multiple={false}
                        onDone={({ base64 }) => handleChangeValue('imageUrl', base64)}
                    />
                    {!!errors.imageUrl &&
                        <div className={classes.errorFileInput}>
                            {errors.imageUrl}
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
                // disabled={!projectData.name && !projectData.title && !projectData.description && !projectData.tags.length}
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