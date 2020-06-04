import { handleActions } from 'redux-actions';
import { GET_SUCCESS, GET_FAILED } from './constants';

const InitialState = {
    isGet: false,
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
    },
    InitialState
);

export default dashboard;