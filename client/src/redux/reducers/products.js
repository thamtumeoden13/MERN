import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_PRODUCT, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionType';

const initState = {
    isLoading: false,
    products: [],
    product: null,
    currentPage: 0,
    numberOfPages: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL:
            return {
                ...state,
                products: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_PRODUCT:
            console.log('FETCH_PRODUCT', action.payload)
            return {
                ...state,
                product: action.payload.data,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                products: action.payload.data,
            }
        case CREATE:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case UPDATE:
        case LIKE:
            const products = state.products.map((product) => {
                return product._id === action.payload._id ? action.payload : product
            })
            return {
                ...state,
                products: products
            }
        case DELETE:
            const productsFilter = state.products.filter((product) => product._id !== action.payload)
            return {
                ...state,
                products: productsFilter
            }

        default:
            return state;
    }
}

export default reducer