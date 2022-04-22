import React from 'react'
import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'

import ProjectAlbums from './ProjectAlbum'
import ProjectGeneral from './ProjectGeneral'
import PasteHtmlComponent from '../common/PasteHtml'

import useStyles from './styles'
import { initialValueLarge as initialValue } from '../../constants/dataEditor'

const ProjectDetailComponent = () => {

    const classes = useStyles()

    return (
        <Grid className={classes.gridContainer} container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
                <ProjectGeneral />
                <PasteHtmlComponent initialValue={initialValue} readOnly={true} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ProjectAlbums />
            </Grid>
        </Grid>
    )
}

export default ProjectDetailComponent