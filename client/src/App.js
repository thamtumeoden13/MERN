import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import NavBar from './components/NavBar';

import Auth from './pages/AuthPage';

import Home from './pages/HomePage'

import Products from './pages/ProductPage';
import ProductDetail from './components/ProductDetail'

import Album from './pages/AlbumPage';

import Project from './pages/ProjectPage';
import ProjectDetail from './pages/ProjectPage/ProjectDetailPage';

import Portfolio from './pages/PortfolioPage'
// import PortfolioDetail from './pages/PortfolioPage/PortfolioDetailPage'

import PortfolioAdmin from './admin/PortfolioAdmin'
import ProjectAdmin from './admin/ProjectAdmin'
import ProjectDetailAdmin from './admin/ProjectDetailAdmin'

const theme = createTheme();

function ScrollTop(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
}

const App = (props) => {

	const authData = useSelector((state) => state.authData)

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Container maxWidth='xl' style={{ padding: 0 }}>
					<NavBar />
					<div id="back-to-top-anchor" />
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/products' exact element={<Products />} />
						{/* <Route path='/products/search' exact element={<Home />} /> */}
						<Route path='/products/:id' element={<ProductDetail />} />

						<Route path='/albums' exact element={<Album />} />

						<Route path='/portfolios' exact element={<Portfolio />} />
						<Route path='/portfolios/:id' element={<Portfolio />} />
						<Route path='/portfolios/:id/portfolio' element={<Portfolio />} />
						<Route path='/portfolios/:id/project' element={<Portfolio />} />

						<Route path='/projects' exact element={<Project />} />
						<Route path='/projects/:id' element={<ProjectDetail />} />

						<Route path='/admin/portfolios' exact element={<PortfolioAdmin />} />

						<Route path='/admin/projects' exact element={<ProjectAdmin />} />

						<Route path='/admin/projectDetails' exact element={<ProjectDetailAdmin />} />

						<Route path='/auth' exact element={!authData ? <Auth /> : <Navigate to={'/'} />} />
						<Route />
					</Routes>
				</Container>

				<ScrollTop {...props}>
					<Fab color="secondary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
