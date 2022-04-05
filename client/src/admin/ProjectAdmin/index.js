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

import { getProjects } from '../../redux/actions/projects'

// import Products from '../Products';
import Form from './Form';
import ProjectTableList from './ProjectTableList'

import useStyles from './styles'

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

    useEffect(() => {
        dispatch(getProjects(page))
    }, [dispatch])

    const handleCurrentId = (id) => {
        setCurrentId(id)
    }
    console.log({ projects })
    if (!projects.length && !isLoading) return null

    return (
        <Grow in>
            <Container maxWidth='xl' sx={{ mt: 15 }}>
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={8} >
                        <ProjectTableList data={projects} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Form currentId={currentId} handleCurrentId={handleCurrentId} />
                        {/* <Paper className={classes.pagination} elevation={6}>
                            <Pagination
                                page={page}
                            />
                        </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default ProjectAdmin;
