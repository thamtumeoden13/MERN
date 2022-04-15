import {
    START_LOADING_PROJECT_DETAIL, END_LOADING_PROJECT_DETAIL,
    FETCH_ALL_PROJECT_DETAIL, FETCH_PROJECT_DETAIL,
    CREATE_PROJECT_DETAIL, UPDATE_PROJECT_DETAIL, DELETE_PROJECT_DETAIL
} from '../constants/actionType';

const initState = {
    isLoading: false,
    projectDetails: [],
    project: null,
    // currentPage: 0,
    // numberOfPages: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_PROJECT_DETAIL:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_PROJECT_DETAIL:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL_PROJECT_DETAIL:
            return {
                ...state,
                projectDetails: action.payload.data,
                // currentPage: action.payload.currentPage,
                // numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: action.payload.data,
            }
        case CREATE_PROJECT_DETAIL:
            return {
                ...state,
                projectDetails: [...state.projectDetails, action.payload]
            };
        case UPDATE_PROJECT_DETAIL:
            const projectDetails = state.projectDetails.map((projectDetail) => {
                return projectDetail._id === action.payload._id ? action.payload : projectDetail
            })
            return {
                ...state,
                projectDetails: projectDetails
            }
        case DELETE_PROJECT_DETAIL:
            const projectDetailsFilter = state.projectDetails.filter((projectDetail) => projectDetail._id !== action.payload)
            return {
                ...state,
                projectDetails: projectDetailsFilter
            }
        default:
            return state;
    }
}

export default reducer