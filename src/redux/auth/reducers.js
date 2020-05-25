import { handleActions } from 'redux-actions';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILED } from './constants';
import { signin } from './actions';

const InitialState = {
    isAuthenticated: false,
    token: null,
}

const auth = handleActions(
    {
        [SIGNIN_SUCCESS]: (state) => ({
            ...state,
            isAuthenticated: true,
        }),
        [SIGNIN_FAILED]: (state) => ({
            ...state,
            isAuthenticated: false,
        })
    },
    InitialState
);

export default auth;