import { handleActions } from 'redux-actions';
import {
    GET_SUCCESS,
    GET_FAILED,
    ARCHIVE_SUCCESS,
    ARCHIVE_FAILED,
    SEND_SUCCESS,
    SEND_FAILED,
    UNSUBSCRIBE_SUCCESS,
    UNSUBSCRIBE_FAILED,
    READ_SUCCESS,
    READ_FAILED,
} from './constants';

const InitialState = {
    isGet: false,
    data: []
}

const chat = handleActions(
    {
        [GET_SUCCESS]: (state, { payload: data }) => {
            const sorted = Object.keys(data.conversations).slice().sort((a, b) => {
                let comparison = 0;
                if (data.conversations[a].updated_at > data.conversations[b].updated_at) {
                    comparison = -1;
                } else if (data.conversations[a].updated_at < data.conversations[b].updated_at) {
                    comparison = 1;
                }
                return comparison;
            }).map(key => {
                return data.conversations[key];
            })
            console.log("sorted", sorted);
            return {
                ...state,
                data: sorted,
                isGet: true
            };
        },
        [GET_FAILED]: (state) => ({
            ...state,
            data: [],
            isGet: false,
        }),
        [ARCHIVE_SUCCESS]: (state, { payload: param }) => {
            console.log(param);
            const result = state.data.filter((conversation) => {
                return conversation.id != param.conversation_id;
            });
            console.log(result);
            return {
                ...state,
                data: result,
                isArchived: true,
            }
        },
        [ARCHIVE_FAILED]: (state) => ({
            ...state,
            isArchived: false,
        }),
        [SEND_SUCCESS]: (state, { payload: param }) => {
            const date = new Date();
            const date_str =
                date.getFullYear()
                + "-" + ("00" + (date.getMonth() + 1)).slice(-2)
                + "-" + ("00" + date.getDate()).slice(-2)
                + " "
                + ("00" + date.getHours()).slice(-2) + ":"
                + ("00" + date.getMinutes()).slice(-2)
                + ":" + ("00" + date.getSeconds()).slice(-2);
            const message = {
                id: Math.floor(Math.random() * 1000000),
                message: param.message,
                created_at: date_str,
                direction: "outbound"
            };
            const result = state.data.map((conversation) => {
                if (conversation.id == param.conversation_id) {
                    let temp = conversation;
                    temp.messages.push(message);
                    return temp;
                }
                else
                    return conversation;

            });
            return {
                ...state,
                data: result,
                isSent: true
            };
        },
        [SEND_FAILED]: (state) => ({
            ...state,
            isSent: false,
        }),
        [UNSUBSCRIBE_SUCCESS]: (state, { payload: param }) => {
            const date = new Date();
            const date_str =
                date.getFullYear()
                + "-" + ("00" + (date.getMonth() + 1)).slice(-2)
                + "-" + ("00" + date.getDate()).slice(-2)
                + " "
                + ("00" + date.getHours()).slice(-2) + ":"
                + ("00" + date.getMinutes()).slice(-2)
                + ":" + ("00" + date.getSeconds()).slice(-2);
            const message = {
                id: Math.floor(Math.random() * 1000000),
                message: 'You are unsubscribed. No more messages will be sent.',
                created_at: date_str,
                direction: "outbound"
            };
            const result = state.data.map((conversation) => {
                if (conversation.id == param.conversation_id) {
                    let temp = conversation;
                    temp.messages.push(message);
                    return temp;
                }
                else
                    return conversation;

            });
            return {
                ...state,
                data: result,
                isSent: true
            };
        },
        [UNSUBSCRIBE_FAILED]: (state) => ({
            ...state,
            isSent: false,
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

export default chat;