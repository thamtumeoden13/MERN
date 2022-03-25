import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import NavBar from './components/NavBar';

import Home from './pages/HomePage'

import Album from './pages/AlbumPage';
import Auth from './components/Auth';
import ProductDetail from './components/ProductDetail'

import Tour from './pages/TourPage'
import TourDetail from './pages/TourPage/TourDetailPage'

const theme = createTheme();

const App = () => {

	const authData = useSelector((state) => state.authData)

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Container maxWidth="xl">
				{/* <Album /> */}
				<NavBar />
				<Routes>
					<Route path='/' exact element={<Navigate to="/products" />} />
					<Route path='/products' exact element={<Home />} />
					<Route path='/products/search' exact element={<Home />} />
					<Route path='/products/:id' element={<ProductDetail />} />

					<Route path='/tours' exact element={<Tour />} />
					<Route path='/tours/:id' element={<TourDetail />} />

					<Route path='/auth' exact element={!authData ? <Auth /> : <Navigate to={'/products'} />} />
					<Route />
				</Routes>
				</Container>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
