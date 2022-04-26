import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';


function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark',
    },
};

const LANGUAGES = [
    {
        code: 'en-US',
        name: 'English',
    },
    {
        code: 'fr-FR',
        name: 'Français',
    },
];

const AppFooter = () => {

    const dispatch = useDispatch()

    const { projects, isLoading } = useSelector((state) => state.projects)

    const handleClick = (project) => {
        console.info('You clicked the Chip.', project);
    };

    console.log('[AppFoote]', projects)

    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: '#202530' }}
        >
            <Container sx={{ my: 2, display: 'flex' }}>
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
                                {`NEOHOUSE - HCM`}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <AddLocationAltOutlinedIcon sx={{ marginRight: 1, color: 'white' }} />
                                <Typography variant="body2" component="div" sx={{ color: 'white' }} >
                                    {`Đ/c: 8B, Bàu Cát 8, P. 11, Q. Tân Bình, TP. Hồ Chí Minh.`}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <AddLocationAltOutlinedIcon sx={{ marginRight: 1, color: 'white' }} />
                                <Typography variant="body2" component="div" sx={{ color: 'white' }} >
                                    {`Tel: 0906 100 202.`}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                m: 0,
                                backgroundColor: 'transparent'
                            }}
                            component="ul"
                        >
                            {!!projects &&
                                projects.map(project => (
                                    <Stack direction="column" spacing={1}>
                                        <Chip
                                            key={project._id}
                                            label={project.title}
                                            style={{ color: 'white' }}
                                            variant="outlined"
                                            onClick={() => handleClick(project)}
                                            icon={<DoubleArrowIcon sx={{ color: 'white' }} />}
                                            sx={{ justifyContent: 'flex-start', marginRight: 1, marginBottom: 1 }}
                                        />
                                    </Stack>
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Typography >
    );
}

export default AppFooter