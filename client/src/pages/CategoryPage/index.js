import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NavBar from '../../components/NavBar';
import AppFooter from '../../components/AppFooter';

import Categories from '../../components/Categories';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function CategoryPage() {
    return (
        <Box sx={{ pt: 10, }}>
            <NavBar />
            <Container maxWidth={'lg'} sx={{ py: 8, minHeight: '100vh' }}>
                <Categories />
            </Container>
            <AppFooter />
        </Box>
    );
}