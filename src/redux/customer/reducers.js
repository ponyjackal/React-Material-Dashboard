import { handleActions } from 'redux-actions';
import {
    IMPORT_SUCCESS,
    IMPORT_FAILED,
    GET_SUCCESS,
    GET_FAILED,
    ADD_SUCCESS,
    ADD_FAILED,
    GET_NUMBER_SUCCESS,
    GET_NUMBER_FAILED,
} from './constants';

const InitialState = {
    isImported: false,
    isGet: false,
    isAdded: false,
    customers: null,
    phoneNumbers: []
}

const customer = handleActions(
    {
        [GET_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            customers: data.customers,
            isGet: true
        }),
        [GET_FAILED]: (state) => ({
            ...state,
            customers: null,
            isGet: false,
        }),
        [GET_NUMBER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            phoneNumbers: data.phones,
            isGet: true
        }),
        [GET_NUMBER_FAILED]: (state) => ({
            ...state,
            phoneNumbers: null,
            isGet: false,
        }),
        [IMPORT_SUCCESS]: (state) => ({
            ...state,
            isImported: true,
        }),
        [IMPORT_FAILED]: (state) => ({
            ...state,
            isImported: false,
        }),
        [ADD_SUCCESS]: (state) => ({
            ...state,
            isAdded: true,
        }),
        [ADD_FAILED]: (state) => ({
            ...state,
            isAdded: false,
        }),
    },
    InitialState
);

export default customer;