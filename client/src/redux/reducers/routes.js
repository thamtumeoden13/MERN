import {
    START_LOADING_ROUTE, END_LOADING_ROUTE,
    FETCH_ROUTE,
} from '../constants/actionType';

const initState = {
    isLoading: false,
    routes: [],
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_ROUTE:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_ROUTE:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ROUTE:
            return {
                ...state,
                routes: action.payload.data,
            };
        default:
            return state;
    }
}

export default reducer