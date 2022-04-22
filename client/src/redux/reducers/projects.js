import {
    START_LOADING_PROJECT, END_LOADING_PROJECT,
    FETCH_ALL_PROJECT, FETCH_PROJECT,
    CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT
} from '../constants/actionType';

const initState = {
    isLoading: false,
    projects: [],
    project: null,
    // currentPage: 0,
    // numberOfPages: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_PROJECT:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_PROJECT:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL_PROJECT:
            return {
                ...state,
                projects: action.payload.data,
                // currentPage: action.payload.currentPage,
                // numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_PROJECT:
            return {
                ...state,
                project: action.payload.data,
            }
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case UPDATE_PROJECT:
            const projects = state.projects.map((project) => {
                return project._id === action.payload._id ? action.payload : project
            })
            return {
                ...state,
                projects: projects
            }
        case DELETE_PROJECT:
            const ids = action.payload.split(',')
            const projectsFilter = state.projects.filter((project) => !ids.includes(project._id))
            return {
                ...state,
                projects: projectsFilter
            }
        default:
            return state;
    }
}

export default reducer