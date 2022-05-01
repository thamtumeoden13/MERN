import {
    START_LOADING_PROJECT_DETAIL, END_LOADING_PROJECT_DETAIL,
    FETCH_ALL_PROJECT_DETAIL, FETCH_PROJECT_DETAIL, FETCH_PROJECT_DETAIL_BY_SEARCH,
    FETCH_PROJECT_DETAIL_BY_PORFOLIO_ID, FETCH_PROJECT_DETAIL_BY_PROJECT_ID,
    CREATE_PROJECT_DETAIL, UPDATE_PROJECT_DETAIL, DELETE_PROJECT_DETAIL
} from '../constants/actionType';

const initState = {
    isLoading: false,
    projectDetails: [],
    projectDetailsBySearch: [],
    projectDetailsByPortfolioID: [],
    projectDetailsByProjectID: [],
    projectDetail: null,
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
                // projectDetailsByPortfolioID: [],
                // projectDetailsByProjectID: [],
            }
        case FETCH_PROJECT_DETAIL_BY_SEARCH:
            return {
                ...state,
                projectDetailsBySearch: action.payload.data,
                // projectDetailsByProjectID: [],
                // projectDetail: [],
            }
        case FETCH_PROJECT_DETAIL_BY_PORFOLIO_ID:
            return {
                ...state,
                projectDetailsByPortfolioID: action.payload.data,
                // projectDetailsByProjectID: [],
                // projectDetail: [],
            }
        case FETCH_PROJECT_DETAIL_BY_PROJECT_ID:
            return {
                ...state,
                projectDetailsByProjectID: action.payload.data,
                // projectDetailsByPortfolioID: [],
                // projectDetail: [],
            }
        case CREATE_PROJECT_DETAIL:
            console.log('[CREATE_PROJECT_DETAIL]', state.projectDetails, action.payload)
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
            const ids = action.payload.split(',')
            const projectDetailsFilter = state.projectDetails.filter((projectDetail) => !ids.includes(projectDetail._id))
            return {
                ...state,
                projectDetails: projectDetailsFilter
            }
        default:
            return state;
    }
}

export default reducer