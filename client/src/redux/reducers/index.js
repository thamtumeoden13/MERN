import { combineReducers } from "redux";

import auth from './auth'
import modal from './modal'
import posts from './posts'
import products from './products'
import projects from './projects'
import portfolios from './portfolios'

export default combineReducers({
    auth,
    modal,
    posts,
    products,
    projects,
    portfolios
})