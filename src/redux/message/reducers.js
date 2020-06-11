import { handleActions } from 'redux-actions';
import { GET_SUCCESS, GET_FAILED, SEND_SUCCESS, SEND_FAILED } from './constants';

const InitialState = {
    isGet: false,
    isSent: false,
    data: []
}

const dashboard = handleActions(
    {
        [GET_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            data: data.messages,
            isGet: true
        }),
        [GET_FAILED]: (state) => ({
            ...state,
            data: [],
            isGet: false,
        }),
        [SEND_SUCCESS]: (state) => ({
            ...state,
            isSent: true,
        }),
        [SEND_FAILED]: (state) => ({
            ...state,
            isSent: false,
        }),
    },
    InitialState
);

export default dashboard;