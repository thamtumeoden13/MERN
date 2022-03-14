import * as api from '../../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionType';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProducts();

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product)

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error.message)
    }
}

export const likeProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeProduct(id)

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}