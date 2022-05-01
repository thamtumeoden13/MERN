import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material';

import CardList from '../CardList';

import useStyles from './styles'

const ProjectDetailList = ({ onViewDetail }) => {

    const { id } = useParams()

    const { projectDetails, isLoading } = useSelector((state) => state.projectDetails)

    const [data, setData] = useState({})

    console.log('ProjectDetailList', projectDetails)

    useEffect(() => {

        let data = {}
        if (!!projectDetails) {
            if (!!id) {
                const filter = projectDetails.filter(e => e.projectID == id)
                data = filter.reduce((r, a) => {
                    r[`${a.projectID}`] = [...r[`${a.projectID}`] || [], a];
                    return r;
                }, {});
            } else {
                data = projectDetails.reduce((r, a) => {
                    r[`${a.projectID}`] = [...r[`${a.projectID}`] || [], a];
                    return r;
                }, {});
            }
        }

        setData(data)

    }, [projectDetails,id])

    const handleViewDetail = (item) => {
        console.log('[item]',item)
        if (onViewDetail) {
            onViewDetail(item)
        }
    }

    if (!data && !isLoading) return null

    return (
        <Box>
            {Object.keys(data).map(function (key) {
                return (
                    <Box >
                        <CardList
                            data={data[key]}
                            // title={data[key][0].projectName}
                            itemCount={4}
                            onViewDetail={handleViewDetail}
                        />
                    </Box>
                )
            })
            }
        </Box>
    )
}

export default ProjectDetailList