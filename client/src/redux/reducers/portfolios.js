import {
    START_LOADING_PORTFOLIO, END_LOADING_PORTFOLIO,
    FETCH_ALL_PORTFOLIO, FETCH_PORTFOLIO,
    CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO
} from '../constants/actionType';

const initState = {
    isLoading: false,
    portfolios: [],
    portfolio: null,
    // currentPage: 0,
    // numberOfPages: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_PORTFOLIO:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_PORTFOLIO:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL_PORTFOLIO:
            return {
                ...state,
                portfolios: action.payload.data,
                // currentPage: action.payload.currentPage,
                // numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_PORTFOLIO:
            return {
                ...state,
                portfolio: action.payload.data,
            }
        case CREATE_PORTFOLIO:
            return {
                ...state,
                portfolios: [...state.portfolios, action.payload]
            };
        case UPDATE_PORTFOLIO:
            const portfolios = state.portfolios.map((portfolio) => {
                return portfolio._id === action.payload._id ? action.payload : portfolio
            })
            return {
                ...state,
                portfolios: portfolios
            }
        case DELETE_PORTFOLIO:
            const portfoliosFilter = state.portfolios.filter((portfolio) => portfolio._id !== action.payload)
            return {
                ...state,
                portfolios: portfoliosFilter
            }
        default:
            return state;
    }
}

export default reducer