import { createAction } from 'redux-actions';
import {
    GET_REQUEST,
    GET_SUCCESS,
    GET_FAILED,
    SEND_REQUEST,
    SEND_SUCCESS,
    SEND_FAILED,
    UNSUBSCRIBE_REQUEST,
    UNSUBSCRIBE_SUCCESS,
    UNSUBSCRIBE_FAILED,
    ARCHIVE_REQUEST,
    ARCHIVE_SUCCESS,
    ARCHIVE_FAILED,
} from './constants';

export const getRequest = createAction(GET_REQUEST);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);

export const sendRequest = createAction(SEND_REQUEST, ({ id, message }) => ({ id, message }));
export const sendSuccess = createAction(SEND_SUCCESS);
export const sendFailed = createAction(SEND_FAILED);

export const unsubscribeRequest = createAction(UNSUBSCRIBE_REQUEST, ({ id }) => ({ id }));
export const unsubscribeSuccess = createAction(UNSUBSCRIBE_SUCCESS);
export const unsubscribeFailed = createAction(UNSUBSCRIBE_FAILED);

export const archiveRequest = createAction(ARCHIVE_REQUEST, ({ id }) => ({ id }));
export const archiveSuccess = createAction(ARCHIVE_SUCCESS);
export const archiveFailed = createAction(ARCHIVE_FAILED);

