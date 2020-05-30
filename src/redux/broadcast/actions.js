import { createAction } from 'redux-actions';
import { ADD_REQUEST, ADD_SUCCESS, ADD_FAILED, GET_REQUEST, GET_SUCCESS, GET_FAILED } from './constants';


export const addRequest = createAction(ADD_REQUEST, broadcast => broadcast);
export const addSuccess = createAction(ADD_SUCCESS);
export const addFailed = createAction(ADD_FAILED);

export const getRequest = createAction(GET_REQUEST);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);