import { handleActions } from 'redux-actions';
import {
    GET_SUCCESS,
    GET_FAILED,
    // SEND_SUCCESS,
    // SEND_FAILED,
    // UNSUBSCRIBE_SUCCESS,
    // UNSUBSCRIBE_FAILED,
    // READ_SUCCESS,
    // READ_FAILED,
} from './constants';

const InitialState = {
    isGet: false,
    isSent: false,
    isArchived: false,
    isRead: false,
    data: []
}

const message = handleActions(
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
        // [SEND_SUCCESS]: (state, { payload: param }) => {
        //     const message = {
        //         message: param.message,
        //         created_at: new Date(),
        //         direction: "outbound"
        //     };
        //     console.log(message);
        //     const result = {
        //         ...state.data,
        //         message
        //     }
        //     console.log(result);
        //     return {
        //         ...state,
        //         data: result,
        //         isSent: true
        //     };
        // },
        // [SEND_FAILED]: (state) => ({
        //     ...state,
        //     isSent: false,
        // }),
        // [UNSUBSCRIBE_SUCCESS]: (state) => ({
        //     ...state,
        //     isSent: true,
        // }),
        // [UNSUBSCRIBE_FAILED]: (state) => ({
        //     ...state,
        //     isSent: false,
        // }),
        // [READ_SUCCESS]: (state) => ({
        //     ...state,
        //     isRead: true,
        // }),
        // [READ_FAILED]: (state) => ({
        //     ...state,
        //     isRead: false,
        // }),
    },
    InitialState
);

export default message;