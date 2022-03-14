import { combineReducers } from "redux";

import modal from './modal'
import posts from './posts'
import products from './products'

export default combineReducers({
    modal,
    posts,
    products
})