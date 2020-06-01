import { createAction } from 'redux-actions';
import { GET_REQUEST, GET_SUCCESS, GET_FAILED } from './constants';

export const getRequest = createAction(GET_REQUEST);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);