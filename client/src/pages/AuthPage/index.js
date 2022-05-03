import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import AuthCom from '../../components/Auth'
import { useTitle } from '../../utils'

const Auth = () => {

    useTitle('Art-Sunday | Xác Thực');
    
    return (
        <Box sx={{ mt: 10, mb: 10 }}>
            <AuthCom />
        </Box>
    )
}

export default Auth