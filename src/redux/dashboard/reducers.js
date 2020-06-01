import { handleActions } from 'redux-actions';
import { GET_SUCCESS, GET_FAILED } from './constants';

const InitialState = {
    isGet: false,
    data: null
}

const dashboard = handleActions(
    {
        [GET_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            data: data,
            isGet: true
        }),
        [GET_FAILED]: (state) => ({
            ...state,
            data: null,
            isGet: false,
        }),
    },
    InitialState
);

export default dashboard;