import * as api from '../../api'
import {
    START_LOADING, END_LOADING,
    FETCH_ALL, FETCH_BY_SEARCH, FETCH_PRODUCT,
    CREATE, UPDATE, DELETE, LIKE, COMMENT
} from '../constants/actionType';

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchProduct(id);

        dispatch({ type: FETCH_PRODUCT, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.error(error.message)
    }
}

export const getProducts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchProducts(page);

        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.error(error.message)
    }
}

export const getProductsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchProductsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.error(error.message)
    }
}

export const createProduct = (product, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createProduct(product);

        navigate(`/products/$${data._id}`)

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.error(error)
    }

}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product)

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.error(error.message)
    }
}

export const likeProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeProduct(id)

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const commentProduct = (value, id) => async (dispatch) => {

    try {
        const { data } = await api.commentProduct(value, id)

        dispatch({ type: COMMENT, payload: data })
        return data.comments
    } catch (error) {
        console.error(error)
    }
}