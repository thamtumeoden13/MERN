import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';

import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from '../../redux/actions/portfolios'

// import Products from '../Products';
import Form from './Form';
import PortfolioTableList from './PortfolioTableList'
import SlateEditor from '../../components/common/SlateEditor';
import NavBarAuth from '../../components/NavBar/NavBarAuth';
import AlertDialog from '../../components/common/Dialog/AlertDialog';
import ListTitle from '../../components/ListTitle';

import { dataSubMenu } from '../../api/constants'
import useStyles from './styles'

const PortfolioAdmin = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { portfolios, isLoading } = useSelector((state) => state.portfolios)

    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(null)
    const [description, setDescription] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [dialog, setDialog] = useState({
        open: false,
        value: ''
    })

    const portfolioSelected = useSelector((state) => currentId ? state.portfolios.portfolios.find((project) => currentId === project._id) : null)
    const initialValue = useMemo(() => !!portfolioSelected && !!portfolioSelected.description ? JSON.parse(portfolioSelected.description) : null, [portfolioSelected])

    useEffect(() => {
        dispatch(getPortfolios())
    }, [dispatch])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleCurrentId = (id) => {
        setIsEdit(!isEdit)
        setCurrentId(id)
    }

    const handleDetail = (item) => {
        // navigate(`/han-muc-du-an/du-an/${item._id}`)
        window.open(`/han-muc-du-an/du-an/${item._id}`, { target: '_blank' })
    }

    const handlePreRemove = (ids) => {
        // console.log('[handlePreRemove-ids]', ids.toString())
        setDialog({ open: true, value: ids.toString() })
    }

    const handleRemove = () => {
        // console.log('[handleRemove-ids]', dialog.value.toString())
        dispatch(deletePortfolio(dialog.value.toString()))
        handleReject()
    }

    const handleSubmitForm = (data) => {
        if (!!currentId) {
            // console.log('[updatePortfolio]', data)
            dispatch(updatePortfolio(currentId, { ...data, description: description, createdByName: user?.result?.name }))
        } else {
            // console.log('[createPortfolio]', data)
            dispatch(createPortfolio({ ...data, description: description, createdByName: user?.result?.name }))
        }
    }

    const handleChangeDescription = (description) => {
        // console.log('handleChangeDescription', description)
        setDescription(description)
    }

    const handleReject = () => {
        setDialog(prev => { return { ...prev, open: false } })
    }

    const handleClickItem = (item) => {
        navigate(`${item.route}`)
    }

    // console.log('[portfolios]', portfolios)

    return (
        <Box sx={{ pt: 10 }}>
            <AlertDialog
                title={'Xoá Hạn Mục Dự Án'}
                description={`Bạn Có Chắc Chắn Muốn Xoá!!!`}
                open={dialog.open}
                onAccept={handleRemove}
                onReject={handleReject}
            />
            <NavBarAuth />
            <Box sx={{ height: 64, marginLeft: 2 }}>
                <ListTitle data={dataSubMenu} onClick={handleClickItem} />
            </Box>
            <Grow in>
                <Container maxWidth='xl'>
                    <Grid container display='flex' flexDirection='column' spacing={3}>
                        <Grid className={classes.gridContainer} container item justifyContent='space-between' alignItems='stretch' spacing={3}>
                            <Grid item xs={12} sm={6} md={8} >
                                <PortfolioTableList
                                    data={portfolios}
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

export default PortfolioAdmin;