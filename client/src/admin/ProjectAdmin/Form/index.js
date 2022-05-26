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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import ChipInput from '../../../components/common/ChipInput'
import ComboBox from '../../../components/common/ComboBox'
import NumberTextField from '../../../components/common/NumberFormatCustom'

import { isImageUrl } from '../../../utils'
import useStyles from './styles'

const initProjectData = {
    name: '',
    title: '',
    thumbnail: '',
    imageUrl: '',
    tags: [],
    portfolio: '',
    portfolioID: '',
    portfolioName: '',
    orderIndex: 1,
    onlyShowRouter: false,
}

const Form = ({ currentId, handleCurrentId, onSubmit }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const projectsSelected = useSelector((state) => currentId ? state.projects.projects.find((project) => currentId === project._id) : null)
    const { portfolios } = useSelector((state) => state.portfolios)

    const [state, setState] = useState({ isValidate: false })
    const [options, setOptions] = useState([])
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState(initProjectData)
    const [errors, setErrors] = useState({})
    const [tags, setTags] = useState([])
    const [defaultValue, setDefaultValue] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    useEffect(() => {
        if (!!portfolios) {
            const options = portfolios.map(portfolio => {
                return {
                    label: portfolio.name,
                    value: portfolio._id,
                }
            })
            setOptions(options)
        }
    }, [portfolios])

    useEffect(() => {
        if (projectsSelected) {
            const find = portfolios.find(e => { return e._id === projectsSelected.portfolio })
            if (!!find && Object.keys(find).length > 0) {
                setDefaultValue({ label: find.name, value: find._id })
                setFormData(projectsSelected)
            }
        }
    }, [projectsSelected])

    const handleChangeValue = useCallback((name, value) => {
        setFormData({ ...formData, [name]: value })
        setState({ ...state, isValidate: false })
        setErrors({})
    }, [formData, state])

    const handleChangeComboBox = useCallback((name, comboBoxPortfolio) => {
        setFormData({ ...formData, [name]: comboBoxPortfolio?.value || '' })
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
            const findPortfolio = portfolios.find(e => e._id === formData.portfolio)
            const data = {
                ...formData,
                tags: tags,
                portfolioID: formData.portfolio,
                portfolioName: findPortfolio.name,
            }
            // console.log('[handleSubmit-data]', data)
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
            case !formData?.portfolio || formData?.portfolio.length === 0:
                errors.portfolio = 'Please Choose a Portfolio!'
                break;
            // case !tags || tags.length === 0:
            //     errors.tags = 'Please Input At Least One Tags!'
            //     break;
            case !formData?.orderIndex || formData?.orderIndex <= 0:
                errors.orderIndex = 'Please Input OrderIndex!'
                break;
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
        setFormData(initProjectData)
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

    return (
        <Box>
            <Paper className={classes.paper} elevation={6}>
                <form
                    autoComplete='off'
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                >
                    <Typography variant='h6'>
                        {`${currentId ? 'Chỉnh Sửa' : 'Tạo Mới'} Dự Án`}
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
                            name='portfolio'
                            label='Hạn mục dự án'
                            placeholder='Nhập hạn mục dự án'
                            required={true}
                            options={options}
                            defaultValue={defaultValue}
                            onChange={handleChangeComboBox}
                        />
                        {!!errors.portfolio &&
                            <div className={classes.errorFileInput}>
                                {errors.portfolio}
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
                    <NumberTextField
                        name='orderIndex'
                        variant='outlined'
                        label="Thứ tự hiển thị"
                        fullWidth={true}
                        required={true}
                        error={(!!state.isValidate && !!errors.orderIndex)}
                        helperText={errors.orderIndex || ''}
                        defaultValue={formData.orderIndex}
                        onChangeValue={handleChangeValue}
                    />
                    <Box sx={{ width: '100%' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name='onlyShowRouter'
                                    checked={formData.onlyShowRouter}
                                    onChange={(e) => handleChangeValue(e.target.name, e.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Chỉ hiển thị Menu"
                            sx={{ marginLeft: '0' }}
                        />
                    </Box>
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
                </form>
            </Paper>
            <Paper className={classes.paperAction} elevation={0} sx={{ mt: 2 }}>
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
