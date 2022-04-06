import * as api from '../../api'
import {
    START_LOADING_PORTFOLIO, END_LOADING_PORTFOLIO,
    FETCH_ALL_PORTFOLIO, FETCH_PORTFOLIO,
    CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO,
} from '../constants/actionType';

// export const getPortfolio = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: START_LOADING_PORTFOLIO })

//         const { data } = await api.fetchPortfolio(id);

//         dispatch({ type: FETCH_PORTFOLIO, payload: data })
//         dispatch({ type: END_LOADING_PORTFOLIO })
//     } catch (error) {
//         console.error(error.message)
//     }
// }

export const getPortfolios = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PORTFOLIO })

        const { data } = await api.fetchPortfolios();
        console.log({ data })
        dispatch({ type: FETCH_ALL_PORTFOLIO, payload: data })
        dispatch({ type: END_LOADING_PORTFOLIO })
    } catch (error) {
        console.error(error.message)
    }
}

export const createPortfolio = (portfolio, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PORTFOLIO })

        const { data } = await api.createPortfolio(portfolio);

        navigate(`/portfolios/${data._id}`)

        dispatch({ type: CREATE_PORTFOLIO, payload: data });
    } catch (error) {
        console.error(error)
    }

}

export const updatePortfolio = (id, portfolio) => async (dispatch) => {
    try {
        // const { data } = await api.updatePortfolio(id, portfolio)

        // dispatch({ type: UPDATE_PORTFOLIO, payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

// export const deletePortfolio = (id) => async (dispatch) => {
//     try {
//         await api.deletePortfolio(id)

//         dispatch({ type: DELETE_PORTFOLIO, payload: id })
//     } catch (error) {
//         console.error(error.message)
//     }
// }