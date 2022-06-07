import { AUTH_FAILURE, AUTH_SUCCESS, START_LOADING_AUTH, END_LOADING_AUTH, } from '../constants/actionType'
import * as api from '../../api'

export const signUp = (formData, navigate, from) => async (dispatch) => {
    dispatch({ type: START_LOADING_AUTH, })

    try {
        const result = await api.signUp(formData)

        if (!!result.data.token) {
            dispatch({ type: AUTH_SUCCESS, payload: { data: result.data } })
            navigate(from, { replace: true });
            return
        }
        dispatch({ type: AUTH_FAILURE, payload: { message: result.data.message } })

    } catch (error) {
        console.error(error)
        dispatch({ type: AUTH_FAILURE, payload: { message: error.message } })
    } finally {
        dispatch({ type: END_LOADING_AUTH, })
    }
}

export const signIn = (formData, navigate, from) => async (dispatch) => {
    dispatch({ type: START_LOADING_AUTH, })

    try {
        const result = await api.signIn(formData)

        if (!!result.data.token) {
            dispatch({ type: AUTH_SUCCESS, payload: { data: result.data } })
            navigate(from, { replace: true });
            return
        }
        dispatch({ type: AUTH_FAILURE, payload: { message: result.data.message } })

    } catch (error) {
        console.error(error)
        dispatch({ type: AUTH_FAILURE, payload: { message: error.message } })
    } finally {
        dispatch({ type: END_LOADING_AUTH, })
    }
}