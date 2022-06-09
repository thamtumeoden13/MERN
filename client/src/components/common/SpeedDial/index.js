import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Lottie from "lottie-react";

import ForumIcon from '@mui/icons-material/Forum';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import { styled } from '@mui/material/styles';
import { Button, Grow, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ZaloIcon from '../Icon/ZaloIcon';
import MessengerIcon from '../Icon/MessengerIcon';
import PhoneIcon from '../Icon/PhoneIcon'

import pulse from '../../../assets/svg/pulse.json';
import DialAnimation from '../../DialAnimation';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft,&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        bottom: theme.spacing(0.1),
        left: theme.spacing(1),
    },
}));

const actions = [
    { icon: <MessengerIcon />, name: 'Gửi tin nhắn', action: 'http://m.me/artsunday.vn/' },
    { icon: <ZaloIcon />, name: '0984 177 100 - Art Sunday', action: 'http://zalo.me/0984177100' },
    { icon: <PhoneIcon color='green' />, name: '0904 177 100 - Mr.Vinh (Tư vấn)', action: 'tel:0904177100' },
];

export default function SpeedDialTooltipOpen(props) {

    useEffect(() => {
        return () => [
            handleClose()
        ]
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = (item) => {
        console.log('[handleClick]', item)

        handleClose()
        setTimeout(() => {
            window.open(item.action, '_blank')
        }, 300);
    }

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, }}>
            <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
                <IconButton sx={{
                    position: 'absolute', bottom: 8, left: 16,
                    zIndex: 999,
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onClick={() => setOpen(!open)}
                >
                    <ForumIcon style={{ color: 'white' }} />
                </IconButton>
                <Box sx={{
                    position: 'absolute', bottom: 16, left: 80,
                    borderRadius: 2,
                    paddingLeft: 1,
                    paddingRight: 1,
                    backgroundColor: 'primary.main'
                }}>
                    <Typography sx={{ width: 150, color: 'white' }} >{'Bạn cần hỗ trợ?'}</Typography>
                </Box>

                <Lottie animationData={pulse}
                    autoPlay
                    loop
                    style={{ width: 120, height: 120, justifyContent: 'center', position: 'absolute', left: -14, bottom: -22 }}
                />
                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...{ timeout: 1000 }}
                >
                    <Box style={{ position: 'absolute', zIndex: 20 }}
                        sx={{
                            left: { xs: 0, sm: 20, md: 40, lg: 40 },
                            bottom: { xs: 0, sm: 20, md: 60, lg: 80 },
                        }}
                    >
                        <DialAnimation
                            open={open}
                            actions={actions}
                            onClick={handleClick}
                        />
                    </Box>
                </Grow>
            </Box>
        </Box>
    );
}