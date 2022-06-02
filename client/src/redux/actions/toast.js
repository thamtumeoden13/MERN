import { TOAST_SHOW, TOAST_HIDE, TOAST_CONFIG, TOAST_PROMISE } from '../constants/actionType'
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

export const toastPromise = (promise) => async (dispatch) => {

    const promiseResponse = await toast.promise(promise, {
        pending: "Đang xử lý...",
        success: "Tải lên hình ảnh thành công.",
        error: "Có lỗi trong quá trình tải lên ảnh.",
    });
    return promiseResponse
}


export const toastConfig = (data) => async (dispatch) => {
    // console.log('[toastConfig-data]', data)
    dispatch({ type: TOAST_CONFIG, payload: data })
}