import { handleActions } from 'redux-actions';
import {
    GET_SUCCESS,
    GET_FAILED,
    SEND_SUCCESS,
    SEND_FAILED,
    UNSUBSCRIBE_SUCCESS,
    UNSUBSCRIBE_FAILED,
    ARCHIVE_SUCCESS,
    ARCHIVE_FAILED,
    READ_SUCCESS,
    READ_FAILED,
} from './constants';

const InitialState = {
    isGet: false,
    isSent: false,
    isArchived: false,
    isRead: false,
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
        [UNSUBSCRIBE_SUCCESS]: (state) => ({
            ...state,
            isSent: true,
        }),
        [UNSUBSCRIBE_FAILED]: (state) => ({
            ...state,
            isSent: false,
        }),
        [ARCHIVE_SUCCESS]: (state) => ({
            ...state,
            isArchived: true,
        }),
        [ARCHIVE_FAILED]: (state) => ({
            ...state,
            isArchived: false,
        }),
        [READ_SUCCESS]: (state) => ({
            ...state,
            isRead: true,
        }),
        [READ_FAILED]: (state) => ({
            ...state,
            isRead: false,
        }),
    },
    InitialState
);

export default dashboard;