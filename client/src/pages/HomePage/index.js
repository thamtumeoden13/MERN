import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';

import HomeComponent from '../../components/Home'

import { sortBy, useToggle, useInput, useTitle } from '../../utils'
import Header from '../../components/Header';
import Categories from '../../components/Categories';
import Grow from '@mui/material/Grow';

const HomePage = () => {

    useTitle('Home | Valley');

    return (
        <Box>
            <Header />
            <Grow in>
                <Box sx={{ mt: 3, minHeight: '100vh' }}>
                    <Container>
                        <Categories />
                    </Container>
                </Box>
            </Grow>
        </Box>
    );
}

export default HomePage;
