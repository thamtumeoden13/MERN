import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import { getProjectDetails, createProjectDetail, updateProjectDetail, deleteProjectDetail } from '../../redux/actions/projectDetails'
import { getProjects } from '../../redux/actions/projects'

// import Products from '../Products';
import Form from './Form';
import ProjectDetailTableList from './ProjectDetailTableList'
import SlateEditor from '../../components/common/SlateEditor';

import useStyles from './styles'

const ProjectDetailAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)
    const projectDetailSelected = useSelector((state) => currentId ? state.projectDetails.projectDetails.find((project) => currentId === project._id) : null)
    const initialValue = useMemo(() => !!projectDetailSelected && !!projectDetailSelected.description ? JSON.parse(projectDetailSelected.description) : null, [projectDetailSelected])

    useEffect(() => {
        dispatch(getProjectDetails())
        dispatch(getProjects())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setIsEdit(!isEdit)
        setCurrentId(id)
    }

    const handleDetail = (id) => {
        navigate(`/projectDetails/${id}`)
    }

    const handleRemove = (ids) => {
        console.log('[handleRemove-ids]', ids.toString())
        dispatch(deleteProjectDetail(ids.toString()))
    }

    const handleSubmitForm = (data) => {
        if (!!currentId) {
            console.log('[updateProjectDetail]', data)
            dispatch(updateProjectDetail(currentId, { ...data, description: description, createdByName: user?.result?.name }))
        } else {
            console.log('[createProjectDetail]', data)
            dispatch(createProjectDetail({ ...data, description: description, createdByName: user?.result?.name }))
        }
    }

    const handleChangeDescription = (description) => {
        // console.log('handleChangeDescription', description)
        setDescription(description)
    }

    console.log('[projectDetails]', projectDetails)

    return (
        <Grow in>
            <Container maxWidth='xl' sx={{ mt: 15 }}>
                <Grid container display='flex' flexDirection='column' spacing={3}>
                    <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={8} >
                            <ProjectDetailTableList
                                data={projectDetails}
                                onViewDetail={handleDetail}
                                onEdit={handleCurrentId}
                                onRemove={handleRemove}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Form currentId={currentId} handleCurrentId={handleCurrentId} onSubmit={handleSubmitForm} />
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
                    <SlateEditor
                        isEdit={isEdit}
                        currentId={currentId}
                        handleCurrentId={handleCurrentId}
                        initialValue={initialValue}
                        onChange={handleChangeDescription}
                    />
                </Grid>
            </Container>
        </Grow>
    );
}

export default ProjectDetailAdmin;
