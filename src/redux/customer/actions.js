import { createAction } from 'redux-actions';
import {
    IMPORT_REQUEST,
    IMPORT_SUCCESS,
    IMPORT_FAILED,
    GET_REQUEST,
    GET_SUCCESS,
    GET_FAILED,
    ADD_REQUEST,
    ADD_SUCCESS,
    ADD_FAILED,
} from './constants';


export const importRequest = createAction(IMPORT_REQUEST, customers => customers);
export const importSuccess = createAction(IMPORT_SUCCESS);
export const importFailed = createAction(IMPORT_FAILED);

export const addRequest = createAction(ADD_REQUEST, customer => customer);
export const addSuccess = createAction(ADD_SUCCESS);
export const addFailed = createAction(ADD_FAILED);

export const getRequest = createAction(GET_REQUEST, ({ targetState, targetCity, rowPerPage, page }) => ({ targetState, targetCity, rowPerPage, page }));
export const getSuccess = createAction(GET_SUCCESS);
export const getFailed = createAction(GET_FAILED);