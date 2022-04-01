import * as React from 'react';
import moment from 'moment'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { useTheme } from '@mui/material/styles';

const ProjectAlbums = () => {
    const theme = useTheme();
    return (
        <>
            <Typography component={'div'} variant={'h6'}
                sx={{ m: 2, pl: 1, borderLeft: '5px solid orange' }}
            >
                {`Biệt Thự`}
            </Typography>
            <Container maxWidth='sm'>
                <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Grid item xs={12} key={index}>
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 96 }}
                                    // width='120'
                                    image="https://images.pexels.com/photos/8468288/pexels-photo-8468288.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    alt="Live from space album cover"
                                />
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    justifyContent: 'center',
                                }}>
                                    <CardContent sx={{
                                        display: 'flex', flexDirection: 'column',
                                        flex: '1 0', justifyContent: 'space-between',
                                    }}>
                                        <Typography component="div" variant="body1" sx={{ maxHeight: 70, overflow: 'hidden' }}>
                                            Live From Space,Live From Space,Live From Space,Live From Space,Live From Space,
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" >
                                            {moment(new Date()).format('HH:MM MMM DD, YYYY')}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default ProjectAlbums