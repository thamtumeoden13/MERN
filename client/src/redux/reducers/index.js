import { combineReducers } from "redux";

import modal from './modal'
import posts from './posts'
import products from './products'
import auth from './auth'

export default combineReducers({
    modal,
    posts,
    products,
    auth
})