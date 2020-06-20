import { handleActions } from 'redux-actions';
import {
    ADD_SUCCESS,
    ADD_FAILED,
    GET_SUCCESS,
    GET_FAILED,
    PUBLISH_SUCCESS,
    PUBLISH_FAILED,
    ARCHIVE_SUCCESS,
    ARCHIVE_FAILED
} from './constants';

const InitialState = {
    isAdded: false,
    isGet: false,
    isPublished: false,
    isArchived: false,
    broadcasts: null,
    broadcast: null,
}

const broadcast = handleActions(
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
        [ADD_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            broadcast: data,
            isAdded: true,
        }),
        [ADD_FAILED]: (state) => ({
            ...state,
            isAdded: false,
        }),
        [PUBLISH_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            isPublished: true,
        }),
        [PUBLISH_FAILED]: (state) => ({
            ...state,
            isPublished: false,
        }),
        [ARCHIVE_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            isArchived: true,
        }),
        [ARCHIVE_FAILED]: (state) => ({
            ...state,
            isArchived: false,
        }),
    },
    InitialState
);

export default broadcast;