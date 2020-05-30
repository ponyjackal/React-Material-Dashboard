import { handleActions } from 'redux-actions';
import { ADD_SUCCESS, ADD_FAILED, GET_SUCCESS, GET_FAILED } from './constants';

const InitialState = {
    isAdded: false,
    isGet: false,
    broadcasts: null
}

const customer = handleActions(
    {
        [GET_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            broadcasts: data.broadcasts,
            isGet: true
        }),
        [GET_FAILED]: (state) => ({
            ...state,
            broadcasts: null,
            isGet: false,
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