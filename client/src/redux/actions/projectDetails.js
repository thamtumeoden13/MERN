import * as api from '../../api'
import {
    START_LOADING_PROJECT_DETAIL, END_LOADING_PROJECT_DETAIL,
    FETCH_ALL_PROJECT_DETAIL, FETCH_PROJECT_DETAIL,
    CREATE_PROJECT_DETAIL, UPDATE_PROJECT_DETAIL, DELETE_PROJECT_DETAIL,
} from '../constants/actionType';

// export const getProjectProjectDetail = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: START_LOADING_PROJECT_DETAIL })

//         const { data } = await api.fetchProject(id);

//         dispatch({ type: FETCH_PROJECT_DETAIL, payload: data })
//         dispatch({ type: END_LOADING_PROJECT_DETAIL })
//     } catch (error) {
//         console.error(error.message)
//     }
// }

export const getProjectDetails = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetails();

        dispatch({ type: FETCH_ALL_PROJECT_DETAIL, payload: data })
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    } catch (error) {
        console.error(error.message)
    }
}

export const getProjectDetailByPortfolios = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailByPortfolios(id);

        dispatch({ type: FETCH_ALL_PROJECT_DETAIL, payload: data })
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    } catch (error) {
        console.error(error.message)
    }
}

export const getProjectDetailByProjects = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailByProjects(id);

        dispatch({ type: FETCH_ALL_PROJECT_DETAIL, payload: data })
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    } catch (error) {
        console.error(error.message)
    }
}

export const createProjectDetail = (projectDetail, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.createProjectDetail(projectDetail);

        navigate(`/projectDetailDetails/${data._id}`)

        dispatch({ type: CREATE_PROJECT_DETAIL, payload: data });
    } catch (error) {
        console.error(error)
    }

}

export const updateProjectDetail = (id, projectDetail) => async (dispatch) => {
    try {
        // const { data } = await api.updateProjectDetail(id, projectDetail)

        // dispatch({ type: UPDATE_PROJECT_DETAIL, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

// export const deleteProject = (id) => async (dispatch) => {
//     try {
//         await api.deleteProjectDetail(id)

//         dispatch({ type: DELETE_PROJECT_DETAIL, payload: id })
//     } catch (error) {
//         console.error(error.message)
//     }
// }
