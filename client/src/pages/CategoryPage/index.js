import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';
import Categories from '../../components/Categories';

import { useTitle } from '../../utils';

export default function CategoryPage() {
    
    useTitle('Art-Sunday | Danh Mục');
    
    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Container maxWidth={'xl'} sx={{ py: 8, minHeight: '100vh' }}>
                <Categories />
            </Container>
            <AppFooter />
        </Box>
    );
}