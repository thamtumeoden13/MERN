import * as api from '../../api'
import {
    START_LOADING_ROUTE, END_LOADING_ROUTE,
    FETCH_ROUTE,
} from '../constants/actionType';

export const getRoutes = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_ROUTE })

        const { data } = await api.fetchRoute();
        console.log('[getRoutes-action]', data)

        dispatch({ type: FETCH_ROUTE, payload: data })
    } catch (error) {
        console.error(error.message)
    } finally {
        dispatch({ type: END_LOADING_ROUTE })
    }
}
