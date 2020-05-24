import { handleActions } from 'redux-actions';
import { signinAPI } from './../../api'
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILED } from './constants';
import { signin } from './actions';

const InitialState = {
    isAuthenticated: false,
    token: null,
}

const auth = handleActions(
    {
        [SIGNIN_REQUEST]: (state, { payload: { email, password } }) => {


            // signinAPI({ email, password })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            console.log("Signin Request", {
                ...state,
                isAuthenticated: true,
            });
            return {
                ...state,
                isAuthenticated: true,
            };
        },
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