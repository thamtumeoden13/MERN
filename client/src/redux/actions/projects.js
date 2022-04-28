import * as api from '../../api'
import {
    START_LOADING_PROJECT, END_LOADING_PROJECT,
    FETCH_ALL_PROJECT, FETCH_PROJECT,
    CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT,
} from '../constants/actionType';

export const getProject = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT })

        const { data } = await api.fetchProject(id);

        dispatch({ type: FETCH_PROJECT, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT })
    }
}

export const getProjects = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT })

        const { data } = await api.fetchProjects();

        dispatch({ type: FETCH_ALL_PROJECT, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT })
    }
}

export const createProject = (project) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT })

        const { data } = await api.createProject(project);

        dispatch({ type: CREATE_PROJECT, payload: data });
    } catch (error) {
        console.error(error)
    }

}

export const updateProject = (id, project) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT })

        const { data } = await api.updateProject(id, project)

        dispatch({ type: UPDATE_PROJECT, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const deleteProject = (ids) => async (dispatch) => {
    try {
        await api.deleteProject(ids)

        dispatch({ type: DELETE_PROJECT, payload: ids })
    } catch (error) {
        console.error(error.message)
    }
}
