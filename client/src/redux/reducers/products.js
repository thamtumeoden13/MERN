
const initState = {
    isLoading: false,
    data: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                data: action.payload
            };

        case 'CREATE':
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case 'UPDATE':
            const data = state.data.map((product) => {
                return product._id === action.payload._id ? action.payload : product
            })
            return {
                ...state,
                data: data
            }
        case 'DELETE':
            const dataFilter = state.data.filter((product) => product._id !== action.payload)
            return {
                ...state,
                data: dataFilter
            }
        default:
            return state;
    }
}

export default reducer