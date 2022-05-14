import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { getProjects, createProject, updateProject, deleteProject } from '../../redux/actions/projects'
import { getPortfolios } from '../../redux/actions/portfolios'

// import Products from '../Products';
import Form from './Form';
import ProjectTableList from './ProjectTableList'
import SlateEditor from '../../components/common/SlateEditor';
import NavBarAuth from '../../components/NavBar/NavBarAuth';
import AlertDialog from '../../components/common/Dialog/AlertDialog';

import useStyles from './styles'

const ProjectAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { projects, isLoading } = useSelector((state) => state.projects)

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [dialog, setDialog] = useState({
        open: false,
        value: ''
    })

    const projectSelected = useSelector((state) => currentId ? state.projects.projects.find((project) => currentId === project._id) : null)
    const initialValue = useMemo(() => !!projectSelected && !!projectSelected.description ? JSON.parse(projectSelected.description) : null, [projectSelected])

    useEffect(() => {
        dispatch(getPortfolios())
        dispatch(getProjects())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setIsEdit(!isEdit)
        setCurrentId(id)
    }

    const handleDetail = (item) => {
        navigate(`/han-muc-du-an/chi-tiet-du-an/${item._id}`)
    }

    const handlePreRemove = (ids) => {
        console.log('[handlePreRemove-ids]', ids.toString())
        setDialog({ open: true, value: ids.toString() })
    }

    const handleRemove = () => {
        // console.log('[handleRemove-dialog.value]', dialog.value.toString())
        dispatch(deleteProject(dialog.value.toString()))
    }

    const handleSubmitForm = (data) => {
        if (!!currentId) {
            // console.log('[updateProject]', data)
            dispatch(updateProject(currentId, { ...data, description: description, createdByName: user?.result?.name }))
        } else {
            // console.log('[createProject]', data)
            dispatch(createProject({ ...data, description: description, createdByName: user?.result?.name }))
        }
    }

    const handleChangeDescription = (description) => {
        // console.log('handleChangeDescription', description)
        setDescription(description)
    }

    const handleReject = () => {
        setDialog(prev => { return { ...prev, open: false } })
    }

    // console.log('[projects]', projects, initialValue)

    return (
        <Box sx={{ mt: 10 }}>
            <AlertDialog
                title={'Xoá Dự Án'}
                description={`Bạn Có Chắc Chắn Muốn Xoá!!!`}
                open={dialog.open}
                onAccept={handleRemove}
                onReject={handleReject}
            />
            <NavBarAuth />
            <Grow in>
                <Container maxWidth='xl'>
                    <Grid container display='flex' flexDirection='column' spacing={3}>
                        <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                            <Grid item xs={12} sm={6} md={8} >
                                <ProjectTableList
                                    data={projects}
                                    onViewDetail={handleDetail}
                                    onEdit={handleCurrentId}
                                    onRemove={handlePreRemove}
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
        </Box>
    );
}

export default ProjectAdmin;
