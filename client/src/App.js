import React from 'react'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ScrollToTop from './components/common/ScrollToTop';
import ScrollTop from './components/common/ScrollTop';
import SpeedDialTooltipOpen from './components/common/SpeedDial';

import Router from './routes';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

const App = (props) => {

	const toastConfig = useSelector(state => state.toast)

	return (
		<ThemeProvider theme={theme}>
			<div id="back-to-top-anchor" />
			<ScrollToTop />
			<ScrollTop {...props}>
				<Fab color='primary' size="large" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<Box
				role="presentation"
				sx={{ position: 'fixed', zIndex: 99, bottom: 16, left: 16 }}
			>
				<SpeedDialTooltipOpen />
			</Box>
			<ToastContainer {...toastConfig} />
			<Router />
		</ThemeProvider>
	);
}

export default App;
