import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const addActionType = 'BROADCAST_ADD';
export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAILED] = createRequestActionTypes(
    addActionType
);

export const getActionType = 'BROADCAST_GET';
export const [GET_REQUEST, GET_SUCCESS, GET_FAILED] = createRequestActionTypes(
    getActionType
);
