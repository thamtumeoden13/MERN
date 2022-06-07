import { AUTH_FAILURE, AUTH_SUCCESS, START_LOADING_AUTH, END_LOADING_AUTH, LOGOUT } from '../constants/actionType'

const initState = {
    isLoading: false,
    isError: false,
    message: '',
    authData: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_AUTH:

            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case END_LOADING_AUTH:

            return {
                ...state,
                isLoading: false
            }
        case AUTH_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload?.data }))

            return {
                ...state,
                authData: action?.payload?.data,
                isError: false,
                message: false
            }
        case AUTH_FAILURE:

            return {
                ...state,
                authData: null,
                isError: true,
                message: action?.payload?.message
            }
        case LOGOUT:
            localStorage.clear()

            return {
                ...state,
                authData: null
            }
        default:
            return state;
    }
}

export default authReducer