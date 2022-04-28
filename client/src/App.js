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
import AppFooter from './components/AppFooter';
import ScrollToTop from './components/common/ScrollToTop';
import Router from './routes';

import Auth from './pages/AuthPage';

import Home from './pages/HomePage'
import NotFound from './pages/404Page'

import Products from './pages/ProductPage';
import ProductDetail from './components/ProductDetail'

import Album from './pages/AlbumPage';

import Project from './pages/ProjectPage';
import ProjectDetail from './pages/ProjectPage/ProjectDetailPage';

import Portfolio from './pages/PortfolioPage'
// import PortfolioDetail from './pages/PortfolioPage/PortfolioDetailPage'

import Admin from './admin'
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
	console.log('[authData]', authData)
	return (
		<ThemeProvider theme={theme}>
			<div id="back-to-top-anchor" />
			<ScrollToTop />
			<ScrollTop {...props}>
				<Fab color='primary' size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<div id="back-to-top-anchor" />
			<Router />
			<Container maxWidth='xl' style={{ padding: 0 }}>
				<NavBar />
				{/* <div id="back-to-top-anchor" /> */}
				{/* <Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/han-muc-du-an' exact element={<Portfolio />} />
					<Route path='/han-muc-du-an/:id' element={<Portfolio />} />
					<Route path='/han-muc-du-an/du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
					<Route path='/han-muc-du-an/du-an/:projectID' element={<Portfolio />} />
					<Route path='/han-muc-du-an/chi-tiet-du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
					<Route path='/han-muc-du-an/chi-tiet-du-an/:projectDetailID' element={<Portfolio />} />

					<Route path='/du-an' exact element={<Project />} />
					<Route path='/du-an/:id' element={<ProjectDetail />} />

					<Route path='/chi-tiet-du-an' exact element={<Project />} />
					<Route path='/chi-tiet-du-an/:id' element={<ProjectDetail />} />

					<Route path='/quan-ly' exact element={<RequireAuth><Admin /></RequireAuth>} />

					<Route path='/quan-ly/han-muc-du-an' element={<RequireAuth><PortfolioAdmin /></RequireAuth>} />

					<Route path='/quan-ly/du-an' element={<RequireAuth><ProjectAdmin /></RequireAuth>} />

					<Route path='/quan-ly/chi-tiet-du-an' element={<RequireAuth><ProjectDetailAdmin /></RequireAuth>} />

					<Route path='/auth' element={<Auth />} />
					<Route path='/404' element={<NotFound />} />
					<Route path='*' element={<Navigate to="/404" />} />
				</Routes> */}
				<AppFooter />
			</Container>
		</ThemeProvider>
	);
}

export default App;
