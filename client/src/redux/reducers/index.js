import { combineReducers } from "redux";

import auth from './auth'
import modal from './modal'
import posts from './posts'
import products from './products'
import projects from './projects'

export default combineReducers({
    auth,
    modal,
    posts,
    products,
    projects,
})