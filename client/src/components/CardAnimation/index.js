import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 420,
    [theme.breakpoints.down('md')]: {
        width: 343,
    },
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
        width: 'auto',
    },
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(17, 17, 17, .8)',
    backdropFilter: 'blur(40px)',
}));

const CardAnimation = ({ title = '', description = '', route = '', onClick }) => {
    const theme = useTheme();

    const handleClick = () => {
        if (onClick) {
            onClick(route)
        }
    }

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ marginX: 1, }}>
                        <Fade
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...{ timeout: 1500 }}
                        >
                            <Typography variant="h5" color="white" fontWeight={500}>
                                {title}
                            </Typography>
                        </Fade>
                        <Zoom
                            in={true}
                            style={{ transformOrigin: '0 0 0' }}
                            {...{ timeout: 2000 }}
                        >
                            <Typography color="white" letterSpacing={-0.25} fontWeight={300}>
                                {description}
                            </Typography>
                        </Zoom>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        mt: 1,
                    }}
                >
                    <Slide
                        direction="up"
                        mountOnEnter unmountOnExit
                        in={true}
                        style={{ transformOrigin: '0 0 0' }}
                        {...{ timeout: 2500 }}
                    >
                        <Button
                            sx={{ mt: 2 }}
                            variant='contained'
                            style={{ backgroundColor: '#F37121', color: '#000' }}
                            onClick={handleClick}
                        >
                            {`Chi Tiết`}
                        </Button>
                    </Slide>
                </Box>
            </Widget>
            {/* <WallPaper /> */}
        </Box>
    );
}

export default CardAnimation