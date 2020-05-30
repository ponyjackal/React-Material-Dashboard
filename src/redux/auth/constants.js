import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const actionType = 'SIGNIN';
export const [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILED] = createRequestActionTypes(
    actionType
);
export const SIGNOUT = 'SIGNOUT';
