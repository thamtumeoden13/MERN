import React, { useState } from 'react'
import Box from '@mui/material/Box';

import HomeComponent from '../../components/Home'
import Tours from '../../components/Tours' 

import { sortBy, useToggle, useInput, useTitle } from '../../utils'
import Header from '../../components/Header';

const HomePage = () => {

    useTitle('Home | Valley');

    return (
        <Box>
            <Header />
            <Box sx={{ mt: 3, minHeight: '100vh' }}>
                <Tours />
            </Box>
        </Box>
    );
}

export default HomePage;
