import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import logo_round_artsunday from '../../assets/logo-round-artsunday.png'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

import { getProjects, } from '../../redux/actions/projects'

import useStyles from './styles'

const AppFooter = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { projects, isLoading } = useSelector((state) => state.projects)

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    const handleClick = (project) => {
        console.info('You clicked the Chip.', project);
        // navigate(`/han-muc-du-an/chi-tiet-du-an/${project._id}`)
        navigate(`/han-muc-du-an/tim-kiem?projectname=${project.name}`)
    };

    console.log('[AppFooter]', projects)

    return (
        <Typography
            component="footer"
            sx={{ backgroundColor: 'red', display: 'flex', bgcolor: '#202530', width: '100vw' }}
        >
            <Container sx={{ display: 'flex', }} maxWidth='xl'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                variant="h5" component="div"
                                sx={{ paddingY: 1, color: 'white', }}
                            >
                                {`Thông Tin Liên Hệ`}
                            </Typography>
                            <Divider light sx={{ width: 80, height: 2, backgroundColor: 'orange' }} />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" component="div" sx={{ color: 'white' }} >
                                {`ArtSunday - BD`}
                            </Typography>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', }}>
                                <AddLocationAltOutlinedIcon sx={{ marginRight: 1, color: 'white' }} />
                                <Typography variant="body2" component="div" sx={{ color: 'white' }} >
                                    {`Đ/C: 17/13 Huỳnh Văn Luỹ, P.Phú Lợi, TP.Thủ Dầu Một, T.Bình Dương.`}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', }}>
                                <PhoneOutlinedIcon sx={{ marginRight: 1, color: 'white' }} />
                                <Typography variant="body2" component="div" sx={{ color: 'white' }} >
                                    {`SĐT: 0904 177 100.`}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={9}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="h5" component="div"
                                        sx={{ paddingY: 1, color: 'white', }}
                                    >
                                        {`Dự Án`}
                                    </Typography>
                                    <Divider light sx={{ width: 80, height: 2, backgroundColor: 'orange' }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0.5,
                                        m: 0,
                                        backgroundColor: 'transparent'
                                    }}
                                    component="ul"
                                >
                                    {!!projects && projects.map(project => (
                                        <Stack key={project._id} direction="column" spacing={1} >
                                            <Chip
                                                label={project.title}
                                                variant="outlined"
                                                onClick={() => handleClick(project)}
                                                icon={<DoubleArrowIcon sx={{ color: 'white' }} />}
                                                sx={{ justifyContent: 'flex-start', marginRight: 1, marginBottom: 1 }}
                                                className={classes.cardContainer}
                                            />
                                        </Stack>
                                    ))
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3} >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                    paddingY: 1,
                                }}>
                                    <Link to="/" >
                                        <img
                                            src={logo_round_artsunday}
                                            style={{
                                                width: '100%',
                                                maxWidth: '150px',
                                            }}
                                        />
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Typography >
    );
}

export default AppFooter