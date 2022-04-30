import { AUTH } from '../constants/actionType'
import * as api from '../../api'

export const signUp = (formData, navigate, from) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, payload: data })
        
        navigate(from, { replace: true });
    } catch (error) {
        console.error(error)
    }

}

export const signIn = (formData, navigate, from) => async (dispatch) => {

    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, payload: data })

        navigate(from, { replace: true });
    } catch (error) {
        console.error(error)
    }

}