import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import Auth from '../pages/AuthPage';
import Home from '../pages/HomePage'
import NotFound from '../pages/404Page'
import SearchList from '../pages/SearchPage'

import ProductPage from '../pages/ProductPage';
import AlbumPage from '../pages/AlbumPage';
import CategoryPage from '../pages/CategoryPage';

import Portfolio from '../pages/PortfolioPage'
import PortfolioList from '../pages/PortfolioPage/PortfolioList'

import Project from '../pages/ProjectPage';
import ProjectList from '../pages/ProjectPage/ProjectList';

import ProjectDetail from '../pages/ProjectDetailPage';
import ProjectDetailList from '../pages/ProjectDetailPage/ProjectDetailList';

import Admin from '../admin'
import PortfolioAdmin from '../admin/PortfolioAdmin'
import ProjectAdmin from '../admin/ProjectAdmin'
import ProjectDetailAdmin from '../admin/ProjectDetailAdmin'

import RequireAuth from '../components/common/RequireAuth'

// const Auth = lazy(() => import('../pages/AuthPage'));
// const Home = lazy(() => import('../pages/HomePage'));
// const NotFound = lazy(() => import('../pages/404Page'));

// const Portfolio = lazy(() => import('../pages/PortfolioPage'));
// const PortfolioList = lazy(() => import('../pages/PortfolioPage/PortfolioList'));

// const Project = lazy(() => import('../pages/ProjectPage'));
// const ProjectList = lazy(() => import('../pages/ProjectPage/ProjectList'));

// const ProjectDetail = lazy(() => import('../pages/ProjectDetailPage'));
// const ProjectDetailList = lazy(() => import('../pages/ProjectDetailPage/ProjectDetailList'));

// const Admin = lazy(() => import('../admin'));
// const PortfolioAdmin = lazy(() => import('../admin/PortfolioAdmin'));
// const ProjectAdmin = lazy(() => import('../admin/ProjectAdmin'));
// const ProjectDetailAdmin = lazy(() => import('../admin/ProjectDetailAdmin'));

// const RequireAuth = lazy(() => import('../components/common/RequireAuth'));

const Router = () => {

    return (
        <React.Fragment>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/tim-kiem' exact element={<SearchList />} />

                <Route path='/han-muc-du-an' exact element={<Portfolio />} />
                <Route path='/han-muc-du-an/tim-kiem' element={<Portfolio />} />
                <Route path='/han-muc-du-an/:id' element={<Portfolio />} />
                <Route path='/han-muc-du-an/du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
                <Route path='/han-muc-du-an/du-an/:projectID' element={<Portfolio />} />
                <Route path='/han-muc-du-an/chi-tiet-du-an' exact element={<Navigate to={'/han-muc-du-an'} replace />} />
                <Route path='/han-muc-du-an/chi-tiet-du-an/:projectDetailID' element={<Portfolio />} />
                {/* <Route path='/han-muc-du-an/du-an/tim-kiem' exact element={<Portfolio />} /> */}

                <Route path='/danh-sach-han-muc-du-an' exact element={<PortfolioList />} />
                <Route path='/danh-sach-han-muc-du-an/:id' element={<ProjectList />} />
                <Route path='/danh-sach-du-an' exact element={<ProjectList />} />
                <Route path='/danh-sach-du-an/:id' exact element={<ProjectDetailList />} />
                <Route path='/danh-sach-chi-tiet-du-an' exact element={<ProjectDetailList />} />

                <Route path='/chi-tiet-du-an' exact element={<ProjectDetailList />} />
                <Route path='/chi-tiet-du-an/:id' element={<ProjectDetail />} />

                <Route path='/quan-ly' exact element={<RequireAuth><Admin /></RequireAuth>} />
                <Route path='/quan-ly/han-muc-du-an' element={<RequireAuth><PortfolioAdmin /></RequireAuth>} />
                <Route path='/quan-ly/du-an' element={<RequireAuth><ProjectAdmin /></RequireAuth>} />
                <Route path='/quan-ly/chi-tiet-du-an' element={<RequireAuth><ProjectDetailAdmin /></RequireAuth>} />


                <Route path='/gioi-thieu' exact element={<CategoryPage />} />
                <Route path='/nhan-su' exact element={<CategoryPage />} />
                <Route path='/van-phong' exact element={<CategoryPage />} />
                <Route path='/lien-he' exact element={<CategoryPage />} />

                <Route path='/tin-tuc' exact element={<AlbumPage />} />
                <Route path='/cam-nang-xay-nha' exact element={<AlbumPage />} />
                <Route path='/hoat-dong-su-kien' exact element={<AlbumPage />} />
                <Route path='/tuyen-dung' exact element={<AlbumPage />} />

                <Route path='/auth' element={<Auth />} />
                <Route path='/404' element={<NotFound />} />
                <Route path='*' element={<Navigate to="/404" />} />
            </Routes>
        </React.Fragment>
    )
}

export default Router

