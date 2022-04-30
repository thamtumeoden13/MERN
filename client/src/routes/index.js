import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

// import Auth from '../pages/AuthPage';

// import NotFound from '../pages/404Page'

// import Home from '../pages/HomePage'

// import Project from '../pages/ProjectPage';
// import ProjectDetail from '../pages/ProjectPage/ProjectDetailPage';

// import Portfolio from '../pages/PortfolioPage'
// import PortfolioDetail from './pages/PortfolioPage/PortfolioDetailPage'

// import Admin from '../admin'
// import PortfolioAdmin from '../admin/PortfolioAdmin'
// import ProjectAdmin from '../admin/ProjectAdmin'
// import ProjectDetailAdmin from '../admin/ProjectDetailAdmin'

const Auth = lazy(() => import('../pages/AuthPage'));
const Home = lazy(() => import('../pages/HomePage'));
const NotFound = lazy(() => import('../pages/404Page'));

const Portfolio = lazy(() => import('../pages/PortfolioPage'));

const Project = lazy(() => import('../pages/ProjectPage'));
const ProjectDetail = lazy(() => import('../pages/ProjectPage/ProjectDetailPage'));

const Admin = lazy(() => import('../admin'));
const PortfolioAdmin = lazy(() => import('../admin/PortfolioAdmin'));
const ProjectAdmin = lazy(() => import('../admin/ProjectAdmin'));
const ProjectDetailAdmin = lazy(() => import('../admin/ProjectDetailAdmin'));

const RequireAuth = lazy(() => import('../components/common/RequireAuth'));

const Router = () => {

    return (
        <React.Fragment>
            <Suspense fallback={`...loading`}>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/han-muc-du-an' exact element={<Portfolio />} />
                    <Route path='/han-muc-du-an/:id' element={<Portfolio />} />
                    <Route path='/han-muc-du-an/du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
                    <Route path='/han-muc-du-an/du-an/:projectID' element={<Portfolio />} />
                    <Route path='/han-muc-du-an/chi-tiet-du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
                    <Route path='/han-muc-du-an/chi-tiet-du-an/:projectDetailID' element={<Portfolio />} />
                    <Route path='/han-muc-du-an/du-an/tim-kiem' exact element={<Portfolio />} />

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
            </Suspense>
        </React.Fragment>
    )
}

export default Router

