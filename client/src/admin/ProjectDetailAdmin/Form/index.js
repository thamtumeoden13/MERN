import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import FileBase64 from 'react-file-base64'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import ChipInput from '../../../components/common/ChipInput'
import ComboBox from '../../../components/common/ComboBox'

import { isImageUrl } from '../../../utils'
import useStyles from './styles'

const initProjectDetailData = {
    name: '',
    title: '',
    thumbnail: '',
    imageUrl: '',
    tags: [],
    project: '',
    projectID: '',
    projectName: '',
    portfolio: '',
    portfolioID: '',
    portfolioName: '',
    investor: '',
    address: '',
    scale: '',
    function: '',
    expense: '',
    designTeam: '',
    designYear: '',
    estimatedTime: '',
}

const dataTexfield = [
    {
        name: 'investor',
        label: 'Chủ đầu tư',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'address',
        label: 'Địa chỉ',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'scale',
        label: 'Diện Tích',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'function',
        label: 'Quy Mô Dự Án',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'expense',
        label: 'Kinh phí',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'designTeam',
        label: 'Nhóm thiết kế',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'designYear',
        label: 'Năm thiết kế',
        variant: 'outlined',
        fullWidth: true,
    },
    {
        name: 'estimatedTime',
        label: 'Thời Gian Hoàn Thiện',
        variant: 'outlined',
        fullWidth: true,
    },
]

