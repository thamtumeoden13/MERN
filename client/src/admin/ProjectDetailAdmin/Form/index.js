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
    portfolio: '',
    investor: 'Chú xuân',
    address: 'Làng nhà mẫu khu đô thị Mỹ Gia, đường Phong châu, thôn Vĩnh Xuân, xã Vĩnh Thái, Tp. Nha Trang',
    scale: '5 Tầng',
    function: '4 Tầng + 1 Tum',
    expense: '2.800.000.000 VNĐ',
    designTeam: 'Sunday Art',
    designYear: '2022',
    estimatedTime: '6 Tháng',
}

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
            const find = projects.find(e => { return e._id == projectDetailsSelected.project })
            if (!!find && Object.keys(find).length > 0) {
                setDefaultValue({ label: find.name, value: find._id })
                setFormData(projectDetailsSelected)
            }
        }
    }, [projectDetailsSelected])

    const handleChangeValue = useCallback((name, value) => {
        setFormData({ ...formData, [name]: value })
        setState({ ...state, isValidate: false })
        setErrors({})
    }, [formData, state])

    const handleChangeComboBox = useCallback((name, comboBoxProject) => {
        const find = projects.find(project => project._id == comboBoxProject.value)
        const portfolioId = find.portfolio
        setFormData({ ...formData, project: comboBoxProject.value || '', portfolio: portfolioId })
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
            const data = { ...formData, tags: tags }
            onSubmit(data)
        }

        clear()
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
                    label="Name"
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
                    label="Title"
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
                        label='Project'
                        placeholder='input project'
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
                        label={'Search Tags'}
                        placeholder={'tags...'}
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
                            alt={'thumbnail'}
                            src={formData.thumbnail}
                        />
                        <ComboBox
                            name='thumbnail'
                            label='Thumbnail'
                            placeholder='input thumbnail'
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
                            alt={'imageUrl'}
                            src={formData.imageUrl}
                        />
                        <ComboBox
                            name='imageUrl'
                            label='ImageUrl'
                            placeholder='input imageUrl'
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
                <TextField
                    name='investor'
                    variant='outlined'
                    label="Investor"
                    fullWidth
                    error={(!!state.isValidate && !!errors.investor)}
                    helperText={errors.investor || ''}
                    value={formData.investor}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='address'
                    variant='outlined'
                    label="Address"
                    fullWidth
                    error={(!!state.isValidate && !!errors.address)}
                    helperText={errors.address || ''}
                    value={formData.address}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='scale'
                    variant='outlined'
                    label="Scale"
                    fullWidth
                    error={(!!state.isValidate && !!errors.scale)}
                    helperText={errors.scale || ''}
                    value={formData.scale}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='function'
                    variant='outlined'
                    label="Function"
                    fullWidth
                    error={(!!state.isValidate && !!errors.function)}
                    helperText={errors.function || ''}
                    value={formData.function}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='expense'
                    variant='outlined'
                    label="Expense"
                    fullWidth
                    error={(!!state.isValidate && !!errors.expense)}
                    helperText={errors.expense || ''}
                    value={formData.expense}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='designYear'
                    variant='outlined'
                    label="DesignYear"
                    fullWidth
                    error={(!!state.isValidate && !!errors.designYear)}
                    helperText={errors.designYear || ''}
                    value={formData.designYear}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='designTeam'
                    variant='outlined'
                    label="DesignTeam"
                    fullWidth
                    error={(!!state.isValidate && !!errors.designTeam)}
                    helperText={errors.designTeam || ''}
                    value={formData.designTeam}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <TextField
                    name='estimatedTime'
                    variant='outlined'
                    label="EstimatedTime"
                    fullWidth
                    error={(!!state.isValidate && !!errors.estimatedTime)}
                    helperText={errors.estimatedTime || ''}
                    value={formData.estimatedTime}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                />
                <Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='button'
                    fullWidth
                    onClick={handleSubmit}
                // disabled={!formData.name && !formData.title && !formData.description && !formData.tags.length}
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
