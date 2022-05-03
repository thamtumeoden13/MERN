import {
    START_LOADING_ROUTE, END_LOADING_ROUTE,
    FETCH_ROUTE, SELECTED_ROUTE,
} from '../constants/actionType';

const initState = {
    isLoading: false,
    routes: [],
    selectedRoute: {}
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
        case SELECTED_ROUTE:
            return {
                ...state,
                selectedRoute: action.payload,
            };
        default:
            return state;
    }
}

export default reducer