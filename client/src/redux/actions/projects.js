import * as api from '../../api'
import {
    START_LOADING, END_LOADING,
    FETCH_ALL_PROJECT, FETCH_PROJECT,
    CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT,
} from '../constants/actionType';

// export const getProject = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: START_LOADING })

//         const { data } = await api.fetchProject(id);

//         dispatch({ type: FETCH_PROJECT, payload: data })
//         dispatch({ type: END_LOADING })
//     } catch (error) {
//         console.error(error.message)
//     }
// }

export const getProjects = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchProjects();

        dispatch({ type: FETCH_ALL_PROJECT, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.error(error.message)
    }
}

export const createProject = (project, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createProject(project);

        navigate(`/projects/${data._id}`)

        dispatch({ type: CREATE_PROJECT, payload: data });
    } catch (error) {
        console.error(error)
    }

}

export const updateProject = (id, project) => async (dispatch) => {
    try {
        // const { data } = await api.updateProject(id, project)

        // dispatch({ type: UPDATE_PROJECT, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

// export const deleteProject = (id) => async (dispatch) => {
//     try {
//         await api.deleteProject(id)

//         dispatch({ type: DELETE_PROJECT, payload: id })
//     } catch (error) {
//         console.error(error.message)
//     }
// }