const Form = ({ currentId, handleCurrentId, onSubmit }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const projectDetailsSelected = useSelector((state) => currentId ? state.projectDetails.projectDetails.find((projectDetail) => currentId === projectDetail._id) : null)
    const { projects } = useSelector((state) => state.projects)

    const [state, setState] = useState({ isValidate: false })
    const [options, setOptions] = useState([])
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState(initProjectDetailData)
    const [errors, setErrors] = useState({})
    const [tags, setTags] = useState([])
    const [defaultValue, setDefaultValue] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        if (!!projects) {
            const options = projects.map(project => {
                return {
                    label: project.name,
                    value: project._id,
                }
            })
            setOptions(options)
        }
    }, [projects])

    useEffect(() => {
        if (projectDetailsSelected) {
            console.log('[projects]')
            const find = projects.find(e => { return e._id === projectDetailsSelected.project })
            if (!!find && Object.keys(find).length > 0) {
                setDefaultValue({ label: find.name, value: find._id })
                setFormData(projectDetailsSelected)
            }
        }
    }, [projectDetailsSelected, projects])

    const handleChangeValue = useCallback((name, value) => {
        setFormData({ ...formData, [name]: value })
        setState({ ...state, isValidate: false })
        setErrors({})
    }, [formData, state])

    const handleChangeComboBox = useCallback((name, comboBoxProject) => {
        setFormData({ ...formData, [name]: comboBoxProject.value || '' })
        setState({ ...state, isValidate: false })
    }, [formData, state])

    const handleChangeTag = useCallback((values) => {
        // console.log('handleChangeTag', values)
        setTags(values)
        setState({ ...state, isValidate: false })
        setErrors({})
    }, [state])

    const handleSubmit = (e) => {
        setState({ ...state, isValidate: true })

        if (!valiDateFormInput()) return

        if (onSubmit) {
            const findproject = projects.find(project => project._id === formData.project)
            console.log('[handleSubmit-findproject]', findproject)
            const data = {
                ...formData,
                tags: tags,
                projectID: formData.project,
                projectName: findproject.name,
                portfolio: findproject.portfolio,
                portfolioID: findproject.portfolioID,
                portfolioName: findproject.portfolioName,
            }
            onSubmit(data)
        }

        // clear()
    }

    const valiDateFormInput = () => {
        const errors = {}
        switch (true) {
            case !formData?.name || formData?.name.length === 0:
                errors.name = 'Please Input Name!'
                break;
            case !formData?.title || formData?.title.length === 0:
                errors.title = 'Please Input Title!'
                break;
            case !formData?.project || formData?.project.length === 0:
                errors.project = 'Please Choose a Project!'
                break;
            // case !tags || tags.length === 0:
            //     errors.tags = 'Please Input At Least One Tags!'
            //     break;
            case !formData?.thumbnail || formData?.thumbnail.length === 0:
                errors.thumbnail = 'Please Chosse A Image!'
                break;
            case !isImageUrl(formData?.thumbnail):
                errors.thumbnail = 'URL Is Not An Image!'
                break;
            case !formData?.imageUrl || formData?.imageUrl.length === 0:
                errors.imageUrl = 'Please Chosse A Image!'
                break;
            case !isImageUrl(formData?.imageUrl):
                errors.imageUrl = 'URL Is Not An Image!'
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
        setFormData(initProjectDetailData)
        setState({ ...state, isValidate: false })
        setTags([])
        setErrors({})
        setDefaultValue(null)
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

    console.log('[formData]', formData)

    return (
        <Box>
            <Paper className={classes.paper} elevation={6} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                <form
                    autoComplete='off'
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                >
                    <Typography variant='h6'>
                        {`${currentId ? 'Chỉnh Sửa' : 'Tạo Mới'} Bài Viết`}
                    </Typography>
                    <TextField
                        name='name'
                        variant='outlined'
                        label="Ten-goi-nho"
                        fullWidth
                        required
                        error={(!!state.isValidate && !!errors.name)}
                        helperText={errors.name || ''}
                        value={formData.name}
                        onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                    />
                    <TextField
                        name='title'
                        variant='outlined'
                        label="Tên gợi nhớ"
                        fullWidth
                        required
                        error={(!!state.isValidate && !!errors.title)}
                        helperText={errors.title || ''}
                        value={formData.title}
                        onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                    />
                    <>
                        <ComboBox
                            name='project'
                            label='Dự án'
                            placeholder='Nhập dự án'
                            required={true}
                            options={options}
                            defaultValue={defaultValue}
                            onChange={handleChangeComboBox}
                        />
                        {!!errors.project &&
                            <div className={classes.errorFileInput}>
                                {errors.project}
                            </div>
                        }
                    </>
                    <>
                        <ChipInput
                            label={'Nhãn'}
                            placeholder={'nhập dán nhãn...'}
                            defaultValue={formData.tags}
                            onChangeValue={handleChangeTag}
                        />
                        {!!errors.tags &&
                            <div className={classes.errorFileInput}>
                                {errors.tags}
                            </div>
                        }
                    </>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center',
                            flex: 1,
                        }}>
                            <Avatar
                                sx={{ mx: 1 }}
                                alt={'anh-thu-nho'}
                                src={formData.thumbnail}
                            />
                            <ComboBox
                                name='thumbnail'
                                label='Ảnh thu nhỏ'
                                placeholder='nhập ảnh thu nhỏ...'
                                required={true}
                                options={[]} //top100Films
                                defaultValue={formData.thumbnail}
                                defaultInputValue={formData.thumbnail}
                                // onChange={handleChangeComboBox}
                                onInputChange={handleChangeValue}
                            />
                        </Box>
                        {!!errors.thumbnail &&
                            <div className={classes.errorFileInput}>
                                {errors.thumbnail}
                            </div>
                        }
                    </Box>
                    <Box sx={{ width: '100%', }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center',
                            flex: 1,
                        }}>
                            <Avatar
                                sx={{ mx: 1 }}
                                alt={'duong-dan-anh'}
                                src={formData.imageUrl}
                            />
                            <ComboBox
                                name='imageUrl'
                                label='Đường dẫn ảnh'
                                placeholder='Nhập đường dẫn ảnh'
                                required={true}
                                options={[]} //top100Films
                                defaultValue={formData.imageUrl}
                                defaultInputValue={formData.imageUrl}
                                // onChange={handleChangeComboBox}
                                onInputChange={handleChangeValue}
                            />
                        </Box>
                        {!!errors.imageUrl &&
                            <div className={classes.errorFileInput}>
                                {errors.imageUrl}
                            </div>
                        }
                    </Box>
                    {dataTexfield.map(textfield => (
                        <TextField
                            name={textfield.name}
                            variant={textfield.variant}
                            label={textfield.label}
                            fullWidth={textfield.fullWidth}
                            error={(!!state.isValidate && !!errors[textfield.name])}
                            helperText={errors[textfield.name] || ''}
                            value={formData[textfield.name]}
                            onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                        />
                    ))}
                </form>
            </Paper>
            <Paper className={classes.paperAction} elevation={0} sx={{ mt: 2, }} >
                <Box sx={{ display: 'flex', }}>
                    <Button
                        className={classes.buttonSubmit}
                        variant='contained'
                        color='primary'
                        size='lagre'
                        type='button'
                        fullWidth
                        onClick={handleSubmit}
                    >
                        {`Xác Nhận`}
                    </Button>
                    <Button
                        className={classes.buttonClear}
                        variant='contained'
                        color='error'
                        size='lagre'
                        fullWidth
                        onClick={clear}
                    >
                        {`Làm Mới`}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Form
