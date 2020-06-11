import { createAction } from 'redux-actions';
import { GET_REQUEST, GET_SUCCESS, GET_FAILED, SEND_REQUEST, SEND_SUCCESS, SEND_FAILED, } from './constants';

export const getRequest = createAction(GET_REQUEST);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);

export const sendRequest = createAction(SEND_REQUEST, ({ id, message }) => ({ id, message }));
export const sendSuccess = createAction(SEND_SUCCESS);
export const sendFailed = createAction(SEND_FAILED);