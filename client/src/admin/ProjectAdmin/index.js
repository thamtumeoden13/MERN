import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AppBar from '@mui/material/AppBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { getProjects, createProject, updateProject } from '../../redux/actions/projects'

// import Products from '../Products';
import Form from './Form';
import ProjectTableList from './ProjectTableList'

import useStyles from './styles'
import SlateEditor from '../../components/common/SlateEditor';
import { Box } from '@mui/material';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const ProjectAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const query = useQuery()

    const page = query.get('page') || 1

    const { projects, isLoading } = useSelector((state) => state.projects)

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }

    const handleSubmitForm = (data) => {
        console.log(data)
        if (!!currentId) {
            dispatch(updateProject(currentId, { ...data, description: description, name: user?.result?.name }))
        } else {
            dispatch(createProject({ ...data, description: description, name: user?.result?.name }, navigate))
        }
    }

    const handleChangeDescription = (description) => {
        console.log('handleChangeDescription', description)
    }

    console.log({ projects })
    if (!projects.length && !isLoading) return null

    return (
        <Grow in>
            <Container maxWidth='xl' sx={{ mt: 15 }}>
                <Grid container display='flex' flexDirection='column' spacing={3}>
                    <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={8} >
                            <ProjectTableList data={projects} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form currentId={currentId} handleCurrentId={handleCurrentId} onSubmit={handleSubmitForm} />
                            {/* <Paper className={classes.pagination} elevation={6}>
                            <Pagination
                                page={page}
                            />
                        </Paper> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}
                    sx={{
                        minHeight: '100vh',
                        margin: '10px 0',
                        backgroundColor: 'white',
                        boxShadow: '2px 4px 10px #888888'
                    }}
                >
                    <SlateEditor onChange={handleChangeDescription} />
                </Grid>
            </Container>
        </Grow>
    );
}

export default ProjectAdmin;
