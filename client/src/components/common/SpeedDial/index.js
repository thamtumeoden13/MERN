import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import ForumIcon from '@mui/icons-material/Forum';

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import ZaloIcon from '../Icon/ZaloIcon';
import MessengerIcon from '../Icon/MessengerIcon';
import PhoneIcon from '../Icon/PhoneIcon'

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft,&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        bottom: theme.spacing(0.1),
        left: theme.spacing(1),
    },
}));

const actions = [
    { icon: <PhoneIcon color='green' />, name: '0904 177 100 - Mr.Vinh (Tư vấn)', action: 'tel:0904177100' },
    { icon: <ZaloIcon />, name: '0984 177 100 - Art Sunday', action: 'http://zalo.me/0984177100' },
    { icon: <MessengerIcon />, name: 'Gửi tin nhắn', action: 'http://m.me/artsunday.vn/' },
];

export default function SpeedDialTooltipOpen(props) {

    const [open, setOpen] = React.useState(false);
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
                <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    direction={'up'}
                    hidden={false}
                    icon={<ForumIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={<Typography variant='body2' sx={{ width: 200, }}>{action.name}</Typography>}
                            // tooltipOpen
                            tooltipPlacement={'right'}
                            onClick={() => handleClick(action)}
                        />
                    ))}
                    <Box sx={{
                        position: 'absolute', bottom: 16, left: 58,
                        borderRadius: 2,
                        paddingLeft: 1,
                        paddingRight: 1,
                        backgroundColor: 'primary.main'
                    }}>
                        <Typography sx={{ width: 150, color: 'white' }} >{'Bạn cần hỗ trợ?'}</Typography>
                    </Box>
                </StyledSpeedDial>
            </Box>
        </Box>
    );
}