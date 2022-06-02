import { toast } from "react-toastify";

import * as api from '../../api'
import {
    START_LOADING_UPLOAD, END_LOADING_UPLOAD,
    UPLOAD_PROCESSING, UPLOAD_COMPLETE, UPLOAD_MULTI_COMPLETE
} from '../constants/actionType';

import { toastShow, toastPromise } from "./toast";

export const uploadFile = (file, folder = '') => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_UPLOAD })
        dispatch({ type: UPLOAD_PROCESSING })

        let promise
        switch (folder) {
            case 'portfolio':
                promise = api.uploadPorfolio(file);
                break;
            case 'project':
                promise = api.uploadProject(file);
                break;
            case 'projectDetail':
                promise = api.uploadProjectDetail(file);
                break;
            default:
                promise = api.uploadFile(file);
                break;
        }

        const { data } = await dispatch(toastPromise(promise))
        console.log('[data]', data)

        dispatch({ type: END_LOADING_UPLOAD });
        dispatch({ type: UPLOAD_COMPLETE, payload: data.file });
        return data.file

    } catch (error) {
        console.error(error)
    }
}

export const uploadFiles = (files, folder = '') => async (dispatch) => {
    console.log('[file]', files)
    try {
        dispatch({ type: START_LOADING_UPLOAD })
        dispatch({ type: UPLOAD_PROCESSING })

        let promise
        switch (folder) {
            case 'portfolio':
                promise = api.uploadPorfolios(files);
                break;
            case 'project':
                promise = api.uploadProjects(files);
                break;
            case 'projectDetail':
                promise = api.uploadProjectDetails(files);
                break;
            default:
                promise = api.uploadFiles(files);
                break;
        }

        const { data } = await dispatch(toastPromise(promise))
        console.log('[data]', data)

        dispatch({ type: END_LOADING_UPLOAD });
        dispatch({ type: UPLOAD_MULTI_COMPLETE, payload: data.files });
        return data.files
    } catch (error) {
        console.error(error)
    }

}
