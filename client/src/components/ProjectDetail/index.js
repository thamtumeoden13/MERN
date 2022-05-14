import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import ProjectAlbums from './ProjectAlbum'
import ProjectGeneral from './ProjectGeneral'
import PasteHtmlComponent from '../common/PasteHtml'

import useStyles from './styles'

const ProjectDetailComponent = () => {

    const classes = useStyles()

    const { projectDetail, isLoading } = useSelector((state) => state.projectDetails)

    const [description, setDescription] = useState(null)

    useEffect(() => {
        if (!!projectDetail && Object.keys(projectDetail).length > 0) {
            setDescription(JSON.parse(projectDetail.description))
        }
    }, [projectDetail])

    return (
        <Grid className={classes.gridContainer} container spacing={3}>
            <Grid item xs={12} sm={12} md={9}>
                <ProjectGeneral />
                <PasteHtmlComponent initialValue={description} readOnly={true} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                <ProjectAlbums />
            </Grid>
        </Grid>
    )
}

export default ProjectDetailComponent