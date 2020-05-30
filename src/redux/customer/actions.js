import { createAction } from 'redux-actions';
import { IMPORT_REQUEST, IMPORT_SUCCESS, IMPORT_FAILED, GET_REQUEST, GET_SUCCESS, GET_FAILED } from './constants';


export const importRequest = createAction(IMPORT_REQUEST, customers => customers);
export const importSuccess = createAction(IMPORT_SUCCESS);
export const importFailed = createAction(IMPORT_FAILED);

export const getRequest = createAction(GET_REQUEST);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);