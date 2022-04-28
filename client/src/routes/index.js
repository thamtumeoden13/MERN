import React from 'react';
import { Navigate, useRoutes, BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from '../pages/AuthPage';

import NotFound from '../pages/404Page'

import Home from '../pages/HomePage'

import Products from '../pages/ProductPage';
import ProductDetail from '../components/ProductDetail'

import Album from '../pages/AlbumPage';

import Project from '../pages/ProjectPage';
import ProjectDetail from '../pages/ProjectPage/ProjectDetailPage';

import Portfolio from '../pages/PortfolioPage'
// import PortfolioDetail from './pages/PortfolioPage/PortfolioDetailPage'

import Admin from '../admin'
import PortfolioAdmin from '../admin/PortfolioAdmin'
import ProjectAdmin from '../admin/ProjectAdmin'
import ProjectDetailAdmin from '../admin/ProjectDetailAdmin'

// ----------------------------------------------------------------------

function RequireAuth({ children }) {
    let location = useLocation();

	const user = JSON.parse(localStorage.getItem('profile'))

	if (!user) {
		console.log('[auth]-1')
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/auth" state={{ from: location }} replace />;
	}
	return children;
}
const Router = () => {

    return (
        <Routes>
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
        </Routes>
    )
}

export default Router

