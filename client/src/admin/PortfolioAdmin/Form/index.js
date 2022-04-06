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
        title: 'Mẫu Thiết Kế Biệt Thự',
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
                    type='button'
                    fullWidth
                    onClick={handleSubmit}
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


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', value: 1994 },
    { label: 'The Godfather', value: 1972 },
    { label: 'The Godfather: Part II', value: 1974 },
    { label: 'The Dark Knight', value: 2008 },
    { label: '12 Angry Men', value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: 'Pulp Fiction', value: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        value: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', value: 1966 },
    { label: 'Fight Club', value: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        value: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        value: 1980,
    },
    { label: 'Forrest Gump', value: 1994 },
    { label: 'Inception', value: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        value: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", value: 1975 },
    { label: 'Goodfellas', value: 1990 },
    { label: 'The Matrix', value: 1999 },
    { label: 'Seven Samurai', value: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        value: 1977,
    },
    { label: 'City of God', value: 2002 },
    { label: 'Se7en', value: 1995 },
    { label: 'The Silence of the Lambs', value: 1991 },
    { label: "It's a Wonderful Life", value: 1946 },
    { label: 'Life Is Beautiful', value: 1997 },
    { label: 'The Usual Suspects', value: 1995 },
    { label: 'Léon: The Professional', value: 1994 },
    { label: 'Spirited Away', value: 2001 },
    { label: 'Saving Private Ryan', value: 1998 },
    { label: 'Once Upon a Time in the West', value: 1968 },
    { label: 'American History X', value: 1998 },
    { label: 'Interstellar', value: 2014 },
    { label: 'Casablanca', value: 1942 },
    { label: 'City Lights', value: 1931 },
    { label: 'Psycho', value: 1960 },
    { label: 'The Green Mile', value: 1999 },
    { label: 'The Intouchables', value: 2011 },
    { label: 'Modern Times', value: 1936 },
    { label: 'Raiders of the Lost Ark', value: 1981 },
    { label: 'Rear Window', value: 1954 },
    { label: 'The Pianist', value: 2002 },
    { label: 'The Departed', value: 2006 },
    { label: 'Terminator 2: Judgment Day', value: 1991 },
    { label: 'Back to the Future', value: 1985 },
    { label: 'Whiplash', value: 2014 },
    { label: 'Gladiator', value: 2000 },
    { label: 'Memento', value: 2000 },
    { label: 'The Prestige', value: 2006 },
    { label: 'The Lion King', value: 1994 },
    { label: 'Apocalypse Now', value: 1979 },
    { label: 'Alien', value: 1979 },
    { label: 'Sunset Boulevard', value: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        value: 1964,
    },
];
