import { combineReducers } from "redux";

import auth from './auth'
import toast from './toast'
import modal from './modal'
import posts from './posts'
import products from './products'
import portfolios from './portfolios'
import projects from './projects'
import projectDetails from './projectDetails'

export default combineReducers({
    auth,
    toast,
    modal,
    posts,
    products,
    portfolios,
    projects,
    projectDetails,
})