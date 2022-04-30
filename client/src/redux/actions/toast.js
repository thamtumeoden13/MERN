import { TOAST_SHOW, TOAST_HIDE, TOAST_CONFIG } from '../constants/actionType'
import * as api from '../../api'
import { toast } from "react-toastify";


const types = {
    success: 'success',
    error: 'error',
    warn: 'warn',
    info: 'info',
}

export const toastShow = (type = 'success', title = '🦄 The connectivity is back, sync in progress...', config = null) => async (dispatch) => {
    if (!!config) {
        dispatch({ type: TOAST_CONFIG, payload: config })
    }
    dispatch({ type: TOAST_SHOW })
    toast[types[type]](title);
}

export const toastHide = () => async (dispatch) => {

    dispatch({ type: TOAST_HIDE })
    toast.success("MY HIDE");

}

export const toastConfig = (data) => async (dispatch) => {
    console.log('[toastConfig-data]', data)
    dispatch({ type: TOAST_CONFIG, payload: data })
}