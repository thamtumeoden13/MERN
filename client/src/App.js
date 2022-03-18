import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';
import ProductDetail from './components/ProductDetail'

const theme = createTheme();

function App() {

  const authData = useSelector((state) => state.authData)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          {/* <HomePage /> */}
          <NavBar />
          <Routes>
            <Route path='/' exact element={<Navigate to="/products" />} />
            <Route path='/products' exact element={<Home />} />
            <Route path='/products/search' exact element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/auth' exact element={!authData ? <Auth /> : <Navigate to={'/products'} />} />
            <Route />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
