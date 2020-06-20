import { handleActions } from 'redux-actions';
import { GET_SUCCESS, GET_FAILED } from './constants';

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
    },
    InitialState
);

export default chat;