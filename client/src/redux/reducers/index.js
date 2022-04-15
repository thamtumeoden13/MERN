import { combineReducers } from "redux";

import auth from './auth'
import modal from './modal'
import posts from './posts'
import products from './products'
import portfolios from './portfolios'
import projects from './projects'
import projectDetails from './projectDetails'

export default combineReducers({
    auth,
    modal,
    posts,
    products,
    portfolios,
    projects,
    projectDetails,
})