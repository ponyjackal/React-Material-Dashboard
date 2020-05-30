import { createAction } from 'redux-actions';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNOUT } from './constants';


export const signin = createAction(SIGNIN_REQUEST, ({ email, password }) => ({
    email,
    password,
}));
export const signinSuccess = createAction(SIGNIN_SUCCESS, token => token);
export const signinFailed = createAction(SIGNIN_FAILED);

export const signout = createAction(SIGNOUT);
