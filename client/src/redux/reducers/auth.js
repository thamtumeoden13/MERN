import { AUTH, LOGOUT } from '../constants/actionType'

const initState = {
    isLoading: false,
    authData: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))

            return {
                ...state,
                authData: action?.payload
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