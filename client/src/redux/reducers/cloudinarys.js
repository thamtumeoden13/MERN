import {
    START_LOADING_UPLOAD, END_LOADING_UPLOAD,
    UPLOAD_PROCESSING, UPLOAD_COMPLETE, UPLOAD_MULTI_COMPLETE
} from '../constants/actionType';

const initState = {
    isLoading: false,
    file: {},
    files: [],
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING_UPLOAD:
        case UPLOAD_PROCESSING:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_UPLOAD:
            return {
                ...state,
                isLoading: false,
            }
        case UPLOAD_COMPLETE:
            return {
                ...state,
                file: action.payload.data,
            };
        case UPLOAD_MULTI_COMPLETE:
            return {
                ...state,
                files: action.payload.data,
            };
        default:
            return state;
    }
}

export default reducer