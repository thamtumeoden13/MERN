import * as api from '../../api'
import {
    START_LOADING_PROJECT_DETAIL, END_LOADING_PROJECT_DETAIL,
    FETCH_ALL_PROJECT_DETAIL, FETCH_PROJECT_DETAIL, FETCH_PROJECT_DETAIL_BY_SEARCH,
    FETCH_PROJECT_DETAIL_BY_PORFOLIO_ID, FETCH_PROJECT_DETAIL_BY_PROJECT_ID,
    FETCH_PROJECT_DETAIL_FOR_SHOW_HEADER,
    CREATE_PROJECT_DETAIL, UPDATE_PROJECT_DETAIL, DELETE_PROJECT_DETAIL,
} from '../constants/actionType';

import { toastShow } from "./toast";

export const getProjectDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetail(id);

        dispatch({ type: FETCH_PROJECT_DETAIL, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetails = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetails();

        dispatch({ type: FETCH_ALL_PROJECT_DETAIL, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailsByPortfolioID = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailByPortfolios(id);

        dispatch({ type: FETCH_PROJECT_DETAIL_BY_PORFOLIO_ID, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailsByProjectID = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailByProjects(id);

        dispatch({ type: FETCH_PROJECT_DETAIL_BY_PROJECT_ID, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailSearchByPortfolioName = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailSearchByPortfolioName(searchQuery);

        // console.log('[getProjectDetailSearchByPortfolioName-data]', data)

        dispatch({ type: FETCH_PROJECT_DETAIL_BY_SEARCH, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailSearchByProjectName = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailSearchByProjectName(searchQuery);

        // console.log('[getProjectDetailSearchByProjectName-data]', data)

        dispatch({ type: FETCH_PROJECT_DETAIL_BY_SEARCH, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailSearchByName = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailSearchByName(searchQuery);

        // console.log('[getProjectDetailSearchByProjectName-data]', data)

        dispatch({ type: FETCH_PROJECT_DETAIL_BY_SEARCH, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const getProjectDetailForShowHeaders = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT_DETAIL })

        const { data } = await api.fetchProjectDetailForShowHeaders();

        dispatch({ type: FETCH_PROJECT_DETAIL_FOR_SHOW_HEADER, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_PROJECT_DETAIL })
    }
}

export const createProjectDetail = (projectDetail) => async (dispatch) => {
    try {

        const { data } = await api.createProjectDetail(projectDetail);

        dispatch({ type: CREATE_PROJECT_DETAIL, payload: data });
    } catch (error) {
        console.error(error)
    }
}

export const updateProjectDetail = (id, projectDetail) => async (dispatch) => {
    try {
        const { data } = await api.updateProjectDetail(id, projectDetail)

        dispatch({ type: UPDATE_PROJECT_DETAIL, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const deleteProjectDetail = (ids) => async (dispatch) => {
    try {
        await api.deleteProjectDetail(ids)

        dispatch(toastShow('success', 'Xoá thành công', ''))

        dispatch({ type: DELETE_PROJECT_DETAIL, payload: ids })
    } catch (error) {
        console.error(error.message)
    }
}
