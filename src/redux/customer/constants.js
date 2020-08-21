import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const importActionType = 'CUSTOMER_IMPORT';
export const [IMPORT_REQUEST, IMPORT_SUCCESS, IMPORT_FAILED] = createRequestActionTypes(
    importActionType
);

export const addActionType = 'CUSTOMER_ADD';
export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAILED] = createRequestActionTypes(
    addActionType
);

export const getActionType = 'CUSTOMER_GET';
export const [GET_REQUEST, GET_SUCCESS, GET_FAILED] = createRequestActionTypes(
    getActionType
);

export const getNumberActionType = 'PHONENUMBER_GET';
export const [GET_NUMBER_REQUEST, GET_NUMBER_SUCCESS, GET_NUMBER_FAILED] = createRequestActionTypes(
    getNumberActionType
);
