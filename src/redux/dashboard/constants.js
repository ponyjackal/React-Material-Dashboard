import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const getActionType = 'DASHBOARD_GET';
export const [GET_REQUEST, GET_SUCCESS, GET_FAILED] = createRequestActionTypes(
    getActionType
);
