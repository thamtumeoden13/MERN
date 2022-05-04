import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Portfolios from '../../components/Portfolios'
import QuiltedImageList from '../../components/common/Imagelist/ImageQuilted'
import BreadcrumbComponent from '../../components/Breadcrumbs';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';
import PasteHtmlComponent from '../../components/common/PasteHtml';
import SearchTextInput from '../../components/common/SearchTextInput';
import SearchSelect from '../../components/common/SearchSelect';

import {
    getProjectDetails, getProjectDetail,
    getProjectDetailsByPortfolioID, getProjectDetailsByProjectID,
    getProjectDetailSearchByPortfolioName,
    getProjectDetailSearchByProjectName
} from '../../redux/actions/projectDetails'

import { useQuery, useTitle } from '../../utils';

const PortfolioPage = () => {

    useTitle('Art-Sunday | Hạn Mục Dự Án');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const searchQueryPortfolioName = query.get('portfolioname')
    const searchQueryprojectName = query.get('projectname')

    const { projects, } = useSelector((state) => state.projects)
    const { projectDetails, } = useSelector((state) => state.projectDetails)

    const { id, projectID, projectDetailID } = useParams()
    console.log('[id, projectID, projectDetailID]', id, projectID, projectDetailID)

    const [description, setDescription] = useState(null)
    const [selectResult, setSelectResult] = useState([])
    const [selectValue, setSelectValue] = useState('')
    const [imageQuiltedList, setImageQuiltedList] = useState([])

    useEffect(() => {
        dispatch(getProjectDetails())
        if (!!id) {
            dispatch(getProjectDetail(id))
            return
        }

        if (!!projectID) {
            dispatch(getProjectDetailsByPortfolioID(projectID))
            return
        }

        if (!!projectDetailID) {
            dispatch(getProjectDetailsByProjectID(projectDetailID))
            return
        }
    }, [dispatch, id, projectID, projectDetailID])

    useEffect(() => {
        if (!!searchQueryPortfolioName) {
            dispatch(getProjectDetailSearchByPortfolioName(searchQueryPortfolioName))
            return
        }
        if (!!searchQueryprojectName) {
            dispatch(getProjectDetailSearchByProjectName(searchQueryprojectName))
            return
        }
    }, [dispatch, searchQueryPortfolioName, searchQueryprojectName])

    useEffect(() => {
        if (!!searchQueryprojectName) {
            setSelectValue(searchQueryprojectName)
            const find = projects.find(e => e.name === searchQueryprojectName)
            if (!!find) {
                setDescription(JSON.parse(find.description))
            }
            return
        }
        setSelectValue('')
    }, [searchQueryprojectName, projects])

    useEffect(() => {
        if (!!projectDetails && !!projects) {
            const selectResult = projects.map(e => {
                const element = { ...e }
                const child = projectDetails.filter(f => f.projectID == e._id)
                return {
                    ...element,
                    count: child.length
                }
            })
            setSelectResult([...selectResult])
        }
    }, [projects, projectDetails])

    useEffect(() => {
        if (!!projectDetails) {
            const imageQuiltedList = projectDetails.slice(0, 6)
            console.log('[imageQuiltedList]', imageQuiltedList)
            const newImageQuiltedList = imageQuiltedList.map((e, i) => {
                return {
                    _id: e._id,
                    img: e.imageUrl,
                    title: e.title,
                    subtitle: e.address,
                    rows: i == 0 ? 3 : i == 3 ? 2 : 1,
                    cols: i == 3 ? 1 : 1
                }
            })
            console.log('[newImageQuiltedList]', newImageQuiltedList)
            setImageQuiltedList(newImageQuiltedList)
        }
    }, [projectDetails])

    const handleViewDetail = (item) => {
        navigate(`/chi-tiet-du-an/${item._id}`)
    }

    const handleSearch = (search) => {
        console.log('[handleSearch]', search)
        navigate(`/tim-kiem?searchQuery=${search}`)
    }

    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Container maxWidth={'xl'} sx={{ minHeight: '100vh' }}>
                <Box>
                    <QuiltedImageList height={420} data={imageQuiltedList} onClick={handleViewDetail} />
                </Box>
                <Box sx={{ marginY: 4 }}>
                    <BreadcrumbComponent />
                </Box>
                <Box>
                    <Grid container spacing={3} sx={{ minHeight: '100vh', }}>
                        <Box sx={{
                            display: { xs: 'none', sm: 'none', md: 'flex' }, flexDirection: 'column',
                            padding: 2,
                        }}>
                            <Grid item md={3} >
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    width: 240
                                }}>
                                    <SearchTextInput
                                        onSearch={handleSearch}
                                    />
                                    <SearchSelect
                                        result={selectResult}
                                        count={projectDetails.length}
                                    />
                                </Box>
                            </Grid>
                        </Box>
                        <Grid item xs={12} sm={12} md={9}>
                            <Portfolios onViewDetail={handleViewDetail} />
                        </Grid>
                    </Grid>
                    {!!description && <PasteHtmlComponent initialValue={description} readOnly={true} />}
                </Box>
            </Container >
            <AppFooter />
        </Box >
    )
}

export default PortfolioPage