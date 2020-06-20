import { createAction } from 'redux-actions';
import {
    ADD_REQUEST,
    ADD_SUCCESS,
    ADD_FAILED,
    GET_REQUEST,
    GET_SUCCESS,
    GET_FAILED,
    PUBLISH_REQUEST,
    PUBLISH_SUCCESS,
    PUBLISH_FAILED,
    ARCHIVE_REQUEST,
    ARCHIVE_SUCCESS,
    ARCHIVE_FAILED,
} from './constants';


export const addRequest = createAction(ADD_REQUEST, broadcast => broadcast);
export const addSuccess = createAction(ADD_SUCCESS);
export const addFailed = createAction(ADD_FAILED);

export const publishRequest = createAction(PUBLISH_REQUEST, ({ id }) => ({ id }));
export const publishSuccess = createAction(PUBLISH_SUCCESS);
export const publishFailed = createAction(PUBLISH_FAILED);

export const archiveRequest = createAction(ARCHIVE_REQUEST, ({ id }) => ({ id }));
export const archiveSuccess = createAction(ARCHIVE_SUCCESS);
export const archiveFailed = createAction(ARCHIVE_FAILED);

export const getRequest = createAction(GET_REQUEST, ({ type, rowPerPage, page }) => ({ type, rowPerPage, page }));
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);