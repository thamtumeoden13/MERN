import { TOAST_SHOW, TOAST_HIDE, TOAST_CONFIG } from '../constants/actionType'

const initState = {
    isVisile: false,
    isLoading: false,
    isProcessing: false,
    
    position: 'top-right',
    rtl: false,
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    newestOnTop: false,
    draggable: true,
    role: 'alert',
    theme: 'light'
}

const toastReducer = (state = initState, action) => {
    switch (action.type) {
        case TOAST_SHOW:

            return {
                ...state,
                isVisile: true
            }
        case TOAST_HIDE:

            return {
                ...state,
                isVisile: false
            }
        case TOAST_CONFIG:

            return {
                ...state,
                ...action?.payload
            }
        default:
            return state;
    }
}

export default toastReducer